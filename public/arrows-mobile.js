// // arrows-mobile.js — Flechas para desplazar horizontalmente el grid de section-b-mobile
// // La sección y las flechas quedan fijas; sólo se mueve el contenido del grid.
// // También soporta swipe touch nativo (overflow-x: auto) y scroll por teclado.

// document.addEventListener('DOMContentLoaded', () => {
//     // Sólo activo en mobile
//     const mediaMobile = window.matchMedia('(max-width: 1025px)');

//     function initArrows() {
//         const sectionBMobile = document.querySelector('.section-b-mobile');
//         const arrowsContainer = document.querySelector('.arrows-mobile');
//         if (!sectionBMobile || !arrowsContainer) return;

//         const grid = sectionBMobile.querySelector('.grid');
//         if (!grid) return;

//         const prevBtn = arrowsContainer.querySelector('.arrow-prev');
//         const nextBtn = arrowsContainer.querySelector('.arrow-next');
//         if (!prevBtn || !nextBtn) return;

//         // Cuánto desplazar por click: ~80% del ancho visible del grid
//         function getScrollStep() {
//             return Math.max(grid.clientWidth * 0.8, 200);
//         }

//         // Actualiza el estado disabled de las flechas según la posición del scroll
//         function updateArrowsState() {
//             const maxScrollLeft = grid.scrollWidth - grid.clientWidth;
//             const current = grid.scrollLeft;

//             // Prev: deshabilitado si estamos al inicio
//             prevBtn.toggleAttribute('disabled', current <= 1);

//             // Next: deshabilitado si estamos al final
//             nextBtn.toggleAttribute('disabled', current >= maxScrollLeft - 1);
//         }

//         // Click en flecha anterior → desplazar grid a la derecha (mostrar ítems previos)
//         prevBtn.addEventListener('click', () => {
//             grid.scrollBy({ left: -getScrollStep(), behavior: 'smooth' });
//         });

//         // Click en flecha siguiente → desplazar grid a la izquierda (mostrar ítems siguientes)
//         nextBtn.addEventListener('click', () => {
//             grid.scrollBy({ left: getScrollStep(), behavior: 'smooth' });
//         });

//         // Soporte de teclado: flechas izq/der cuando el grid tiene foco o está en viewport
//         grid.setAttribute('tabindex', '0');
//         grid.addEventListener('keydown', (e) => {
//             if (e.key === 'ArrowLeft') {
//                 e.preventDefault();
//                 grid.scrollBy({ left: -getScrollStep(), behavior: 'smooth' });
//             } else if (e.key === 'ArrowRight') {
//                 e.preventDefault();
//                 grid.scrollBy({ left: getScrollStep(), behavior: 'smooth' });
//             }
//         });

//         // Actualizar estado de las flechas cuando el scroll del grid cambia
//         let scrollRaf = null;
//         grid.addEventListener('scroll', () => {
//             if (scrollRaf) cancelAnimationFrame(scrollRaf);
//             scrollRaf = requestAnimationFrame(updateArrowsState);
//         });

//         // Actualizar estado inicial y al redimensionar
//         updateArrowsState();
//         window.addEventListener('resize', updateArrowsState);

//         // Re-ejecutar cuando filter.js cambia la visibilidad de los items
//         // (observamos cambios de estilo display en los hijos del grid)
//         const observer = new MutationObserver(() => {
//             updateArrowsState();
//         });
//         observer.observe(grid, { subtree: true, attributes: true, attributeFilter: ['style'] });
//     }

//     // Init cuando matchea mobile
//     if (mediaMobile.matches) {
//         initArrows();
//     }

//     // Re-init si el viewport cambia entre desktop/mobile
//     mediaMobile.addEventListener('change', (e) => {
//         if (e.matches) {
//             initArrows();
//         }
//     });
// });
