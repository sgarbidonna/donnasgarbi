/* ============================================================
   image-visualization-mobile.js
   ------------------------------------------------------------
   Comportamiento mobile de la sección-b-mobile:

   1. Arrows ← → : se mantienen como señaletica y quedan
      funcionales para deslizar el grid horizontalmente.
   2. Grid  : se desliza hacia izquierda y derecha (scroll
      horizontal nativo + botones de flecha).
   3. Click sobre una miniatura : visualiza la imagen y su
      información en la section-c-index (preview-image,
      art-title, art-year, art-size, art-technique).
      Un click sobre la imagen preview navega a la página
      de la obra correspondiente.
   ============================================================ */

(function () {
    'use strict';

    /* Solo se activa en mobile (mismo breakpoint que el CSS). */
    const isMobile = () => window.innerWidth <= 1025;

    const sectionBMobile = document.querySelector('.section-b-mobile');
    if (!sectionBMobile) return;

    const grid = sectionBMobile.querySelector('.grid');
    const arrowsContainer = sectionBMobile.querySelector('.arrows-mobile');
    const previewImage = document.getElementById('preview-image');
    const artTitle    = document.getElementById('art-title');
    const artSize     = document.getElementById('art-size');
    const artYear     = document.getElementById('art-year');
    const artTechnique = document.getElementById('art-technique');

    if (!grid || !previewImage) return;

    /* ----------------------------------------------------------
       1. ARROWS ← →  : deslizar el grid horizontalmente
       ---------------------------------------------------------- */
    if (arrowsContainer) {
        const arrowDivs = arrowsContainer.querySelectorAll('div');
        arrowDivs.forEach((div) => {
            div.style.cursor = 'pointer';
            div.style.userSelect = 'none';

            div.addEventListener('click', () => {
                if (!isMobile()) return;
                /* Paso = 80% del ancho visible del grid */
                const step = Math.round(grid.clientWidth * 0.8);
                const text = div.textContent || '';
                if (text.indexOf('←') !== -1) {
                    grid.scrollBy({ left: -step, behavior: 'smooth' });
                } else if (text.indexOf('→') !== -1) {
                    grid.scrollBy({ left: step, behavior: 'smooth' });
                }
            });
        });
    }

    /* ----------------------------------------------------------
       2. Mapeo título → página de la obra
       (fallback para miniaturas que no están dentro de un <a>)
       ---------------------------------------------------------- */
    const getLinkByTitle = (title) => {
        const map = {
            'Entre la multitud': './entre-la-multitud.html',
            'Pasillo secreto': './pasillo-secreto.html',
            'Desde esta firmeza': './testigos.html',
            'Rearme y austeridad': './rearme-y-austeridad.html',
            'Quedaron atrás las horas del mal trago': './testigos.html',
            'Llave maestra': './testigos.html',
            'Detrás, ajeno en el humo': './testigos.html',
            'La sombra del paso en la retirada': './testigos.html',
            'En camino': './plastico-piel.html',
            'Plástico piel': './plastico-piel.html',
            'Escenas del desamor': './escenas-del-desamor.html',
            'Emboscada: El menor punto, la menor linea, la menor mancha': './emboscada.html',
            'Sin título - SERIE PINTURAS ROJAS': './rojas.html',
            'Vital y Dulce': './vital-dulce-suerte.html',
            'Suerte': './vital-dulce-suerte.html',
            'Juntas': './juntas.html',
            'Síncopa': './ritmo.html',
            'Cantante': './ritmo.html',
            'Bossanova': './ritmo.html',
            'Caminamos': './carbonillas.html',
            'Desafía': './carbonillas.html',
            'Acento': './acento.html',
            'Bis': './bis.html',
            'Sacudir la oscuridad trajo polvo de estrellas': './estrellas.html',
            'Tren': './tren.html',
            'Sin título': './pinturas-digitales.html',
            'Sombra': './instalaciones.html',
            'Sostén el vacío': './instalaciones.html'
        };
        return map[title] || '';
    };

    /* ----------------------------------------------------------
       3. Marcar miniatura activa
       ---------------------------------------------------------- */
    const setActiveItem = (item) => {
        const allImgs = grid.querySelectorAll('img');
        allImgs.forEach((img) => img.classList.remove('active'));
        item.classList.add('active');
    };

    /* ----------------------------------------------------------
       4. Actualizar el preview en section-c-index
       ---------------------------------------------------------- */
    const updatePreview = (item) => {
        const newSrc      = item.getAttribute('src') || '';
        const title       = item.getAttribute('data-title') || '';
        const size        = item.getAttribute('data-size') || '';
        const year        = item.getAttribute('data-year') || '';
        const technique   = item.getAttribute('data-technique') || '';

        /* Fade out → actualizar contenido → fade in cuando carga */
        previewImage.style.opacity = '0';

        /* Texto */
        artTitle.textContent     = title;
        artYear.textContent      = year;
        artSize.textContent      = size ? '' + size : '';
        artTechnique.textContent = technique;

        /* Link de navegación: prioridad al <a> padre, fallback al mapa */
        const parentLink = item.closest('a');
        let hrefLink = parentLink ? parentLink.getAttribute('href') : '';
        if (!hrefLink) {
            hrefLink = getLinkByTitle(title);
        }
        if (hrefLink) {
            previewImage.setAttribute('data-href', hrefLink);
            previewImage.style.cursor = 'pointer';
        } else {
            previewImage.removeAttribute('data-href');
            previewImage.style.cursor = 'default';
        }

        /* Cargar imagen y mostrar (maneja el caso en que el src no cambia) */
        if (previewImage.getAttribute('src') === newSrc) {
            previewImage.style.opacity = '1';
        } else {
            previewImage.onload = () => { previewImage.style.opacity = '1'; };
            previewImage.onerror = () => { previewImage.style.opacity = '1'; };
            previewImage.setAttribute('src', newSrc);
        }
        previewImage.setAttribute('alt', title);
    };

    /* ----------------------------------------------------------
       5. Click sobre una miniatura (event delegation)
       Soporta filtrado dinámico (filter.js oculta/muestra items)
       ---------------------------------------------------------- */
    grid.addEventListener('click', (e) => {
        if (!isMobile()) return;
        const item = e.target.closest('img');
        if (!item) return;

        /* Evitar que el <a> padre navegue al hacer click en mobile */
        e.preventDefault();
        e.stopPropagation();

        updatePreview(item);
        setActiveItem(item);

        /* Centrar suavemente la miniatura clickeada en el grid */
        const itemRect = item.getBoundingClientRect();
        const gridRect = grid.getBoundingClientRect();
        const offset = (itemRect.left - gridRect.left)
                     - (gridRect.width / 2)
                     + (itemRect.width / 2);
        grid.scrollBy({ left: offset, behavior: 'smooth' });
    });

    /* ----------------------------------------------------------
       6. Click sobre la imagen preview → navegar a la obra
       ---------------------------------------------------------- */
    previewImage.addEventListener('click', (e) => {
        if (!isMobile()) return;
        const href = previewImage.getAttribute('data-href');
        if (href) {
            window.location.href = href;
        }
    });

    /* ----------------------------------------------------------
       7. Neutralizar el resetPreview() del script desktop
       images-visualization.js escucha mouseover/touchstart a nivel
       document y, si el target no está dentro de .grid-item, llama a
       resetPreview() que vacía el src y los textos. En mobile esto
       "rompe" la imagen al tocarla. Detenemos la propagación de esos
       eventos cuando se originan dentro de section-c-index, para que
       nunca lleguen al listener de document.

       IMPORTANTE: también hay que proteger los controles del menú
       mobile (#toggle-menu, #close-menu-btn) y el panel del menú
       completo (#section-a), porque están FUERA de .section-c-index.
       Si no lo hacemos, al tocar el botón ☰ el touchstart burbujea
       hasta document y resetPreview() vacía la preview cargada,
       mostrando el icono de imagen rota + el alt text.
       ---------------------------------------------------------- */
    const stop = (e) => {
        if (isMobile()) e.stopPropagation();
    };
    const protectedEvents = [
        'mouseover', 'mouseout', 'mousemove', 'mouseenter', 'mouseleave',
        'touchstart', 'touchmove', 'touchend',
        'mousedown', 'mouseup', 'click'
    ];

    const attachStopPropagation = (el) => {
        if (!el) return;
        protectedEvents.forEach((evt) => {
            el.addEventListener(evt, stop, { passive: true });
        });
    };

    /* 7.a. section-c-index (preview + textos) */
    attachStopPropagation(document.querySelector('.section-c-index'));

    /* 7.b. Botón hamburguesa ☰, botón cerrar × y panel del menú */
    attachStopPropagation(document.getElementById('toggle-menu'));
    attachStopPropagation(document.getElementById('close-menu-btn'));
    attachStopPropagation(document.getElementById('section-a'));

    console.log('image-visualization-mobile.js cargado');
})();
