
  document.addEventListener('DOMContentLoaded', function () {
    const images = document.querySelectorAll('.grid-item-mobile');

    images.forEach((img) => {
      img.addEventListener('click', function () {
        // Solo activar en mobile
        if (window.innerWidth <= 767) {
          // Remover estado anterior
          images.forEach(i => {
            i.classList.remove('active');
            i.style.opacity = '1';
          });

          // Activar nuevo
          img.classList.add('active');
          img.style.opacity = '0.5';
        }
      });
    });
  });