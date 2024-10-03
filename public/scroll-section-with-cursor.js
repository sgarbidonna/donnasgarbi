const sectionObras = document.querySelector('.section-obras');

document.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'ArrowUp':  // Si se presiona la flecha hacia arriba
            sectionObras.scrollBy(0, -50);  // Desplaza hacia arriba
            break;
        case 'ArrowDown':  // Si se presiona la flecha hacia abajo
            sectionObras.scrollBy(0, 50);  // Desplaza hacia abajo
            break;
    }
});
const sectionB = document.querySelector('.section-b');

document.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'ArrowUp':  // Si se presiona la flecha hacia arriba
            sectionB.scrollBy(0, -50);  // Desplaza hacia arriba
            break;
        case 'ArrowDown':  // Si se presiona la flecha hacia abajo
            sectionB.scrollBy(0, 50);  // Desplaza hacia abajo
            break;
    }
});
const sectionE = document.querySelector('.section-e');

document.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'ArrowUp':  // Si se presiona la flecha hacia arriba
            sectionE.scrollBy(0, -50);  // Desplaza hacia arriba
            break;
        case 'ArrowDown':  // Si se presiona la flecha hacia abajo
            sectionE.scrollBy(0, 50);  // Desplaza hacia abajo
            break;
    }
});
