const loadingScreen = document.getElementById('loading-screen');
const container = document.getElementById('container');

    // Agregar la clase 'show' después de un pequeño retraso
    setTimeout(() => {
        loadingScreen.style.opacity = 0; // Oculta la pantalla blanca
        setTimeout(() => {
            loadingScreen.style.display = 'none'; // Remueve la pantalla del DOM
            
        }, 1000); // Espera el tiempo de la transición de opacidad
    }, 100); // Pequeño retraso para permitir que el navegador aplique los estilos iniciales
