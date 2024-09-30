
Fancybox.bind('[data-fancybox="gallery-a"]', {
  // Opciones personalizadas
  infinite: true,
  transitionEffect: "slide",
      
  toolbar:false,
  hiddeScrollbar:true,

  mobile: {
      preventCaptionOverlap: false,
      toolbar: true,
      buttons: ["zoom", "slideShow", "close"]
  },
  buttons: [],

// Desactiva la galería de miniaturas
thumbs: {
  autoStart: false, // Evita que se muestren las miniaturas
},
});

console.log('hola');
