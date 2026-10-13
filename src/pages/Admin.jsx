import { useEffect, useMemo, useState } from 'react';

import {
  addGuest,
  getGiftIntents,
  getGuests,
  loginAdmin,
  logoutAdmin,
  listenAuth,
  updateGuestSearchNames
} from '../services/firebase.js';

export default function Admin() {
  const [allowed, setAllowed] = useState(false);
  const [user, setUser] = useState(null);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [guests, setGuests] = useState([]);
  const [gifts, setGifts] = useState([]);

  const [nome, setNome] = useState('');
  const [grupo, setGrupo] = useState('');
  const [acompanhantesText, setAcompanhantesText] = useState('');
  const [message, setMessage] = useState('');

  const [updatingSearch, setUpdatingSearch] = useState(false);

  const totals = useMemo(() => {
    const principais = guests.filter(
      (guest) => guest.confirmado
    ).length;

    const acompanhantes = guests.reduce(
      (sum, guest) =>
        sum +
        (guest.acompanhantes || []).filter(
          (item) => item.confirmado
        ).length,
      0
    );

    return {
      principais,
      acompanhantes,
      total: principais + acompanhantes
    };
  }, [guests]);

  useEffect(() => {
    const unsubscribe = listenAuth((currentUser) => {
      setUser(currentUser);
      setAllowed(!!currentUser);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (allowed) {
      loadData();
    }
  }, [allowed]);

  async function loadData() {
    try {
      const [guestList, giftList] = await Promise.all([
        getGuests(),
        getGiftIntents()
      ]);

      setGuests(guestList);
      setGifts(giftList);
    } catch (error) {
      console.error(error);

      setMessage(
        'Não foi possível carregar os dados. Confira o Firebase.'
      );
    }
  }

  async function login(event) {
    event.preventDefault();

    try {
      await loginAdmin(email, password);
      setMessage('');
    } catch (error) {
      console.error(error);
      setMessage('E-mail ou senha incorretos.');
    }
  }

  async function handleLogout() {
    await logoutAdmin();

    setAllowed(false);
    setUser(null);
    setEmail('');
    setPassword('');
  }

  async function handleAddGuest(event) {
    event.preventDefault();

    const acompanhantes = acompanhantesText
      .split('\n')
      .map((item) => item.trim())
      .filter(Boolean);

    try {
      await addGuest({
        nome,
        grupo,
        acompanhantes
      });

      setNome('');
      setGrupo('');
      setAcompanhantesText('');

      setMessage('Convidado cadastrado.');

      await loadData();
    } catch (error) {
      console.error(error);
      setMessage('Erro ao cadastrar convidado.');
    }
  }

  /*
   * NOVA FUNÇÃO
   *
   * Atualiza automaticamente os nomes de busca
   * de todos os convidados já cadastrados.
   *
   * Não apaga convidados, acompanhantes
   * ou confirmações existentes.
   */
  async function handleUpdateSearchNames() {
    if (updatingSearch) {
      return;
    }

    const confirmed = window.confirm(
      'Deseja atualizar os nomes de busca de todos os convidados? Nenhum convidado será apagado.'
    );

    if (!confirmed) {
      return;
    }

    setUpdatingSearch(true);

    setMessage(
      'Atualizando os nomes de busca dos convidados... Aguarde. 💗'
    );

    try {
      const total = await updateGuestSearchNames();

      await loadData();

      setMessage(
        `Busca atualizada com sucesso para ${total} convites! 💗 Agora é possível pesquisar pelos dois primeiros nomes.`
      );

    } catch (error) {
      console.error(error);

      setMessage(
        'Não foi possível concluir a atualização. Verifique o console e tente novamente.'
      );

    } finally {
      setUpdatingSearch(false);
    }
  }

  function exportCsv() {
    const rows = [
      ['Nome', 'Grupo', 'Tipo', 'Confirmado', 'Observacao']
    ];

    guests.forEach((guest) => {
      rows.push([
        guest.nome,
        guest.grupo || '',
        'Confirmacao',
        guest.confirmado ? 'Sim' : 'Não',
        guest.observacao || ''
      ]);

      (guest.acompanhantes || []).forEach((person) => {
        rows.push([
          person.nome,
          guest.grupo || '',
          `Acompanhante de ${guest.nome}`,
          person.confirmado ? 'Sim' : 'Não',
          ''
        ]);
      });
    });

    const csv = rows
      .map((row) =>
        row
          .map(
            (cell) =>
              `"${String(cell).replaceAll('"', '""')}"`
          )
          .join(';')
      )
      .join('\n');

    const blob = new Blob([csv], {
      type: 'text/csv;charset=utf-8;'
    });

    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');

    a.href = url;
    a.download = 'confirmacoes-casamento.csv';
    a.click();

    URL.revokeObjectURL(url);
  }

  if (!allowed) {
    return (
      <main className="adminPage">
        <section className="section adminLogin">
          <h1>Painel dos noivos</h1>

          <p>
            Entre com seu e-mail e senha para
            gerenciar os convidados.
          </p>

          <form
            onSubmit={login}
            className="searchBox"
          >
            <input
              type="email"
              value={email}
              onChange={(event) =>
                setEmail(event.target.value)
              }
              placeholder="E-mail"
              required
            />

            <input
              type="password"
              value={password}
              onChange={(event) =>
                setPassword(event.target.value)
              }
              placeholder="Senha"
              required
            />

            <button type="submit">
              Entrar
            </button>
          </form>

          {message && (
            <p className="notice">
              {message}
            </p>
          )}
        </section>
      </main>
    );
  }

  return (
    <main className="adminPage">
      <section className="section">
        <p className="eyebrow dark">
          Admin
        </p>

        <h1>
          Painel dos noivos
        </h1>

        {user?.email && (
          <p className="muted">
            Logado como{' '}
            <strong>{user.email}</strong>
          </p>
        )}

        <div className="stats">
          <div>
            <strong>
              {totals.principais}
            </strong>
            <span>
              principais
            </span>
          </div>

          <div>
            <strong>
              {totals.acompanhantes}
            </strong>
            <span>
              acompanhantes
            </span>
          </div>

          <div>
            <strong>
              {totals.total}
            </strong>
            <span>
              total confirmado
            </span>
          </div>
        </div>

        <button
          type="button"
          onClick={loadData}
        >
          Atualizar dados
        </button>

        <button
          type="button"
          className="secondaryButton"
          onClick={exportCsv}
        >
          Exportar CSV
        </button>

        {/* NOVO BOTÃO */}
        <button
          type="button"
          className="secondaryButton"
          onClick={handleUpdateSearchNames}
          disabled={updatingSearch}
        >
          {updatingSearch
            ? 'Atualizando busca...'
            : 'Atualizar busca dos convidados'}
        </button>

        <button
          type="button"
          className="secondaryButton"
          onClick={handleLogout}
        >
          Sair
        </button>

        {message && (
          <p className="notice">
            {message}
          </p>
        )}
      </section>

      <section className="section adminGrid">
        <div className="adminCard">
          <h2>
            Cadastrar convidado
          </h2>

          <form
            onSubmit={handleAddGuest}
            className="stack"
          >
            <input
              value={nome}
              onChange={(event) =>
                setNome(event.target.value)
              }
              placeholder="Nome do convidado principal"
              required
            />

            <input
              value={grupo}
              onChange={(event) =>
                setGrupo(event.target.value)
              }
              placeholder="Grupo, ex: Família da noiva"
            />

            <textarea
              value={acompanhantesText}
              onChange={(event) =>
                setAcompanhantesText(event.target.value)
              }
              placeholder={
                'Acompanhantes permitidos, um por linha\nEx: João Silva\nAna Silva'
              }
            />

            <button type="submit">
              Cadastrar
            </button>
          </form>
        </div>

        <div className="adminCard">
          <h2>
            Presentes / mensagens
          </h2>

          <div className="miniList">
            {gifts.length === 0 ? (
              <p className="muted">
                Nenhuma mensagem ainda.
              </p>
            ) : (
              gifts.map((gift) => (
                <div key={gift.id}>
                  <strong>
                    {gift.presente} • R$ {gift.valor}
                  </strong>

                  <p>
                    {gift.nome || 'Sem nome'}:{' '}
                    {gift.mensagem || 'Sem mensagem'}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      <section className="section">
        <h2>
          Lista de convidados
        </h2>

        <div className="guestList">
          {guests.map((guest) => (
            <article
              className="guestRow"
              key={guest.id}
            >
              <div>
                <strong>
                  {guest.nome}
                </strong>

                <p>
                  {guest.grupo || 'Sem grupo'} • Confirmação:{' '}
                  {guest.confirmado
                    ? 'Confirmado'
                    : 'Pendente'}
                </p>

                {(guest.acompanhantes || []).length > 0 && (
                  <ul>
                    {guest.acompanhantes.map(
                      (person, index) => (
                        <li
                          key={`${person.nome}-${index}`}
                        >
                          {person.nome}:{' '}
                          {person.confirmado
                            ? 'Confirmado'
                            : 'Pendente'}
                        </li>
                      )
                    )}
                  </ul>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}