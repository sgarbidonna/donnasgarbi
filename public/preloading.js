const loadingScreen2 = document.getElementById('loading-screen');
const container = document.getElementById('container');


document.addEventListener("DOMContentLoaded", () => {
    const gridItems = document.querySelectorAll('.grid-item');
    const loadingScreen = document.getElementById('loading-screen2');

    let imagesLoaded = 0;
    const totalImages = gridItems.length;

    if (gridItems.length== 0){
        setTimeout(() => {
            loadingScreen2.style.opacity = 0; 
            setTimeout(() => {
                loadingScreen2.style.display = 'none'; // Remueve la pantalla del DOM
            }, 300); // Espera el tiempo de la transición de opacidad
        }, 300);
    }
    

    const checkAllImagesLoaded = () => {
        if (imagesLoaded === totalImages) {
            loadingScreen.style.display = 'none'; 
            document.body.classList.remove('loading'); 
            setTimeout(() => {
                loadingScreen2.style.opacity = 0; 
                
                // Oculta la pantalla blanca
                setTimeout(() => {
                    loadingScreen2.style.display = 'none'; // Remueve la pantalla del DOM
                    
                }, 300); // Espera el tiempo de la transición de opacidad
            }, 300);
        }
    };

    // Desactiva la interacción con la página mientras se cargan las imágenes
    document.body.classList.add('loading');
    
    
    gridItems.forEach(item => {
        const img = new Image();
        img.src = item.getAttribute('src');
        img.onload = () => {
            imagesLoaded++; 
            checkAllImagesLoaded(); 
        };
        img.onerror = () => {
            imagesLoaded++; 
            checkAllImagesLoaded();
        };
    });

});
