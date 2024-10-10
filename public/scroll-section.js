const sectionC = document.querySelector('.section-c');
const sectionCIndex = document.querySelector('.section-c-index');
const isMobileOrTabletScroll = window.matchMedia("(max-width: 1025px)").matches;

let lastTouchY = 0; 

const getSectionToScroll = () => {
    if (document.querySelector('.section-b')) {
        return document.querySelector('.section-b');
    } else if (document.querySelector('.section-obras')) {
        return document.querySelector('.section-obras');
    } else if (document.querySelector('.section-e')) {
        return document.querySelector('.section-e');
    } else if (document.querySelector('.section-f')) {
        return document.querySelector('.section-f');
    }
    return null; 
};

const sectionToScroll = getSectionToScroll();
if (sectionToScroll) {
    if (!isMobileOrTabletScroll) {
        if(sectionC){
            sectionC.addEventListener('wheel', (e) => {
                e.preventDefault(); 
                sectionToScroll.scrollTop += e.deltaY; 
            });
        }else{
            sectionCIndex.addEventListener('wheel', (e) => {
                e.preventDefault(); 
                sectionToScroll.scrollTop += e.deltaY; 
            });
        }
        
        
    }

    
} 

document.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'ArrowUp':  
            sectionToScroll.scrollBy(0, -50);  
            break;
        case 'ArrowDown':  
            sectionToScroll.scrollBy(0, 50);  
            break;
    }
});