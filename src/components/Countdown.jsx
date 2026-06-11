import { useEffect, useState } from 'react';

const weddingDate = new Date('2027-02-13T19:00:00-03:00');

function getTimeLeft() {
  const diff = weddingDate.getTime() - new Date().getTime();
  if (diff <= 0) return { dias: 0, horas: 0, minutos: 0 };
  return {
    dias: Math.floor(diff / (1000 * 60 * 60 * 24)),
    horas: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutos: Math.floor((diff / (1000 * 60)) % 60)
  };
}

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(getTimeLeft()), 60000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="countdown" aria-label="Contagem regressiva">
      <div><strong>{timeLeft.dias}</strong><span>dias</span></div>
      <div><strong>{timeLeft.horas}</strong><span>horas</span></div>
      <div><strong>{timeLeft.minutos}</strong><span>min</span></div>
    </div>
  );
}
