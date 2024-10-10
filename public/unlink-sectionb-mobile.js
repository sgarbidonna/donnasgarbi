
    function removeHrefInSectionB() {
        const sectionBLinks = document.querySelectorAll('.section-b a');
        sectionBLinks.forEach(link => {
            link.removeAttribute('href');
        });
    }

    
    const isMobileOrTablet = window.matchMedia("(max-width: 768px)").matches;

    if (isMobileOrTablet) {
        removeHrefInSectionB();
    }

