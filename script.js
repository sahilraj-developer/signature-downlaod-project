const canvas = document.getElementById('drawing-board');
const context = canvas.getContext('2d');
const clearButton = document.getElementById('clear-button');
const downloadButton = document.getElementById('download-button');
const colorPicker = document.getElementById('color-picker');

canvas.width = 800;
canvas.height = 400;

let drawing = false;
let penColor = '#000000';

canvas.addEventListener('mousedown', () => {
  drawing = true;
});

canvas.addEventListener('mouseup', () => {
  drawing = false;
  context.beginPath();
});

canvas.addEventListener('mousemove', draw);

colorPicker.addEventListener('input', (event) => {
  penColor = event.target.value;
});

function draw(event) {
  if (!drawing) return;

  context.lineWidth = 5;
  context.lineCap = 'round';
  context.strokeStyle = penColor;

  context.lineTo(event.clientX - canvas.offsetLeft, event.clientY - canvas.offsetTop);
  context.stroke();
  context.beginPath();
  context.moveTo(event.clientX - canvas.offsetLeft, event.clientY - canvas.offsetTop);
}

clearButton.addEventListener('click', () => {
  context.clearRect(0, 0, canvas.width, canvas.height);
});

downloadButton.addEventListener('click', () => {
  const dataURL = canvas.toDataURL('image/png');
  const link = document.createElement('a');
  link.href = dataURL;
  link.download = 'signature.png';
  link.click();
});
