

const gridItems = document.querySelectorAll('.grid-item');

const previewImage = document.getElementById('preview-image');
const artTitle = document.getElementById('art-title');
const artYear = document.getElementById('art-year');
const artTechnique = document.getElementById('art-technique');

const popup = document.getElementById('popup-gallery');
const popupImage = document.getElementById('popup-image');
const closePopup = document.querySelector('.close');


gridItems.forEach(item => {
    item.addEventListener('mouseover', () => {
        const newSrc = item.getAttribute('src');
        previewImage.setAttribute('src', newSrc);
        artTitle.textContent = item.getAttribute('data-title');
        artYear.textContent = item.getAttribute('data-year');
        artTechnique.textContent = item.getAttribute('data-technique');
        console.log('cambio, soy el elemento', item.getAttribute('data-title'));
    });
});

// Abrir el popup cuando se hace clic en una imagen
gridItems.forEach(item => {
    item.addEventListener('click', () => {
        popupImage.src = item.src;
        popup.style.display = 'flex';
    });
});

// Cerrar el popup cuando se hace clic en la 'X'
closePopup.addEventListener('click', () => {
    popup.style.display = 'none';
});
