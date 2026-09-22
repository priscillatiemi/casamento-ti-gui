import { useState } from 'react';

import {
  confirmGuest,
  searchGuestByName
} from '../services/firebase.js';

export default function RSVP() {
  const [name, setName] = useState('');
  const [selectedGuest, setSelectedGuest] = useState(null);

  const [mainConfirmed, setMainConfirmed] = useState(true);
  const [companions, setCompanions] = useState([]);

  const [note, setNote] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSearch(event) {
    event.preventDefault();

    setMessage('');
    setSelectedGuest(null);

    const searchedName = name.trim();

    if (searchedName.length < 3) {
      setMessage(
        'Digite pelo menos 3 letras do seu nome.'
      );
      return;
    }

    setLoading(true);

    try {
      const guests =
        await searchGuestByName(searchedName);

      if (guests.length === 0) {
        setMessage(
          'Não encontramos seu convite. Tente digitar seu nome e sobrenome ou fale com os noivos.'
        );

        return;
      }

      if (guests.length === 1) {
        selectGuest(guests[0]);
        return;
      }

      /*
       * IMPORTANTE:
       *
       * Se mais de um convite for encontrado,
       * NÃO mostramos os nomes encontrados.
       *
       * Assim evitamos revelar nomes de outros
       * convidados do casamento.
       */
      setMessage(
        'Encontramos mais de um convite com esse nome. 💗 Digite também seu sobrenome para localizarmos o convite correto.'
      );

    } catch (error) {
      console.error(error);

      setMessage(
        'Não foi possível buscar agora. Tente novamente ou fale com os noivos.'
      );

    } finally {
      setLoading(false);
    }
  }

  function selectGuest(guest) {
    setSelectedGuest(guest);

    /*
     * Se já houve uma confirmação anteriormente,
     * mantém o valor salvo.
     *
     * Caso ainda não exista o campo,
     * começa marcado.
     */
    setMainConfirmed(
      typeof guest.confirmado === 'boolean'
        ? guest.confirmado
        : true
    );

    setCompanions(
      (guest.acompanhantes || []).map(
        (item) => ({
          ...item
        })
      )
    );

    setNote(
      guest.observacao || ''
    );

    setMessage('');
  }

  function toggleCompanion(index) {
    setCompanions((current) =>
      current.map((item, itemIndex) =>
        itemIndex === index
          ? {
              ...item,
              confirmado: !item.confirmado
            }
          : item
      )
    );
  }

  async function handleConfirm() {
    if (!selectedGuest) {
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      await confirmGuest(
        selectedGuest.id,
        {
          confirmado: mainConfirmed,
          acompanhantes: companions,
          observacao: note
        }
      );

      setMessage(
        'Presença atualizada com sucesso. Obrigada! 💗'
      );

    } catch (error) {
      console.error(error);

      setMessage(
        'Não foi possível confirmar. Tente novamente ou fale com os noivos.'
      );

    } finally {
      setLoading(false);
    }
  }

  return (
    <section
      className="section rsvp"
      id="rsvp"
    >
      <p className="eyebrow dark">
        Convite
      </p>

      <h2>
        Confirme sua presença
      </h2>

      <p className="sectionIntro">
        Digite seu nome para encontrar seu convite.
        Se você for acompanhante, pode pesquisar
        pelo seu próprio nome.
      </p>

      <form
        className="searchBox"
        onSubmit={handleSearch}
      >
        <input
          value={name}
          onChange={(event) => {
            setName(event.target.value);

            /*
             * Limpa mensagens antigas enquanto
             * a pessoa corrige o nome.
             */
            if (message) {
              setMessage('');
            }
          }}
          placeholder="Digite seu nome"
          autoComplete="name"
        />

        <button
          type="submit"
          disabled={loading}
        >
          {loading
            ? 'Buscando...'
            : 'Buscar convite'}
        </button>
      </form>

      {message && (
        <p className="notice">
          {message}
        </p>
      )}

      {selectedGuest && (
        <div className="resultCard">
          <h3>
            Convidado encontrado 💗
          </h3>

          <p className="muted">
            Marque abaixo quem poderá comparecer.
          </p>

          <label className="checkLine">
            <input
              type="checkbox"
              checked={mainConfirmed}
              onChange={() =>
                setMainConfirmed(
                  !mainConfirmed
                )
              }
            />

            <span>
              {selectedGuest.nome}
            </span>
          </label>

          {companions.length > 0 && (
            <>
              <h4>
                Acompanhantes
              </h4>

              <div className="stack">
                {companions.map(
                  (person, index) => (
                    <label
                      className="checkLine"
                      key={`${person.nome}-${index}`}
                    >
                      <input
                        type="checkbox"
                        checked={Boolean(
                          person.confirmado
                        )}
                        onChange={() =>
                          toggleCompanion(index)
                        }
                      />

                      <span>
                        {person.nome}
                      </span>
                    </label>
                  )
                )}
              </div>
            </>
          )}

          {companions.length === 0 && (
            <p className="muted">
              Não há acompanhantes cadastrados
              para este convite.
            </p>
          )}

          <button
            type="button"
            className="fullButton"
            onClick={handleConfirm}
            disabled={loading}
          >
            {loading
              ? 'Salvando...'
              : 'Confirmar presença'}
          </button>
        </div>
      )}
    </section>
  );
}