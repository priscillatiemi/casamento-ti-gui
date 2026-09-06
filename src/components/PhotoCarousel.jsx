import { useEffect, useRef, useState } from 'react';

const photos = [
  '/pre-wedding/foto1.webp',
  '/pre-wedding/foto2.webp',
  '/pre-wedding/foto3.webp',
  '/pre-wedding/foto4.webp',
  '/pre-wedding/foto5.webp',
  '/pre-wedding/foto6.webp',
  '/pre-wedding/foto7.webp',
  '/pre-wedding/foto8.webp',
  '/pre-wedding/foto9.webp',
  '/pre-wedding/foto10.webp'
];

export default function PhotoCarousel() {
  const [current, setCurrent] = useState(0);
  const touchStartX = useRef(null);

  function previousPhoto() {
    setCurrent((current - 1 + photos.length) % photos.length);
  }

  function nextPhoto() {
    setCurrent((current + 1) % photos.length);
  }

  function handleTouchStart(event) {
    touchStartX.current = event.touches[0].clientX;
  }

  function handleTouchEnd(event) {
    if (touchStartX.current === null) return;

    const touchEndX = event.changedTouches[0].clientX;
    const distance = touchStartX.current - touchEndX;

    if (distance > 50) {
      nextPhoto();
    }

    if (distance < -50) {
      previousPhoto();
    }

    touchStartX.current = null;
  }

  // Troca automaticamente a cada 5 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((current) => (current + 1) % photos.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="photoCarousel">
      <div
        className="carouselImageWrapper"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <img
          src={photos[current]}
          alt={`Priscilla e Guilherme - foto ${current + 1}`}
          className="carouselImage"
        />

        <button
          type="button"
          className="carouselArrow carouselArrowLeft"
          onClick={previousPhoto}
          aria-label="Foto anterior"
        >
          ‹
        </button>

        <button
          type="button"
          className="carouselArrow carouselArrowRight"
          onClick={nextPhoto}
          aria-label="Próxima foto"
        >
          ›
        </button>
      </div>

      <div className="carouselDots">
        {photos.map((_, index) => (
          <button
            type="button"
            key={index}
            className={`carouselDot ${
              index === current ? 'active' : ''
            }`}
            onClick={() => setCurrent(index)}
            aria-label={`Ir para foto ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}