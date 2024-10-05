const canvas = document.getElementById('drawing-board');
const toolbar = document.getElementById('toolbar');
const ctx = canvas.getContext('2d');

const canvasOffsetX = canvas.offsetLeft;
const canvasOffsetY = canvas.offsetTop;

canvas.width = window.innerWidth - canvasOffsetX;
canvas.height = window.innerHeight - canvasOffsetY;
// canvas.width = window.innerWidth;
// canvas.height = window.innerHeight;

let isPainting = false;
let lineWidth = 0.1;
let startX;
let startY;

// Función para agregar fondo blanco y guardar la imagen
const saveDrawingWithWhiteBackground = () => {
    // Crear un canvas temporal
    const tempCanvas = document.createElement('canvas');
    const tempCtx = tempCanvas.getContext('2d');

    // Establecer dimensiones
    tempCanvas.width = canvas.width;
    tempCanvas.height = canvas.height;

    // Rellenar el fondo de blanco
    tempCtx.fillStyle = 'white';
    tempCtx.fillRect(0, 0, tempCanvas.width, tempCanvas.height);

    // Dibujar el contenido del canvas original sobre el fondo blanco
    tempCtx.drawImage(canvas, 0, 0);

    // Descargar la imagen
    const link = document.createElement('a');
    link.download = 'dibujo_con_fondo_blanco.png';  // Nombre del archivo descargado
    link.href = tempCanvas.toDataURL('image/png');
    link.click();
};


toolbar.addEventListener('click', e => {
    if (e.target.id === 'clear') {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
    if (e.target.id === 'save') {
        saveDrawingWithWhiteBackground();
    }
});

// toolbar.addEventListener('change', e => {
//     if(e.target.id === 'stroke') {
//         ctx.strokeStyle = e.target.value;
//     }

//     if(e.target.id === 'lineWidth') {
//         lineWidth = e.target.value;
//     }
    
// });

const draw = (e) => {
    if(!isPainting) {
        return;
    }

    ctx.lineWidth = lineWidth;
    ctx.lineCap = 'round';

    ctx.lineTo(e.clientX - canvasOffsetX, e.clientY);
    ctx.stroke();
}

canvas.addEventListener('mousedown', (e) => {
    isPainting = true;
    startX = e.clientX;
    startY = e.clientY;
});

canvas.addEventListener('mouseup', e => {
    isPainting = false;
    ctx.stroke();
    ctx.beginPath();
});

canvas.addEventListener('mousemove', draw);
