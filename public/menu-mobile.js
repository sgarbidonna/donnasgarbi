console.log('entro a menu');
function toggleMenu() {
    const sectionA = document.getElementById('section-a');

    sectionA.classList.toggle('show');
    
}

function closeMenu() {
    const sectionA = document.getElementById('section-a');
    sectionA.classList.toggle('show');

}


if (window.matchMedia("(max-width: 1025px)").matches) {
    document.getElementById('toggle-menu').addEventListener('click', toggleMenu);
    document.getElementById('close-menu-btn').addEventListener('click', closeMenu);;
        
}


document.addEventListener('DOMContentLoaded', function () {
    if (window.innerWidth <= 1025) {
        const mobileMenuBtn = document.getElementById('toggle-menu');
        const closeMenuBtn = document.getElementById('close-menu-btn');
        const menu = document.getElementById('section-a');

        if (mobileMenuBtn && closeMenuBtn && menu) {
            mobileMenuBtn.addEventListener('click', function () {
                menu.classList.toggle('active');
            });

            // Cerrar menú
            closeMenuBtn.addEventListener('click', function () {
                menu.classList.remove('active');

            });
        }
    }
});



// También puedes agregar un event listener para el cambio de tamaño de la ventana
window.addEventListener('resize', function() {
    if (window.matchMedia("(max-width: 1025px)").matches) {
        if (!document.getElementById('toggle-menu').hasAttribute('listener-added')) {
            document.getElementById('toggle-menu').addEventListener('click', toggleMenu);
            document.getElementById('toggle-menu').setAttribute('listener-added', true); 
        }
    } else {
        document.getElementById('toggle-menu').removeEventListener('click', toggleMenu);
        document.getElementById('toggle-menu').removeAttribute('listener-added');
    }
});
