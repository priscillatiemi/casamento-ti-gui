import { useState } from 'react';
import { saveGiftIntent } from '../services/firebase.js';

const PIX_KEY = 'COLOQUE_SUA_CHAVE_PIX_AQUI';
const MERCADO_PAGO_LINK =
  'https://link.mercadopago.com.br/casamentotg';

const gifts = [
  {
    name: 'Passagem de Shinkansen',
    value: 1000,
    description: 'Para uma experiência inesquecível no trem-bala japonês.',
    image: '/gifts/ramen.jpg'
  },
  {
    name: 'Geladeira',
    value: 3000,
    description: 'Para nos ajudar a montar nossa casa nova!',
    image: '/gifts/ramen.jpg'
  },
  {
    name: 'Air Fryer',
    value: 800,
    description: 'Para facilitar a nossa rotina na cozinha.',
    image: '/gifts/ramen.jpg'
  },
  {
    name: 'Pacote de ração do Eren',
    value: 350,
    description: 'Para garantir a felicidade do nosso amado Eren!',
    image: '/gifts/ramen.jpg'
  },
  {
    name: 'Máquina de espresso do Gui',
    value: 2000,
    description: 'Para preparar o melhor café da manhã!',
    image: '/gifts/ramen.jpg'
  },
  {
    name: 'Para a Ti fazer as compras na Shein',
    value: 400,
    description: 'Para a Ti comprar roupas novas na Shein!',
    image: '/gifts/ramen.jpg'
  },
  {
    name: 'Microondas',
    value: 500,
    description: 'Para esquentar as comidinhas do dia a dia!',
    image: '/gifts/ramen.jpg'
  },
  {
    name: 'Viagem para Okinawa',
    value: 2000,
    description: 'Visita à terra natal dos parentes do Gui!',
    image: '/gifts/ramen.jpg'
  },
  {
    name: 'Comprar um Sanshin para o Gui',
    value: 1400,
    description: 'Para o Gui aprender a tocar seu instrumento favorito de Okinawa!',
    image: '/gifts/ramen.jpg'
  },
  {
    name: 'Guitarra pra Ti',
    value: 500,
    description: 'Uma contribuição para a nossa viagem.',
    image: '/gifts/ramen.jpg'
  },
  {
    name: 'Jantar romântico na Viagem',
    value: 450,
    description: 'Para a gente aproveitar um tempo juntinhos em uma viagem!',
    image: '/gifts/ramen.jpg'
  },
  {
    name: 'Comprar meias novas para o Gui',
    value: 300,
    description: 'Para o Gui renovar seu estoque de meias, que estão pedindo socorro!',
    image: '/gifts/ramen.jpg'
  },
  {
    name: 'Comprar a receita de Pudim da Tânia',
    value: 1000,
    description: 'O segredo que todos querem saber para fazer o melhor pudim do mundo!',
    image: '/gifts/ramen.jpg'
  },
  {
    name: 'Comprar a receita de salada de macarrão da Nilce',
    value: 1000,
    description: 'A salada favorita da Ti e do Gui!',
    image: '/gifts/ramen.jpg'
  },
  {
    name: 'Aspirador Robô',
    value: 1200,
    description: 'Pra aspirar os pelos do Eren que ficam pela casa!',
    image: '/gifts/ramen.jpg'
  },
  {
    name: 'Caminhão pipa pra satisfazer a sede da Ti',
    value: 700,
    description: 'Pra matar a sede da Ti, que é insaciável!',
    image: '/gifts/ramen.jpg'
  },
  {
    name: 'Dinheiro pro Gui renovar a coleção de camisa Pima dele',
    value: 1000,
    description: 'Para o Gui comprar camisas Pima novas, que são as favoritas dele!',
    image: '/gifts/ramen.jpg'
  },
  {
    name: 'Dinheiro pra indenizar as pessoas que foram mordidas pelo Eren!',
    value: 1300,
    description: 'Para cobrir os custos de possíveis mordidas do Eren!',
    image: '/gifts/ramen.jpg'
  },
  {
    name: 'Ingressos para shows de Metal',
    value: 600,
    description: 'Para a Ti ir nos shows de metal que ela ama tanto!',
    image: '/gifts/ramen.jpg'
  },
  {
    name: 'Câmera para gravar pro canal da Ti e do Gui',
    value: 2500,
    description: 'Ajuda a gente a sair do CLT!',
    image: '/gifts/ramen.jpg'
  },
  {
    name: 'Hotel pra o Eren ficar enquanto viajamos',
    value: 2150,
    description: 'Para o Eren ficar confortável e bem cuidado enquanto estamos viajando!',
    image: '/gifts/ramen.jpg'
  },
  {
    name: 'Para o Gui comprar livros',
    value: 600,
    description: 'Para o Gui encher a estante de livros dele!',
    image: '/gifts/ramen.jpg'
  },
  {
    name: 'Ingressos para os shows de Kpop do Gui',
    value: 800,
    description: 'Para o Gui ir nos shows de Kpop que ele ama tanto!',
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