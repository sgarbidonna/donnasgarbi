
Fancybox.bind('[data-fancybox="gallery"]', {
  // Opciones personalizadas
  infinite: true,
  transitionEffect: "slide",
      
  toolbar:false,
  hiddeScrollbar:true,

  mobile: {
      preventCaptionOverlap: false,
      toolbar: false,
      buttons: ["zoom", "slideShow", "close"]
  },
  buttons: [],

thumbs: {
  autoStart: false, 
},
});
