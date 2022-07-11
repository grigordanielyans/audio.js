window.AudioContext = window.AudioContext || window.webkitAudioContext;
const audioContext = new AudioContext();

const drawAudio = (url) => {
  fetch(url)
    .then((response) => response.arrayBuffer())
    .then((arrayBuffer) => audioContext.decodeAudioData(arrayBuffer))
    .then((audioBuffer) => draw(normalizeData(filterData(audioBuffer))));
};

const filterData = (audioBuffer) => {
  const rawData = audioBuffer.getChannelData(0);
  const samples = 1024;
  const blockSize = Math.floor(rawData.length / samples);
  const filteredData = [];
  for (let i = 0; i < samples; i++) {
    let blockStart = blockSize * i;
    let sum = 0;
    for (let j = 0; j < blockSize; j++) {
      sum = sum + Math.abs(rawData[blockStart + j]);
    }
    filteredData.push(sum / blockSize);
  }
  return filteredData;
};

const normalizeData = (filteredData) => {
  const multiplier = Math.pow(Math.max(...filteredData), -1);
  return filteredData.map((n) => n * multiplier);
};

const draw = (normalizedData) => {
  const canvas = document.querySelector("canvas");
  const dpr = window.devicePixelRatio || 1;
  const padding = 20;
  const offsetHeight = (parseInt(canvas.offsetHeight) < 125) ? 125 : parseInt(canvas.offsetHeight);
  canvas.width = canvas.offsetWidth * dpr;
  canvas.height = ((offsetHeight + padding * 2) * dpr) / 2;
  const ctx = canvas.getContext("2d");
  ctx.scale(dpr, dpr);
  ctx.translate(0, offsetHeight / 2 + padding);

  const width = canvas.offsetWidth / normalizedData.length;
  for (let i = 0; i < normalizedData.length; i++) {
    const x = width * i;
    let height = normalizedData[i] * offsetHeight - padding;
    if (height < 0) {
      height = 0;
    } else if (height > offsetHeight / 2) {
      height = height > offsetHeight / 2;
    }
    drawLineSegment(ctx, x, height, width);
  }
};

const drawLineSegment = (ctx, x, height, width) => {
  ctx.lineWidth = 1;
  ctx.strokeStyle = "#fff";
  ctx.beginPath();
  ctx.moveTo(x, 0);
  ctx.lineTo(x, -height);
  ctx.arc(x + width / 2, -height, width / 2, Math.PI, 0, -height);
  ctx.lineTo(x + width, 0);
  ctx.stroke();
};
