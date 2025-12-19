let surface = { length: 0, width: 0 };
let obstacles = [];

function saveSurface() {
  surface.length = Number(surfaceLength.value);
  surface.width = Number(surfaceWidth.value);
  initScene(surface, obstacles);
}

function addObstacle() {
  const obs = {
    name: obsName.value,
    x: Number(obsX.value),
    y: Number(obsY.value),
    l: Number(obsL.value),
    w: Number(obsW.value),
    h: Number(obsH.value)
  };
  obstacles.push(obs);
  updateList();
  initScene(surface, obstacles);
}

function updateList() {
  obstacleList.innerHTML = "";
  obstacles.forEach(o => {
    obstacleList.innerHTML += `<li>${o.name} | (${o.x},${o.y})</li>`;
  });
}

function calculate() {
  let best = null;
  let bestScore = -999;

  for (let x = 0.5; x < surface.length; x += 0.5) {
    for (let y = 0.5; y < surface.width; y += 0.5) {

      let score = 100;

      // قرب من المركز
      const dx = Math.abs(x - surface.length/2);
      const dy = Math.abs(y - surface.width/2);
      score -= (dx + dy) * 5;

      // البعد عن العوائق
      obstacles.forEach(o => {
        const d = Math.hypot(x - o.x, y - o.y);
        if (d < 1.5) score -= 50;
      });

      // زاوية الرؤية (45° جنوب)
      score -= Math.abs(45 - 45);

      if (score > bestScore) {
        bestScore = score;
        best = { x, y, score };
      }
    }
  }

  resultText.innerHTML =
    `X: ${best.x.toFixed(2)} م | Y: ${best.y.toFixed(2)} م<br>
     التقييم: ${best.score > 80 ? "ممتاز" : "جيد"} (${best.score.toFixed(0)}/100)`;

  highlightPoint(best.x, best.y);
}
