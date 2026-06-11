import Countdown from '../components/Countdown.jsx';
import RSVP from '../components/RSVP.jsx';
import Gifts from '../components/Gifts.jsx';

export default function Home() {
  return (
    <main>
      <section id="inicio" className="hero">
        <div className="heroContent">
          <p className="eyebrow">Save the date</p>
          <h1>Priscilla & Guilherme</h1>
          <p className="date">13 de fevereiro de 2027 • 19h</p>
          <Countdown />
          <a className="primaryLink" href="#rsvp">Confirmar presença</a>
        </div>
      </section>

      <section className="section" id="historia">
        <p className="eyebrow dark">Nossa história</p>
        <h2>Estamos preparando um dia especial</h2>
        <p>
          Criamos este site para reunir as informações do casamento, confirmação de presença
          e uma lista de presentes simbólicos para a nossa lua de mel.
        </p>
      </section>

      <RSVP />
      <Gifts />

      <section className="section local" id="local">
        <p className="eyebrow dark">Informações</p>
        <h2>Detalhes do grande dia</h2>
        
        <p className="sectionIntro">
          Para que todos possam se programar com tranquilidade, reunimos aqui as principais informações do nosso casamento.
        </p>
        
        <div className="infoGrid">
          <article className="infoCard">
            <span className="infoIcon">⛪</span>
            <p>Cerimônia</p>
            <h3>19h</h3>
            <small>Pedimos que cheguem com alguns minutinhos de antecedência.</small>
          </article>
        
          <article className="infoCard">
            <span className="infoIcon">📍</span>
            <p>Local</p>
            <h3>Villagio Europeu</h3>
            <small>Mooca - São Paulo</small>
          </article>
        
          <article className="infoCard">
            <span className="infoIcon">🚗</span>
            <p>Estacionamento</p>
            <h3>R$ 40,00</h3>
            <small>Valor informado pelo espaço.</small>
          </article>
        
          <article className="infoCard">
            <span className="infoIcon">👗</span>
            <p>Traje</p>
            <h3>Social Esportivo</h3>
            <small>Escolha algo elegante e confortável para celebrar conosco.</small>
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
        <p>Com carinho, Priscilla & Guilherme</p>
      </footer>
    </main>
  );
}
