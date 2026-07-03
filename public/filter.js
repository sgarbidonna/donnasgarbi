// filter.js — Selector de categorías para portfolio
// Soporta múltiples categorías por obra (separadas por espacio en data-category)
// Con animación fade entre transiciones de filtro

document.addEventListener('DOMContentLoaded', () => {
    let activeFilter = 'todos';
    const FADE_DURATION = 320; // ms

    // ---- Categorización de obras ----
    // Cada obra del grid tiene un atributo data-category que puede contener
    // una o varias categorías separadas por espacio.
    // Ejemplo: data-category="video render" → aparece en ambos filtros.

    // --- Desktop (section-b) ---
    const desktopItems = () => document.querySelectorAll('.section-b .grid-item');
    const getDesktopParent = (img) => img.closest('a');

    // --- Mobile (section-b-mobile) ---
    const mobileItems = () => document.querySelectorAll('.section-b-mobile .grid-item-mobile');
    const getMobileOverlay = (img) => img.nextElementSibling;

    // --- Utilidades ---
    function getCategories(el) {
        const raw = (el.dataset.category || '').trim().toLowerCase();
        return raw ? raw.split(/\s+/) : [];
    }

    function matchesFilter(categories, filter) {
        if (filter === 'todos') return true;
        return categories.includes(filter);
    }

    // --- Fade out: opacity 0 → luego display none ---
    function fadeOut(el, callback) {
        el.style.opacity = '0';
        el.style.transition = `opacity ${FADE_DURATION}ms ease`;
        const onEnd = () => {
            el.removeEventListener('transitionend', onEnd);
            clearTimeout(fallback);
            callback();
        };
        const fallback = setTimeout(onEnd, FADE_DURATION + 50);
        el.addEventListener('transitionend', onEnd);
    }

    // --- Fade in: display visible → reflow → opacity 1 ---
    function fadeIn(el) {
        el.style.opacity = '0';
        el.style.display = '';
        // Forzar reflow para que el navegador registre el estado inicial
        void el.offsetHeight;
        el.style.transition = `opacity ${FADE_DURATION}ms ease`;
        el.style.opacity = '1';
    }

    // --- Lógica principal de filtrado ---
    function applyFilter(category) {
        activeFilter = category;

        // Sincronizar estado de botones en AMBAS barras (desktop + mobile)
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.filter === category);
        });

        // --- Desktop (section-b) ---
        desktopItems().forEach(img => {
            const parentLink = getDesktopParent(img);
            if (!parentLink) return;
            const categories = getCategories(parentLink);
            const shouldShow = matchesFilter(categories, category);

            if (shouldShow) {
                fadeIn(parentLink);
            } else {
                fadeOut(parentLink, () => {
                    parentLink.style.display = 'none';
                });
            }
        });

        // --- Mobile (section-b-mobile) ---
        mobileItems().forEach(img => {
            const categories = getCategories(img);
            const overlayText = getMobileOverlay(img);
            const shouldShow = matchesFilter(categories, category);

            if (shouldShow) {
                fadeIn(img);
                if (overlayText && overlayText.classList.contains('overlay-text')) {
                    fadeIn(overlayText);
                }
            } else {
                fadeOut(img, () => {
                    img.style.display = 'none';
                });
                if (overlayText && overlayText.classList.contains('overlay-text')) {
                    fadeOut(overlayText, () => {
                        overlayText.style.display = 'none';
                    });
                }
            }
        });
    }

    // Listeners en todos los botones de filtro
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            applyFilter(btn.dataset.filter);
        });
    });
});