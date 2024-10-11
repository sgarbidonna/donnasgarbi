const gridItems = document.querySelectorAll('.grid-item');
const gridItems_mobile = document.querySelectorAll('.grid-item-mobile');
const previewImage = document.getElementById('preview-image');
const artTitle = document.getElementById('art-title');
const artSize = document.getElementById('art-size');
const artYear = document.getElementById('art-year');
const artTechnique = document.getElementById('art-technique');

const updatePreview = (item) => {
    previewImage.style.opacity = '1';    
    const newSrc = item.getAttribute('src');
    // console.log(newSrc);
    previewImage.setAttribute('src', newSrc);
    // previewImage.style.backgroundImage = newSrc;
    // console.log(previewImage);
    artTitle.textContent = item.getAttribute('data-title');
    artSize.textContent =  " - " + item.getAttribute('data-size');
    artYear.textContent = item.getAttribute('data-year');
    artTechnique.textContent = item.getAttribute('data-technique');
    
    if (window.innerWidth < 1024) {
        setPreviewLinkByTitle();
        
    } else{
        const parentLink = item.closest('a'); 
        if (parentLink) {
            previewImage.setAttribute('onclick', `window.location.href='${parentLink}'`);
        }
    }

};

const resetPreview = () => {
    // previewImage.style.opacity = '0'; 
    previewImage.setAttribute('src', '');
    artTitle.textContent = '';
    artSize.textContent = '';    
    artYear.textContent = '';
    artTechnique.textContent = '';
};

// Función que agrega un enlace al previewImage basado en el artTitle
const setPreviewLinkByTitle = () => {
    let hrefLink = ''; 
    switch (artTitle.textContent) {
        case 'Sin título - SERIE PINTURAS ROJAS':
            hrefLink = './rojas.html'; 
            break;
        case 'Vital Dulce Suerte':
            hrefLink = './vital-dulce-suerte.html'; 
            break;
        case 'Vital Dulce Suerte':
            hrefLink = './vital-dulce-suerte.html'; 
            break;
        case 'Juntas':
            hrefLink = './juntas.html'; 
            break;
        case 'Síncopa':
            hrefLink = './ritmo.html'; 
            break;
        case 'Cantante':
            hrefLink = './ritmo.html'; 
            break;
        case 'Bossanova':
            hrefLink = './ritmo.html'; 
            break;
        case 'Caminamos':
            hrefLink = './carbonillas.html'; 
            break;
        case 'Desafía':
            hrefLink = './carbonillas.html'; 
            break;
        case 'Acento':
            hrefLink = './acento.html'; 
            break;
        case 'Bis':
            hrefLink = './bis.html'; 
            break;
        case 'Sacudir la oscuridad trajo polvo de estrellas':
            hrefLink = './estrellas.html'; 
            break;
        case 'Tren':
            hrefLink = './tren.html'; 
            break;
        case 'Sin título':
            hrefLink = './pinturas-digitales.html'; 
            break;
        case 'Sombra':
            hrefLink = './instalaciones.html'; 
            break;
        case 'Sostén el vacío':
            hrefLink = './instalaciones.html'; 
            break;
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
    if (window.innerWidth >= 1025) {
        item.addEventListener('mouseover', () => {
            updatePreview(item);    
        });
    } 
});
gridItems_mobile.forEach(item => {
    if (window.innerWidth <= 1024) {
        item.addEventListener('touchstart', () => {
            updatePreview(item);    
        });
    } 
});


document.addEventListener('mouseover', (event) => {
    const isGridItem = event.target.closest('.grid-item'); 
    if (!isGridItem) {
        resetPreview();
    }
});

// document.addEventListener('touchstart', (event) => {
//     const isGridItemMob = event.target.closest('.grid-item-mobile');
//     const isPreviewImage = event.target === previewImage; 
//     if (!isGridItemMob && !isPreviewImage) { 
//         resetPreview();
//     }
// });

