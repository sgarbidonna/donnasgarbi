// filter.js — Selector de categorías para portfolio
// Funciona en desktop (section-b) y mobile (section-b-mobile)

document.addEventListener('DOMContentLoaded', () => {
    let activeFilter = 'todos';

    // ---- Categorización de obras ----
    // Cada obra del grid tiene un atributo data-category.
    // Para agregar o cambiar categorías, solo hay que:
    //   1. Cambiar el data-category en el HTML
    //   2. Agregar/quitar un botón en la .filter-bar

    function applyFilter(category) {
        activeFilter = category;

        // Sincronizar estado de botones en AMBAS barras (desktop + mobile)
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.filter === category);
        });

        // --- Desktop (section-b) ---
        document.querySelectorAll('.section-b .grid-item').forEach(img => {
            const parentLink = img.closest('a');
            if (!parentLink) return;
            const itemCategory = parentLink.dataset.category || '';
            if (category === 'todos' || itemCategory === category) {
                parentLink.classList.remove('filtered-out');
            } else {
                parentLink.classList.add('filtered-out');
            }
        });

        // --- Mobile (section-b-mobile) ---
        document.querySelectorAll('.section-b-mobile .grid-item-mobile').forEach(img => {
            const itemCategory = img.dataset.category || '';
            const overlayText = img.nextElementSibling;

            if (category === 'todos' || itemCategory === category) {
                img.classList.remove('filtered-out');
                if (overlayText && overlayText.classList.contains('overlay-text')) {
                    overlayText.classList.remove('filtered-out');
                }
            } else {
                img.classList.add('filtered-out');
                if (overlayText && overlayText.classList.contains('overlay-text')) {
                    overlayText.classList.add('filtered-out');
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