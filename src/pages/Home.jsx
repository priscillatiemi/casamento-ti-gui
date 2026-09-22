import Countdown from '../components/Countdown.jsx';
import RSVP from '../components/RSVP.jsx';
import Gifts from '../components/Gifts.jsx';
import PhotoCarousel from '../components/PhotoCarousel.jsx';

export default function Home() {
  return (
    <main>
      <section id="inicio" className="hero">
        <div className="heroContent">
          <p className="eyebrow">Save the date</p>

          <h1>Priscilla & Guilherme</h1>

          <p className="date">
            13 de fevereiro de 2027 • 18h30
          </p>

          <Countdown />

          <div className="heroButtons">
            <a
              className="primaryLink"
              href="#rsvp"
            >
              Confirmar presença
            </a>

            <a
              className="primaryLink"
              href="#presentes"
            >
              Lista de presentes
            </a>
          </div>
        </div>
      </section>

      <section
        className="section storySection"
        id="historia"
      >
        <p className="eyebrow dark">
          Nossa história
        </p>

        <h2>
          Estamos preparando um dia especial
        </h2>

        <p className="storyText">
          Nossa história começou em 2019, quando nos conhecemos
          em um evento na comunidade japonesa. Desde então,
          compartilhamos momentos incríveis, viagens
          inesquecíveis e construímos uma vida juntos. Agora,
          estamos ansiosos para celebrar nosso amor com todos
          vocês no dia do nosso casamento.
        </p>

        <PhotoCarousel />
      </section>

      <RSVP />

      <Gifts />

      <section
        className="section local"
        id="local"
      >
        <p className="eyebrow dark">
          Informações
        </p>

        <h2>
          Detalhes do grande dia
        </h2>

        <p className="sectionIntro">
          Para que todos possam se programar com tranquilidade,
          reunimos aqui as principais informações do nosso
          casamento.
        </p>

        <div className="infoGrid">
          <article className="infoCard">
            <span className="infoIcon">
              ⛪
            </span>

            <p>
              Cerimônia
            </p>

            <h3>
              18h30
            </h3>

            <small>
              <strong>
                Capela Pietra
              </strong>
              <br />

              <strong>
                Villagio Europeo - Rua da Mooca, 1415
              </strong>
              <br />

              Pedimos que cheguem com alguns minutinhos
              de antecedência.
            </small>
          </article>

          <article className="infoCard">
            <span className="infoIcon">
              🎉
            </span>

            <p>
              Festa
            </p>

            <h3>
              Mansão Luca
            </h3>

            <small>
              Cerimônia e Festa serão realizados no mesmo local
              <br />

              <strong>
                Villagio Europeo - Rua da Mooca, 1415
              </strong>
            </small>
          </article>

          <article className="infoCard">
            <span className="infoIcon">
              🚗
            </span>

            <p>
              Estacionamento
            </p>

            <h3>
              R$ 40,00
            </h3>

            <small>
              Valor informado pelo espaço.
            </small>
          </article>

          <article className="infoCard">
            <span className="infoIcon">
              👗
            </span>

            <p>
              Traje
            </p>

            <h3>
              Social Completo
            </h3>

            <small>
              Escolha algo elegante e confortável para
              celebrar conosco.
            </small>
          </article>
        </div>

        <a
          className="secondaryLink mapButton"
          href="https://www.google.com/maps/search/?api=1&query=Villagio+Europeu+Mooca"
          target="_blank"
          rel="noreferrer"
        >
          Abrir localização no Google Maps
        </a>
      </section>

      <footer className="footer">
        <p>
          Com carinho, Priscilla & Guilherme
        </p>
      </footer>
    </main>
  );
}