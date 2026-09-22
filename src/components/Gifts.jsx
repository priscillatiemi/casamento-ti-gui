import { useEffect, useState } from 'react';

import {
  confirmGiftReceived,
  getGiftConfirmations
} from '../services/firebase.js';

const INITIAL_QUOTAS = 4;

const gifts = [
  {
    id: 'shinkansen',
    name: 'Passagem de Shinkansen',
    value: 1000,
    description: 'Para uma experiência inesquecível no trem-bala japonês.',
    image: '/gifts/shinkansen.png',
    mercadoPagoLink: 'https://mpago.la/3441ncx',
    pixLink: 'https://nubank.com.br/cobrar/d8ctm/6ab1836d-680a-4751-be90-8372ab6df06d'
  },
  {
    id: 'geladeira',
    name: 'Geladeira',
    value: 3000,
    description: 'Para nos ajudar a montar nossa casa nova!',
    image: '/gifts/geladeira.png',
    mercadoPagoLink: 'https://mpago.la/1wAvD7A',
    pixLink: 'https://nubank.com.br/cobrar/aypyb/6ab0213e-bbef-4382-89ac-2cf874fb472c'
  },
  {
    id: 'air-fryer',
    name: 'Air Fryer',
    value: 800,
    description: 'Para facilitar a nossa rotina na cozinha.',
    image: '/gifts/airfryer.png',
    mercadoPagoLink: 'https://mpago.la/1z3mhC9',
    pixLink: 'https://nubank.com.br/cobrar/aypyb/6ab0218a-ff28-41a0-8f7a-a0f42ff684f1'
  },
  {
    id: 'racao-eren',
    name: 'Pacote de ração do Eren',
    value: 200,
    description: 'Para garantir a felicidade do nosso amado Eren!',
    image: '/gifts/racao.png',
    mercadoPagoLink: 'https://mpago.la/2DJDA9x',
    pixLink: 'https://nubank.com.br/cobrar/aypyb/6ab021b5-6f57-4363-a887-d9e1ef07ecf9'
  },
  {
    id: 'espresso',
    name: 'Máquina de espresso do Gui',
    value: 2000,
    description: 'Para preparar o melhor café da manhã!',
    image: '/gifts/espresso.png',
    mercadoPagoLink: 'https://mpago.la/1VC4Wxj',
    pixLink: 'https://nubank.com.br/cobrar/aypyb/6ab02201-e16e-450a-8a2b-5975d037930a'
  },
  {
    id: 'shein',
    name: 'Para a Ti fazer as compras na Shein',
    value: 400,
    description: 'Para a Ti comprar roupas novas na Shein!',
    image: '/gifts/shein.png',
    mercadoPagoLink: 'https://mpago.la/1dRncPt',
    pixLink: 'https://nubank.com.br/cobrar/aypyb/6ab02216-3834-4732-89db-a94395561793'
  },
  {
    id: 'microondas',
    name: 'Microondas',
    value: 500,
    description: 'Para esquentar as comidinhas do dia a dia!',
    image: '/gifts/microondas.png',
    mercadoPagoLink: 'https://mpago.la/2spzrrM',
    pixLink: 'https://nubank.com.br/cobrar/aypyb/6ab02224-0b40-4fc5-acad-b76d9a35dc4b'
  },
  {
    id: 'okinawa',
    name: 'Viagem para Okinawa',
    value: 2000,
    description: 'Visita à terra natal dos parentes do Gui!',
    image: '/gifts/okinawa.png',
    mercadoPagoLink: 'https://mpago.la/2gVYsTK',
    pixLink: 'https://nubank.com.br/cobrar/aypyb/6ab02201-e16e-450a-8a2b-5975d037930a'
  },
  {
    id: 'sanshin',
    name: 'Comprar um Sanshin para o Gui',
    value: 1400,
    description: 'Para o Gui aprender a tocar seu instrumento favorito de Okinawa!',
    image: '/gifts/sanshin.png',
    mercadoPagoLink: 'https://mpago.la/17z92JG',
    pixLink: 'https://nubank.com.br/cobrar/d8ctm/6ab18381-6d0a-417a-8668-3dfaf6d0c39c'
  },
  {
    id: 'guitarra',
    name: 'Guitarra pra Ti',
    value: 500,
    description: 'Uma guitarra nova para a Ti!',
    image: '/gifts/guitarra.png',
    mercadoPagoLink: 'https://mpago.la/32iPp8S',
    pixLink: 'https://nubank.com.br/cobrar/aypyb/6ab02224-0b40-4fc5-acad-b76d9a35dc4b'
  },
  {
    id: 'jantar',
    name: 'Jantar romântico na Viagem',
    value: 450,
    description: 'Para a gente aproveitar um tempo juntinhos em uma viagem!',
    image: '/gifts/jantar.png',
    mercadoPagoLink: 'https://mpago.la/1WMRx4Q',
    pixLink: 'https://nubank.com.br/cobrar/aypyb/6ab02277-bd32-4c12-ba27-3e358aea4e29'
  },
  {
    id: 'meias',
    name: 'Comprar meias novas para o Gui',
    value: 300,
    description: 'Para o Gui renovar seu estoque de meias, que estão pedindo socorro!',
    image: '/gifts/meias.png',
    mercadoPagoLink: 'https://mpago.la/1pvb9zr',
    pixLink: 'https://nubank.com.br/cobrar/aypyb/6ab0228a-05b2-4e0d-bdb8-6b0b8dc88a06'
  },
  {
    id: 'pudim',
    name: 'Comprar a receita de Pudim da Tânia',
    value: 1000,
    description: 'O segredo que todos querem saber para fazer o melhor pudim do mundo!',
    image: '/gifts/pudim.png',
    mercadoPagoLink: 'https://mpago.la/2dajc9U',
    pixLink: 'https://nubank.com.br/cobrar/d8ctm/6ab1836d-680a-4751-be90-8372ab6df06d'
  },
  {
    id: 'salada',
    name: 'Comprar a receita de salada de macarrão da Nilce',
    value: 1000,
    description: 'A salada favorita da Ti e do Gui!',
    image: '/gifts/salada.jpeg',
    mercadoPagoLink: 'https://mpago.la/1xCH1GR',
    pixLink: 'https://nubank.com.br/cobrar/d8ctm/6ab1836d-680a-4751-be90-8372ab6df06d'
  },
  {
    id: 'aspirador',
    name: 'Aspirador Robô',
    value: 1200,
    description: 'Pra aspirar os pelos do Eren que ficam pela casa!',
    image: '/gifts/aspirador.png',
    mercadoPagoLink: 'https://mpago.la/1CN3GeW',
    pixLink: 'https://nubank.com.br/cobrar/aypyb/6ab022cf-8df5-4f62-bec4-f3c206e91c65'
  },
  {
    id: 'agua',
    name: 'Caminhão pipa pra satisfazer a sede da Ti',
    value: 700,
    description: 'Pra matar a sede da Ti, que é insaciável!',
    image: '/gifts/agua.png',
    mercadoPagoLink: 'https://mpago.la/2yYvYY7',
    pixLink: 'https://nubank.com.br/cobrar/aypyb/6ab022e1-da6b-43bf-adb3-a593a3d2a96c'
  },
  {
    id: 'pima',
    name: 'Dinheiro pro Gui renovar a coleção de camisa Pima dele',
    value: 1000,
    description: 'Para o Gui comprar camisas Pima novas, que são as favoritas dele!',
    image: '/gifts/pima.png',
    mercadoPagoLink: 'https://mpago.la/1x2vkCq',
    pixLink: 'https://nubank.com.br/cobrar/d8ctm/6ab1836d-680a-4751-be90-8372ab6df06d'
  },
  {
    id: 'mordida',
    name: 'Dinheiro pra indenizar as pessoas que foram mordidas pelo Eren!',
    value: 1300,
    description: 'Para cobrir os custos de possíveis mordidas do Eren!',
    image: '/gifts/mordida.png',
    mercadoPagoLink: 'https://mpago.la/2z4WRFd',
    pixLink: 'https://nubank.com.br/cobrar/aypyb/6ab022fb-044e-4465-a126-80e747e0bb96'
  },
  {
    id: 'metal',
    name: 'Ingressos para shows de Metal',
    value: 600,
    description: 'Para a Ti ir nos shows de metal que ela tanto ama!',
    image: '/gifts/metal.png',
    mercadoPagoLink: 'https://mpago.la/1xR7fRt',
    pixLink: 'https://nubank.com.br/cobrar/aypyb/6ab02314-1a0c-4592-b87d-01e557ae7a0c'
  },
  {
    id: 'camera',
    name: 'Câmera para gravar pro canal da Ti e do Gui',
    value: 2500,
    description: 'Ajuda a gente a sair do CLT!',
    image: '/gifts/camera.png',
    mercadoPagoLink: 'https://mpago.la/21A1xhk',
    pixLink: 'https://nubank.com.br/cobrar/aypyb/6ab02323-0d4d-4a2a-80b0-2478c1a801e9'
  },
  {
    id: 'hospedagem',
    name: 'Hotel pra o Eren ficar enquanto viajamos',
    value: 2150,
    description: 'Para o Eren ficar confortável e bem cuidado enquanto estamos viajando!',
    image: '/gifts/hospedagem.png',
    mercadoPagoLink: 'https://mpago.la/2LK3ofm',
    pixLink: 'https://nubank.com.br/cobrar/aypyb/6ab0233b-7d85-455d-9819-9e4365422ab4'
  },
  {
    id: 'livros',
    name: 'Para o Gui comprar livros',
    value: 150,
    description: 'Para o Gui encher a estante de livros dele!',
    image: '/gifts/livros.png',
    mercadoPagoLink: 'https://mpago.la/1oSBA8G',
    pixLink: 'https://nubank.com.br/cobrar/aypyb/6ab0235e-1875-4561-95e7-3f3bc3702e82'
  },
  {
    id: 'kpop',
    name: 'Ingressos para os shows de Kpop do Gui',
    value: 800,
    description: 'Para o Gui ir nos shows de Kpop que ele ama tanto!',
    image: '/gifts/kpop.png',
    mercadoPagoLink: 'https://mpago.la/1okAFng',
    pixLink: 'https://nubank.com.br/cobrar/aypyb/6ab0218a-ff28-41a0-8f7a-a0f42ff684f1'
  },
  {
    id: 'outros',
    name: 'Outros valores',
    value: 0,
    description: 'Para quem quiser contribuir com outros valores, que serão muito bem-vindos! Agradecemos demais pelo carinho e apoio!',
    image: '/gifts/outros.png',
    mercadoPagoLink: 'https://link.mercadopago.com.br/casamentotg',
    pixLink: 'https://nubank.com.br/cobrar/aypyb/6ab023d1-8a2e-4742-90e6-ea59ab66090a'
  }
];

