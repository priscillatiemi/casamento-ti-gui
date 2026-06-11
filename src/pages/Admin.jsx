import { useEffect, useMemo, useState } from 'react';
import { addGuest, getGiftIntents, getGuests } from '../services/firebase.js';

const ADMIN_PASSWORD = 'Kawakami#kanashiro1';

export default function Admin() {
  const [allowed, setAllowed] = useState(false);
  const [password, setPassword] = useState('');
  const [guests, setGuests] = useState([]);
  const [gifts, setGifts] = useState([]);
  const [nome, setNome] = useState('');
  const [grupo, setGrupo] = useState('');
  const [acompanhantesText, setAcompanhantesText] = useState('');
  const [message, setMessage] = useState('');

  const totals = useMemo(() => {
    const principais = guests.filter((guest) => guest.confirmado).length;
    const acompanhantes = guests.reduce((sum, guest) => sum + (guest.acompanhantes || []).filter((item) => item.confirmado).length, 0);
    return { principais, acompanhantes, total: principais + acompanhantes };
  }, [guests]);

  async function loadData() {
    try {
      const [guestList, giftList] = await Promise.all([getGuests(), getGiftIntents()]);
      setGuests(guestList);
      setGifts(giftList);
    } catch (error) {
      console.error(error);
      setMessage('Não foi possível carregar os dados. Confira o Firebase.');
    }
  }

  useEffect(() => {
    if (allowed) loadData();
  }, [allowed]);

  function login(event) {
    event.preventDefault();
    if (password === ADMIN_PASSWORD) setAllowed(true);
    else setMessage('Senha incorreta.');
  }

  async function handleAddGuest(event) {
    event.preventDefault();
    const acompanhantes = acompanhantesText
      .split('\n')
      .map((item) => item.trim())
      .filter(Boolean);

    try {
      await addGuest({ nome, grupo, acompanhantes });
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

  function exportCsv() {
    const rows = [['Nome', 'Grupo', 'Tipo', 'Confirmado', 'Observacao']];
    guests.forEach((guest) => {
      rows.push([guest.nome, guest.grupo || '', 'Confirmacao', guest.confirmado ? 'Sim' : 'Não', guest.observacao || '']);
      (guest.acompanhantes || []).forEach((person) => {
        rows.push([person.nome, guest.grupo || '', `Acompanhante de ${guest.nome}`, person.confirmado ? 'Sim' : 'Não', '']);
      });
    });

    const csv = rows.map((row) => row.map((cell) => `"${String(cell).replaceAll('"', '""')}"`).join(';')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
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
          <p>Digite a senha do painel para gerenciar convidados.</p>
          <form onSubmit={login} className="searchBox">
            <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Senha" />
            <button type="submit">Entrar</button>
          </form>
          {message && <p className="notice">{message}</p>}
        </section>
      </main>
    );
  }

  return (
    <main className="adminPage">
      <section className="section">
        <p className="eyebrow dark">Admin</p>
        <h1>Painel dos noivos</h1>
        <div className="stats">
          <div><strong>{totals.principais}</strong><span>principais</span></div>
          <div><strong>{totals.acompanhantes}</strong><span>acompanhantes</span></div>
          <div><strong>{totals.total}</strong><span>total confirmado</span></div>
        </div>
        <button onClick={loadData}>Atualizar dados</button>
        <button className="secondaryButton" onClick={exportCsv}>Exportar CSV</button>
        {message && <p className="notice">{message}</p>}
      </section>

      <section className="section adminGrid">
        <div className="adminCard">
          <h2>Cadastrar convidado</h2>
          <form onSubmit={handleAddGuest} className="stack">
            <input value={nome} onChange={(event) => setNome(event.target.value)} placeholder="Nome do convidado principal" required />
            <input value={grupo} onChange={(event) => setGrupo(event.target.value)} placeholder="Grupo, ex: Família da noiva" />
            <textarea
              value={acompanhantesText}
              onChange={(event) => setAcompanhantesText(event.target.value)}
              placeholder={'Acompanhantes permitidos, um por linha\nEx: João Silva\nAna Silva'}
            />
            <button type="submit">Cadastrar</button>
          </form>
        </div>

        <div className="adminCard">
          <h2>Presentes / mensagens</h2>
          <div className="miniList">
            {gifts.length === 0 ? <p className="muted">Nenhuma mensagem ainda.</p> : gifts.map((gift) => (
              <div key={gift.id}>
                <strong>{gift.presente} • R$ {gift.valor}</strong>
                <p>{gift.nome || 'Sem nome'}: {gift.mensagem || 'Sem mensagem'}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <h2>Lista de convidados</h2>
        <div className="guestList">
          {guests.map((guest) => (
            <article className="guestRow" key={guest.id}>
              <div>
                <strong>{guest.nome}</strong>
                <p>{guest.grupo || 'Sem grupo'} • Confirmacao: {guest.confirmado ? 'Confirmado' : 'Pendente'}</p>
                {(guest.acompanhantes || []).length > 0 && (
                  <ul>
                    {guest.acompanhantes.map((person, index) => (
                      <li key={`${person.nome}-${index}`}>{person.nome}: {person.confirmado ? 'Confirmado' : 'Pendente'}</li>
                    ))}
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
