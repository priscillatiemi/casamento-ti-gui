import { useState } from 'react';
import { saveGiftIntent } from '../services/firebase.js';

const gifts = [
  {
    name: 'Passagem de Shinkansen',
    value: 1000,
    description: 'Para uma experiência inesquecível no trem-bala japonês.',
    image: '/gifts/shinkansen.png',
    mercadoPagoLink: 'https://mpago.la/3441ncx',
    pixLink: 'https://www.mercadopago.com.br/checkout/v1/redirect?pref_id=3441ncx'
  },
  {
    name: 'Geladeira',
    value: 3000,
    description: 'Para nos ajudar a montar nossa casa nova!',
    image: '/gifts/geladeira.png',
    mercadoPagoLink: 'https://mpago.la/1wAvD7A',
    pixLink: 'https://www.mercadopago.com.br/checkout/v1/redirect?pref_id=3441ncx'
  },
  {
    name: 'Air Fryer',
    value: 800,
    description: 'Para facilitar a nossa rotina na cozinha.',
    image: '/gifts/airfryer.png',
    mercadoPagoLink: 'https://mpago.la/1z3mhC9',
    pixLink: 'https://www.mercadopago.com.br/checkout/v1/redirect?pref_id=3441ncx'
  },
  {
    name: 'Pacote de ração do Eren',
    value: 200,
    description: 'Para garantir a felicidade do nosso amado Eren!',
    image: '/gifts/racao.png',
    mercadoPagoLink: 'https://mpago.la/2DJDA9x',
    pixLink: 'https://www.mercadopago.com.br/checkout/v1/redirect?pref_id=3441ncx'
  },
  {
    name: 'Máquina de espresso do Gui',
    value: 2000,
    description: 'Para preparar o melhor café da manhã!',
    image: '/gifts/espresso.png',
    mercadoPagoLink: 'https://mpago.la/1VC4Wxj',
    pixLink: 'https://www.mercadopago.com.br/checkout/v1/redirect?pref_id=3441ncx'
  },
  {
    name: 'Para a Ti fazer as compras na Shein',
    value: 400,
    description: 'Para a Ti comprar roupas novas na Shein!',
    image: '/gifts/shein.png',
    mercadoPagoLink: 'https://mpago.la/1dRncPt',
    pixLink: 'https://www.mercadopago.com.br/checkout/v1/redirect?pref_id=3441ncx'
  },
  {
    name: 'Microondas',
    value: 500,
    description: 'Para esquentar as comidinhas do dia a dia!',
    image: '/gifts/microondas.png',
    mercadoPagoLink: 'https://mpago.la/2spzrrM',
    pixLink: 'https://www.mercadopago.com.br/checkout/v1/redirect?pref_id=3441ncx'
  },
  {
    name: 'Viagem para Okinawa',
    value: 2000,
    description: 'Visita à terra natal dos parentes do Gui!',
    image: '/gifts/okinawa.png',
    mercadoPagoLink: 'https://mpago.la/2gVYsTK',
    pixLink: 'https://www.mercadopago.com.br/checkout/v1/redirect?pref_id=3441ncx'
  },
  {
    name: 'Comprar um Sanshin para o Gui',
    value: 1400,
    description: 'Para o Gui aprender a tocar seu instrumento favorito de Okinawa!',
    image: '/gifts/sanshin.png',
    mercadoPagoLink: 'https://mpago.la/17z92JG',
    pixLink: 'https://www.mercadopago.com.br/checkout/v1/redirect?pref_id=3441ncx'
  },
  {
    name: 'Guitarra pra Ti',
    value: 500,
    description: 'Uma guitarra nova para a Ti!',
    image: '/gifts/guitarra.png',
    mercadoPagoLink: 'https://mpago.la/32iPp8S',
    pixLink: 'https://www.mercadopago.com.br/checkout/v1/redirect?pref_id=3441ncx'
  },
  {
    name: 'Jantar romântico na Viagem',
    value: 450,
    description: 'Para a gente aproveitar um tempo juntinhos em uma viagem!',
    image: '/gifts/jantar.png',
    mercadoPagoLink: 'https://mpago.la/1WMRx4Q',
    pixLink: 'https://www.mercadopago.com.br/checkout/v1/redirect?pref_id=3441ncx'
  },
  {
    name: 'Comprar meias novas para o Gui',
    value: 300,
    description: 'Para o Gui renovar seu estoque de meias, que estão pedindo socorro!',
    image: '/gifts/meias.png',
    mercadoPagoLink: 'https://mpago.la/1pvb9zr',
    pixLink: 'https://www.mercadopago.com.br/checkout/v1/redirect?pref_id=3441ncx'
  },
  {
    name: 'Comprar a receita de Pudim da Tânia',
    value: 1000,
    description: 'O segredo que todos querem saber para fazer o melhor pudim do mundo!',
    image: '/gifts/pudim.png',
    mercadoPagoLink: 'https://mpago.la/2dajc9U',
    pixLink: 'https://www.mercadopago.com.br/checkout/v1/redirect?pref_id=3441ncx'
  },
  {
    name: 'Comprar a receita de salada de macarrão da Nilce',
    value: 1000,
    description: 'A salada favorita da Ti e do Gui!',
    image: '/gifts/salada.png',
    mercadoPagoLink: 'https://mpago.la/1xCH1GR',
    pixLink: 'https://www.mercadopago.com.br/checkout/v1/redirect?pref_id=3441ncx'
  },
  {
    name: 'Aspirador Robô',
    value: 1200,
    description: 'Pra aspirar os pelos do Eren que ficam pela casa!',
    image: '/gifts/aspirador.png',
    mercadoPagoLink: 'https://mpago.la/1CN3GeW',
    pixLink: 'https://www.mercadopago.com.br/checkout/v1/redirect?pref_id=3441ncx'
  },
  {
    name: 'Caminhão pipa pra satisfazer a sede da Ti',
    value: 700,
    description: 'Pra matar a sede da Ti, que é insaciável!',
    image: '/gifts/agua.png',
    mercadoPagoLink: 'https://mpago.la/2yYvYY7',
    pixLink: 'https://www.mercadopago.com.br/checkout/v1/redirect?pref_id=3441ncx'
  },
  {
    name: 'Dinheiro pro Gui renovar a coleção de camisa Pima dele',
    value: 1000,
    description: 'Para o Gui comprar camisas Pima novas, que são as favoritas dele!',
    image: '/gifts/pima.png',
    mercadoPagoLink: 'https://mpago.la/1x2vkCq',
    pixLink: 'https://www.mercadopago.com.br/checkout/v1/redirect?pref_id=3441ncx'
  },
  {
    name: 'Dinheiro pra indenizar as pessoas que foram mordidas pelo Eren!',
    value: 1300,
    description: 'Para cobrir os custos de possíveis mordidas do Eren!',
    image: '/gifts/mordida.png',
    mercadoPagoLink: 'https://mpago.la/2z4WRFd',
    pixLink: 'https://www.mercadopago.com.br/checkout/v1/redirect?pref_id=3441ncx'
  },
  {
    name: 'Ingressos para shows de Metal',
    value: 600,
    description: 'Para a Ti ir nos shows de metal que ela tanto ama!',
    image: '/gifts/metal.png',
    mercadoPagoLink: 'https://mpago.la/1xR7fRt',
    pixLink: 'https://www.mercadopago.com.br/checkout/v1/redirect?pref_id=3441ncx'
  },
  {
    name: 'Câmera para gravar pro canal da Ti e do Gui',
    value: 2500,
    description: 'Ajuda a gente a sair do CLT!',
    image: '/gifts/camera.png',
    mercadoPagoLink: 'https://mpago.la/21A1xhk',
    pixLink: 'https://www.mercadopago.com.br/checkout/v1/redirect?pref_id=3441ncx'
  },
  {
    name: 'Hotel pra o Eren ficar enquanto viajamos',
    value: 2150,
    description: 'Para o Eren ficar confortável e bem cuidado enquanto estamos viajando!',
    image: '/gifts/hospedagem.png',
    mercadoPagoLink: 'https://mpago.la/2LK3ofm',
    pixLink: 'https://www.mercadopago.com.br/checkout/v1/redirect?pref_id=3441ncx'
  },
  {
    name: 'Para o Gui comprar livros',
    value: 150,
    description: 'Para o Gui encher a estante de livros dele!',
    image: '/gifts/livros.png',
    mercadoPagoLink: 'https://mpago.la/1oSBA8G',
    pixLink: 'https://www.mercadopago.com.br/checkout/v1/redirect?pref_id=3441ncx'
  },
  {
    name: 'Ingressos para os shows de Kpop do Gui',
    value: 800,
    description: 'Para o Gui ir nos shows de Kpop que ele ama tanto!',
    image: '/gifts/kpop.png',
    mercadoPagoLink: 'https://mpago.la/1okAFng',
    pixLink: 'https://www.mercadopago.com.br/checkout/v1/redirect?pref_id=3441ncx'
  },
  {
    name: 'Outros valores',
    value: 0,
    description: 'Para quem quiser contribuir com outros valores, que serão muito bem-vindos! Agradecemos demais pelo carinho e apoio!',
    image: '/gifts/outros.png',
    mercadoPagoLink: 'https://link.mercadopago.com.br/casamentotg',
    pixLink: 'https://nubank.com.br/cobrar/d8ctm/6aa0bb45-dc0f-4a5a-a06a-edf641e8bbc3'
  }
];

export default function Gifts() {
  const [selectedGift, setSelectedGift] = useState(null);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [feedback, setFeedback] = useState('');

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
        Os valores são apenas sugestões. Você pode presentear via PIX ou cartão de crédito(Permite parcelar) .
      </p>

      <div className="giftGrid">
        {gifts.map((gift) => (
          <article className="giftCard" key={gift.name}>
            <h3>{gift.name}</h3>
              <img
                src={gift.image}
                alt={gift.name}
                className="giftImage"
              />
            <p>{gift.description}</p>
            <strong>R$ {gift.value}</strong>

            <a
              href={gift.pixLink}
              target="_blank"
              rel="noopener noreferrer"
              className="pixPaymentButton"
            >
              Presentear via PIX
            </a>

            <a
              href={gift.mercadoPagoLink}
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
            href={selectedGift.mercadoPagoLink}
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