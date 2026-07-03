// preloading.js — Versión corregida y optimizada
// Problemas originales que corrige:
// 1. No crea imágenes duplicadas (el browser ya carga los <img> del HTML)
// 2. Escucha los eventos de carga de las imágenes existentes
// 3. Solo espera las primeras N visibles, no todas
// 4. Timeout máximo de seguridad
// 5. Funciona en index.html y en páginas de proyecto

document.addEventListener("DOMContentLoaded", () => {
    const screen2 = document.getElementById('loading-screen2');
    const screen1 = document.getElementById('loading-screen');

    // Detectar tipo de página
    const isProjectPage = !!document.querySelector('.section-obras');

    // Configuración según contexto
    const PRELOAD_COUNT = isProjectPage ? 2 : 6;
    const MIN_DISPLAY = isProjectPage ? 300 : 500;
    const MAX_WAIT = isProjectPage ? 2500 : 3000;

    let shown = false;
    const t0 = Date.now();

    function showPage() {
        if (shown) return;
        shown = true;

        // Respetar tiempo mínimo de pantalla de carga
        const wait = Math.max(0, MIN_DISPLAY - (Date.now() - t0));
        setTimeout(() => {
            if (screen1) {
                screen1.style.opacity = '0';
                setTimeout(() => { screen1.style.display = 'none'; }, 300);
            }
            document.body.classList.remove('loading');
            if (screen2) {
                screen2.style.opacity = '0';
                setTimeout(() => { screen2.style.display = 'none'; }, 300);
            }
        }, wait);
    }

    // --- Obtener imágenes existentes (NO crear duplicadas) ---
    // En index: thumbnails del grid. En proyecto: imágenes de la obra.
    const allImages = document.querySelectorAll('.grid-item, .grid-item-mobile');
    const totalToWait = Math.min(PRELOAD_COUNT, allImages.length);

    // Si no hay imágenes, mostrar directo
    if (totalToWait === 0) {
        showPage();
        return;
    }

    document.body.classList.add('loading');

    let ready = 0;

    function onReady() {
        ready++;
        if (ready >= totalToWait) {
            showPage();
        }
    }

    // Escuchar las imágenes que YA están en el DOM (sin duplicar descargas)
    for (let i = 0; i < totalToWait; i++) {
        const img = allImages[i];
        const src = img.getAttribute('src');
        if (!src) { onReady(); continue; }

        // Ya cargada (cache del browser)
        if (img.complete && img.naturalWidth > 0) {
            onReady();
            continue;
        }

        // Esperar a que termine de cargar
        const handler = () => {
            img.removeEventListener('load', handler);
            img.removeEventListener('error', handler);
            onReady();
        };
        img.addEventListener('load', handler);
        img.addEventListener('error', handler);
    }

    // Lazy loading en las que no esperamos
    for (let i = totalToWait; i < allImages.length; i++) {
        allImages[i].setAttribute('loading', 'lazy');
    }

    // Timeout máximo: mostrar de todas formas
    setTimeout(() => showPage(), MAX_WAIT);
});