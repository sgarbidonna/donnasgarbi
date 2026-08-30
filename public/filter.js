// filter.js — Selector de categorías para portfolio
// Soporta múltiples categorías por obra (separadas por espacio en data-category)
// Filtros toggle: se activan/desactivan con click, pueden estar varios activos a la vez.
// Una obra se muestra si coincide con ALGÚN filtro activo (OR).
// Si no hay filtros activos, la sección queda en blanco (no se muestra ninguna obra).
// Con animación fade entre transiciones de filtro.

document.addEventListener('DOMContentLoaded', () => {
    // Set con los filtros actualmente activos. Vacío = sección en blanco.
    const activeFilters = new Set();
    const FADE_DURATION = 320; // ms

    // ---- Categorización de obras ----
    // Cada obra del grid tiene un atributo data-category que puede contener
    // una o varias categorías separadas por espacio.
    // Ejemplo: data-category="video render" → aparece si está activo video o render.

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

    // OR: la obra se muestra si tiene al menos una categoría activa.
    // Si no hay ningún filtro activo, NO se muestra ninguna obra (sección en blanco).
    function matchesAnyFilter(categories) {
        if (activeFilters.size === 0) return false;
        return categories.some(c => activeFilters.has(c));
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

    // --- Sincroniza el estado visual de TODOS los botones (desktop + mobile) ---
    // Los botones con la misma data-filter comparten estado activo/inactivo.
    function syncButtons() {
        document.querySelectorAll('.filter-btn, .filter-btn-mobile').forEach(btn => {
            const f = btn.dataset.filter;
            if (!f || f === 'todos') return; // "todas" fue eliminado, pero por seguridad
            btn.classList.toggle('active', activeFilters.has(f));
        });
    }

    // --- Lógica principal de filtrado ---
    function applyFilter() {
        syncButtons();

        // --- Desktop (section-b) ---
        desktopItems().forEach(img => {
            const parentLink = getDesktopParent(img);
            if (!parentLink) return;
            const categories = getCategories(parentLink);
            const shouldShow = matchesAnyFilter(categories);

            if (shouldShow) {
                fadeIn(parentLink);
            } else {
                fadeOut(parentLink, () => {
                    parentLink.style.display = 'none';
                });
            }
        });

        // --- Mobile (section-b-mobile) ---
        // En mobile hay tanto .grid-item como .grid-item-mobile; cubrimos ambos.
        const allMobileImgs = document.querySelectorAll(
            '.section-b-mobile .grid-item, .section-b-mobile .grid-item-mobile'
        );
        allMobileImgs.forEach(img => {
            // Para .grid-item dentro de <a>, el data-category está en el <a> padre
            // Para .grid-item-mobile, el data-category está en el propio img
            let categoryEl = img;
            const parentLink = img.closest('a');
            if (parentLink && parentLink.dataset.category) {
                categoryEl = parentLink;
            }
            const categories = getCategories(categoryEl);
            const overlayText = getMobileOverlay(img);
            const shouldShow = matchesAnyFilter(categories);

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

    // --- Toggle de un filtro: lo activa si está inactivo, lo desactiva si está activo ---
    function toggleFilter(category) {
        if (activeFilters.has(category)) {
            activeFilters.delete(category);
        } else {
            activeFilters.add(category);
        }
        applyFilter();
    }

    // --- Cerrar el menú móvil después de un click en un filtro mobile ---
    // (preserva el comportamiento previo del script inline)
    function closeMobileMenu() {
        const sectionA = document.getElementById('section-a');
        if (sectionA) {
            sectionA.style.transform = 'translateX(-100%)';
            sectionA.style.pointerEvents = 'none';
        }
        const toggleBtn = document.getElementById('toggle-menu');
        if (toggleBtn) {
            toggleBtn.style.opacity = '1';
            toggleBtn.style.pointerEvents = 'auto';
        }
    }

    // Listeners en todos los botones de filtro (desktop + mobile)
    document.querySelectorAll('.filter-btn, .filter-btn-mobile').forEach(btn => {
        btn.addEventListener('click', () => {
            const category = btn.dataset.filter;
            if (!category || category === 'todos') return; // ignorar "todas" si quedara
            toggleFilter(category);

            // Cerrar el menú móvil después de seleccionar un filtro (sólo mobile)
            if (btn.classList.contains('filter-btn-mobile')) {
                closeMobileMenu();
            }
        });
    });

    // // --- Init: estado inicial = sin filtros = sección en blanco ---
    // // Oculta todo inmediatamente (sin animación) para evitar un flash de obras
    // // visibles al cargar la página. Cuando el usuario active un filtro, las
    // // obras correspondientes se mostrarán con fadeIn.
    // function initEmptyState() {
    //     // Desktop
    //     desktopItems().forEach(img => {
    //         const parentLink = getDesktopParent(img);
    //         if (!parentLink) return;
    //         parentLink.style.display = 'none';
    //         parentLink.style.opacity = '0';
    //         parentLink.style.transition = `opacity ${FADE_DURATION}ms ease`;
    //     });

    //     // Mobile: cubre .grid-item y .grid-item-mobile
    //     const allMobileImgs = document.querySelectorAll(
    //         '.section-b-mobile .grid-item, .section-b-mobile .grid-item-mobile'
    //     );
    //     allMobileImgs.forEach(img => {
    //         const overlayText = getMobileOverlay(img);
    //         img.style.display = 'none';
    //         img.style.opacity = '0';
    //         img.style.transition = `opacity ${FADE_DURATION}ms ease`;
    //         if (overlayText && overlayText.classList.contains('overlay-text')) {
    //             overlayText.style.display = 'none';
    //             overlayText.style.opacity = '0';
    //             overlayText.style.transition = `opacity ${FADE_DURATION}ms ease`;
    //         }
    //     });
    // }

    // initEmptyState();
});
