const gridItems_mobile = document.querySelectorAll('.grid-item-mobile');
const previewImage_mobile = document.getElementById('preview-image');
const artTitle_mobile = document.getElementById('art-title');
const artSize_mobile = document.getElementById('art-size');
const artYear_mobile = document.getElementById('art-year');
const artTechnique_mobile = document.getElementById('art-technique');

const updatePreview = (item) => {
    previewImage_mobile.style.opacity = '1'; // Desvanecer la imagen actual
   
    const newSrc_mobile = item.getAttribute('src');
    previewImage_mobile.setAttribute('src', newSrc);
    artTitle_mobile.textContent = item.getAttribute('data-title');
    artSize_mobile.textContent =  " - " + item.getAttribute('data-size');
    artYear_mobile.textContent = item.getAttribute('data-year');
    artTechnique_mobile.textContent = item.getAttribute('data-technique');
    
    if (window.innerWidth < 1024) {
        console.log('window menor q 1024');
        setPreviewLinkByTitle();
    } else{
        const parentLink_mobile = item.closest('a'); 
        if (parentLink) {
            previewImage_mobile.setAttribute('onclick', `window.location.href='${parentLink}'`);
        }
    }

};

const resetPreview = () => {
    previewImage_mobile.style.opacity = '0'; 
    previewImage_mobile.setAttribute('src', '');
    artTitle_mobile.textContent = '';
    artSize_mobile.textContent = '';    
    artYear_mobile.textContent = '';
    artTechnique_mobile.textContent = '';
};


const setPreviewLinkByTitle = () => {
    let hrefLink = ''; 

    switch (artTitle_mobile.textContent) {
        case 'Sin título - SERIE PINTURAS ROJAS':
            hrefLink = './rojas.html'; 
            break;
        case 'Vital y Dulce':
            hrefLink = './vital-dulce-suerte.html'; 
            break;
        case 'Suerte':
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
        previewImage_mobile.setAttribute('onclick', `window.location.href='${hrefLink}'`);
        
    } else {
        previewImage_mobile.removeAttribute('onclick'); 
    }
};

gridItems_mobile.forEach(item => {
    if (window.innerWidth >= 768) {
        item.addEventListener('mouseover', () => {
            updatePreview(item);    
        });
    } else  {
        item.addEventListener('touchstart', () => {
            updatePreview(item);
            console.log('item add event lstener touchstart');
        });
    } 
});


document.addEventListener('mouseover', (event) => {
    const isGridItem_mobile = event.target.closest('.grid-item'); 
    if (!isGridItem_mobile) {
        resetPreview();
    }
});

document.addEventListener('touchstart', (event) => {
    const isGridItem_mobile = event.target.closest('.grid-item');
    const isPreviewImage_mobile = event.target === previewImage_mobile; 
    if (!isGridItem_mobile && !isPreviewImage_mobile) { 
        resetPreview();
    }
});

console.log('entro a imagevisualizaion mibule');