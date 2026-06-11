import { useState } from 'react';
import { confirmGuest, searchGuestByName } from '../services/firebase.js';

export default function RSVP() {
  const [name, setName] = useState('');
  const [results, setResults] = useState([]);
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
    setResults([]);

    if (name.trim().length < 3) {
      setMessage('Digite pelo menos 3 letras do nome.');
      return;
    }

    setLoading(true);
    try {
      const guests = await searchGuestByName(name);
      if (guests.length === 0) {
        setMessage('Não encontramos seu convite. Confira o nome digitado ou fale com os noivos.');
      } else if (guests.length === 1) {
        selectGuest(guests[0]);
      } else {
        setResults(guests);
      }
    } catch (error) {
      console.error(error);
      setMessage('Não foi possível buscar agora. Confira a configuração do Firebase.');
    } finally {
      setLoading(false);
    }
  }

  function selectGuest(guest) {
    setSelectedGuest(guest);
    setMainConfirmed(Boolean(guest.confirmado) || true);
    setCompanions((guest.acompanhantes || []).map((item) => ({ ...item })));
    setNote(guest.observacao || '');
    setResults([]);
    setMessage('');
  }

  function toggleCompanion(index) {
    setCompanions((current) => current.map((item, itemIndex) => (
      itemIndex === index ? { ...item, confirmado: !item.confirmado } : item
    )));
  }

  async function handleConfirm() {
    if (!selectedGuest) return;
    setLoading(true);
    try {
      await confirmGuest(selectedGuest.id, {
        confirmado: mainConfirmed,
        acompanhantes: companions,
        observacao: note
      });
      setMessage('Presença atualizada com sucesso. Obrigada!');
    } catch (error) {
      console.error(error);
      setMessage('Não foi possível confirmar. Tente novamente ou fale com os noivos.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="section rsvp" id="rsvp">
      <p className="eyebrow dark">Convite</p>
      <h2>Confirme sua presença</h2>
      <p className="sectionIntro">
        Digite seu nome para encontrar seu convite. Os acompanhantes aparecem automaticamente conforme a lista dos noivos.
      </p>

      <form className="searchBox" onSubmit={handleSearch}>
        <input
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="Digite seu nome"
          autoComplete="name"
        />
        <button type="submit" disabled={loading}>{loading ? 'Buscando...' : 'Buscar convite'}</button>
      </form>

      {message && <p className="notice">{message}</p>}

      {results.length > 0 && (
        <div className="resultCard">
          <h3>Encontramos mais de uma opção</h3>
          <p>Selecione o seu convite:</p>
          <div className="stack">
            {results.map((guest) => (
              <button className="ghostButton" key={guest.id} onClick={() => selectGuest(guest)}>
                {guest.nome} {guest.grupo ? `• ${guest.grupo}` : ''}
              </button>
            ))}
          </div>
        </div>
      )}

      {selectedGuest && (
        <div className="resultCard">
          <h3>Convidado Encontrado</h3>
          <label className="checkLine">
            <input
              type="checkbox"
              checked={mainConfirmed}
              onChange={() => setMainConfirmed(!mainConfirmed)}
            />
            <span>{selectedGuest.nome}</span>
          </label>

          <h4>Acompanhantes</h4>
          {companions.length === 0 ? (
            <p className="muted">Não há acompanhantes cadastrados para este convite.</p>
          ) : (
            <div className="stack">
              {companions.map((person, index) => (
                <label className="checkLine" key={`${person.nome}-${index}`}>
                  <input
                    type="checkbox"
                    checked={Boolean(person.confirmado)}
                    onChange={() => toggleCompanion(index)}
                  />
                  <span>{person.nome}</span>
                </label>
              ))}
            </div>
          )}

          <button className="fullButton" onClick={handleConfirm} disabled={loading}>
            {loading ? 'Salvando...' : 'Confirmar presença'}
          </button>
        </div>
      )}
    </section>
  );
}
