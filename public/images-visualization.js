const gridItems = document.querySelectorAll('.grid-item');
const previewImage = document.getElementById('preview-image');
const artTitle = document.getElementById('art-title');
const artSize = document.getElementById('art-size');
const artYear = document.getElementById('art-year');
const artTechnique = document.getElementById('art-technique');

const updatePreview = (item) => {
    const newSrc = item.getAttribute('src');
    previewImage.setAttribute('src', newSrc);
    artTitle.textContent = item.getAttribute('data-title');
    artSize.textContent = item.getAttribute('data-size');
    artYear.textContent = item.getAttribute('data-year');
    artTechnique.textContent = item.getAttribute('data-technique');
    
    if (window.innerWidth < 768) {
        setPreviewLinkByTitle();
    } else{
        const parentLink = item.closest('a'); 
        if (parentLink) {
            previewImage.setAttribute('onclick', `window.location.href='${parentLink}'`);
        }
    }
};

const resetPreview = () => {
    previewImage.setAttribute('src', '');
    artTitle.textContent = '';
    artYear.textContent = '';
    artTechnique.textContent = '';
};
// Función que agrega un enlace al previewImage basado en el artTitle
const setPreviewLinkByTitle = () => {
    let hrefLink = ''; 

    switch (artTitle.textContent) {
        case 'Obra 1':
            hrefLink = './01-obra1.html'; 
            break;
        case 'Obra 2':
            hrefLink = './02-obra2.html'; 
            break;
        // Añadir más casos según sea necesario
        default:
            hrefLink = ''; 
    }
    if (hrefLink) {
        previewImage.setAttribute('onclick', `window.location.href='${hrefLink}'`);
    } else {
        previewImage.removeAttribute('onclick'); 
    }
};

gridItems.forEach(item => {
    if (window.innerWidth >= 768) {
        item.addEventListener('mouseover', () => {
            
            updatePreview(item);    
        });
    } else  {
        item.addEventListener('touchstart', () => {
            updatePreview(item);
        });
    } 
});


document.addEventListener('click', (event) => {
    const isGridItem = event.target.closest('.grid-item'); 
    if (!isGridItem) {
        resetPreview();
    }
});

document.addEventListener('touchstart', (event) => {
    const isGridItem = event.target.closest('.grid-item');
    const isPreviewImage = event.target === previewImage; 
    if (!isGridItem && !isPreviewImage) { 
        resetPreview();
    }
});





// const popup = document.getElementById('popup-gallery');
// const popupImage = document.getElementById('popup-image');
// const closePopup = document.querySelector('.close');


// // Abrir el popup cuando se hace clic en una imagen
// gridItems.forEach(item => {
//     item.addEventListener('click', () => {
//         popupImage.src = item.src;
//         popup.style.display = 'flex';
//     });
// });

// // Cerrar el popup cuando se hace clic en la 'X'
// closePopup.addEventListener('click', () => {
//     popup.style.display = 'none';
// });
