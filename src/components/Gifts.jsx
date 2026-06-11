import { useState } from 'react';
import { saveGiftIntent } from '../services/firebase.js';

const PIX_KEY = 'COLOQUE_SUA_CHAVE_PIX_AQUI';
const MERCADO_PAGO_LINK =
  'https://link.mercadopago.com.br/casamentotg';

const gifts = [
  {
    name: 'Ramen em Tóquio',
    value: 100,
    description: 'Para um jantar especial na lua de mel.',
    image: '/gifts/ramen.jpg'
  },
  {
    name: 'Passeio em Akihabara',
    value: 150,
    description: 'Para viver nosso lado anime e gamer.',
    image: '/gifts/ramen.jpg'
  },
  {
    name: 'Café em Kyoto',
    value: 180,
    description: 'Um momento romântico no Japão.',
    image: '/gifts/ramen.jpg'
  },
  {
    name: 'Ticket de trem',
    value: 250,
    description: 'Ajuda para conhecer mais cidades.',
    image: '/gifts/ramen.jpg'
  },
  {
    name: 'Jantar romântico',
    value: 300,
    description: 'Uma noite especial para comemorar.',
    image: '/gifts/ramen.jpg'
  },
  {
    name: 'Ajuda na passagem',
    value: 500,
    description: 'Uma contribuição para a nossa viagem.',
    image: '/gifts/ramen.jpg'
  }
];

export default function Gifts() {
  const [selectedGift, setSelectedGift] = useState(null);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [feedback, setFeedback] = useState('');

  async function copyPix() {
    try {
      await navigator.clipboard.writeText(PIX_KEY);
      setFeedback('Chave PIX copiada!');
    } catch {
      setFeedback('Não foi possível copiar automaticamente. Copie a chave manualmente.');
    }
  }

  async function saveIntent() {
    if (!selectedGift) return;

    try {
      await saveGiftIntent({
        presente: selectedGift.name,
        valor: selectedGift.value,
        nome: name,
        mensagem: message
      });

      setFeedback('Mensagem salva. Muito obrigada pelo carinho!');
      setName('');
      setMessage('');
    } catch (error) {
      console.error(error);
      setFeedback('Não foi possível salvar a mensagem, mas você ainda pode fazer o PIX diretamente.');
    }
  }

  return (
    <section className="section gifts" id="presentes">
      <p className="eyebrow dark">Presentes</p>
      <h2>Lista simbólica para a lua de mel</h2>

      <p className="sectionIntro">
        Os valores são apenas sugestões. Você pode presentear via PIX ou cartão de crédito.
      </p>

      <div className="giftGrid">
        {gifts.map((gift) => (
          <article className="giftCard" key={gift.name}>
            <h3>{gift.name}</h3>
            <p>{gift.description}</p>
            <img
              src={gift.image}
              alt={gift.name}
              className="giftImage"
            />
            <strong>R$ {gift.value}</strong>

            <button
              onClick={() => {
                setSelectedGift(gift);
                setFeedback('');
              }}
            >
              Presentear via PIX
            </button>

            <a
              href={MERCADO_PAGO_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="cardPaymentButton"
            >
              Pagar com cartão
            </a>
          </article>
        ))}
      </div>

      {selectedGift && (
        <div className="pixPanel">
          <h3>{selectedGift.name}</h3>

          <p>
            Valor sugerido: <strong>R$ {selectedGift.value}</strong>
          </p>

          <div className="pixKey">
            <span>Chave PIX</span>
            <strong>{PIX_KEY}</strong>
          </div>

          <button className="fullButton" onClick={copyPix}>
            Copiar chave PIX
          </button>

          <a
            href={MERCADO_PAGO_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="fullButton cardLink"
          >
            Pagar este presente com cartão
          </a>

          <div className="giftMessage">
            <input
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Seu nome opcional"
            />

            <textarea
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              placeholder="Mensagem opcional para os noivos"
            />

            <button className="secondaryButton" onClick={saveIntent}>
              Salvar mensagem
            </button>
          </div>

          {feedback && <p className="notice">{feedback}</p>}
        </div>
      )}
    </section>
  );
}