function isLimitedGift(gift) {
  return gift.value > 0 && gift.value <= 500;
}

export default function Gifts() {
  const [giftCounts, setGiftCounts] = useState({});
  const [pendingGift, setPendingGift] = useState(null);
  const [feedback, setFeedback] = useState('');
  const [confirming, setConfirming] = useState(false);

  /*
   * Ordena automaticamente os presentes
   * do maior valor para o menor.
   *
   * "Outros valores" possui value: 0,
   * então ficará sempre por último.
   */
  const sortedGifts = [...gifts].sort(
    (a, b) => b.value - a.value
  );

  async function loadConfirmations() {
    try {
      const confirmations =
        await getGiftConfirmations();

      const counts = {};

      confirmations.forEach((confirmation) => {
        counts[confirmation.giftId] =
          (counts[confirmation.giftId] || 0) + 1;
      });

      setGiftCounts(counts);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    loadConfirmations();
  }, []);

  function showFeedback(message) {
    setFeedback(message);

    setTimeout(() => {
      setFeedback('');
    }, 4000);
  }

  function handlePaymentClick(gift) {
    if (!isLimitedGift(gift)) {
      return;
    }

    const confirmed =
      giftCounts[gift.id] || 0;

    if (confirmed >= INITIAL_QUOTAS) {
      return;
    }

    setPendingGift(gift);
    setFeedback('');
  }

  async function handleConfirmGift() {
    if (!pendingGift) {
      return;
    }

    const currentCount =
      giftCounts[pendingGift.id] || 0;

    if (currentCount >= INITIAL_QUOTAS) {
      setPendingGift(null);

      showFeedback(
        'Este presente já esgotou 💗'
      );

      return;
    }

    const storageKey =
      `presente-confirmado-${pendingGift.id}`;

    const alreadyConfirmed =
      localStorage.getItem(storageKey);

    if (alreadyConfirmed) {
      setPendingGift(null);

      showFeedback(
        'Você já confirmou este presente neste dispositivo 💗'
      );

      return;
    }

    try {
      setConfirming(true);
      setFeedback('');

      await confirmGiftReceived(
        pendingGift.id
      );

      localStorage.setItem(
        storageKey,
        'true'
      );

      setGiftCounts((current) => ({
        ...current,
        [pendingGift.id]:
          (current[pendingGift.id] || 0) + 1
      }));

      setPendingGift(null);

      showFeedback(
        'Presente confirmado! Muito obrigada pelo carinho 💗'
      );

    } catch (error) {
      console.error(error);

      showFeedback(
        'Não foi possível registrar agora. Tente novamente em alguns instantes.'
      );

    } finally {
      setConfirming(false);
    }
  }

  return (
    <section
      className="section gifts"
      id="presentes"
    >
      <p className="eyebrow dark">
        Presentes
      </p>

      <h2>Lista de presentes</h2>

      <p>
        Queridos familiares e amigos, para quem quiser nos presentear,
        deixamos como contribuição preferencial o PIX.
        Ficaremos muito gratos!
      </p>

      <p className="sectionIntro">
        Os valores são apenas sugestões.
        Você pode presentear via PIX ou cartão de crédito.
      </p>

      <p>
        Chave PIX: 11940395880 <br />
        Agradecemos demais pelo carinho e apoio!
      </p>

      <div className="giftGrid">
        {sortedGifts.map((gift) => {
          const limited =
            isLimitedGift(gift);

          const confirmed =
            giftCounts[gift.id] || 0;

          const remaining =
            Math.max(
              INITIAL_QUOTAS - confirmed,
              0
            );

          const soldOut =
            limited && remaining === 0;

          return (
            <article
              className={`giftCard ${
                soldOut
                  ? 'giftCardSoldOut'
                  : ''
              }`}
              key={gift.id}
            >
              <h3>{gift.name}</h3>

              <img
                src={gift.image}
                alt={gift.name}
                className="giftImage"
              />

              <p>{gift.description}</p>

              {gift.value > 0 ? (
                <strong>
                  R$ {gift.value}
                </strong>
              ) : (
                <strong>
                  Escolha o valor
                </strong>
              )}

              {limited && (
                <div
                  className={
                    soldOut
                      ? 'giftAvailability giftAvailabilitySoldOut'
                      : 'giftAvailability'
                  }
                >
                  {remaining >= 3 && (
                    <>
                      💗 {remaining} cotas disponíveis
                    </>
                  )}

                  {remaining === 2 && (
                    <>
                      💕 Apenas 2 cotas disponíveis
                    </>
                  )}

                  {remaining === 1 && (
                    <>
                      🔥 Última cota disponível!
                    </>
                  )}

                  {remaining === 0 && (
                    <>
                      💗 Este presente já esgotou
                    </>
                  )}
                </div>
              )}

              {!soldOut ? (
                <>
                  <a
                    href={gift.pixLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="pixPaymentButton"
                    onClick={() =>
                      handlePaymentClick(gift)
                    }
                  >
                    Presentear via PIX
                  </a>

                  <a
                    href={gift.mercadoPagoLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cardPaymentButton"
                    onClick={() =>
                      handlePaymentClick(gift)
                    }
                  >
                    Pagar com cartão
                  </a>
                </>
              ) : (
                <div className="giftSoldOutMessage">
                  Presente esgotado 💗
                </div>
              )}
            </article>
          );
        })}
      </div>

      {pendingGift && (
        <div className="giftConfirmationPanel">
          <div className="giftConfirmationContent">

            <span className="giftConfirmationHeart">
              💗
            </span>

            <h3>
              Já concluiu seu pagamento?
            </h3>

            <p>
              Se você já realizou o PIX ou
              concluiu o pagamento no cartão para
              <strong> {pendingGift.name}</strong>,
              confirme abaixo.
            </p>

            <p className="giftConfirmationHint">
              Essa confirmação serve para
              atualizar a disponibilidade
              da nossa lista.
            </p>

            <button
              type="button"
              className="fullButton"
              disabled={confirming}
              onClick={handleConfirmGift}
            >
              {confirming
                ? 'Confirmando...'
                : '💗 Sim, já presenteei!'}
            </button>

            <button
              type="button"
              className="secondaryButton giftCancelButton"
              disabled={confirming}
              onClick={() => {
                setPendingGift(null);
                setFeedback('');
              }}
            >
              Ainda não
            </button>

          </div>
        </div>
      )}

      {feedback && (
        <div className="notice giftFeedback">
          <span>{feedback}</span>

          <button
            type="button"
            className="giftFeedbackClose"
            onClick={() =>
              setFeedback('')
            }
            aria-label="Fechar mensagem"
          >
            ×
          </button>
        </div>
      )}
    </section>
  );
}