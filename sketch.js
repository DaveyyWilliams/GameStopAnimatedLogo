let img;
let size;
let revealDone = false;
let maskX;
let tintR = 255, tintG = 255, tintB = 255;

function preload() {
  img = loadImage("GamestopFinal.png");
}

function setup() {
  createCanvas(600, 600);
  size = 900; // start zoomed in
  maskX = width; // mask starts fully covering the image
}

function draw() {
  // --- BACKGROUND: soft off-white ---
  background(245, 245, 240);

  // --- CINEMATIC ZOOM OUT (ease-out curve) ---
  if (!revealDone) {
    // easing: slows as it approaches final size
    size = lerp(size, 300, 0.06);

    // when close enough, lock reveal
    if (abs(size - 300) < 1) {
      revealDone = true;
    }
  } else {
    // --- POST-REVEAL COLOR GLOW (subtle, film-like) ---
    tintR = map(sin(frameCount * 0.05), -1, 1, 220, 255);
    tintG = map(sin(frameCount * 0.04), -1, 1, 220, 255);
    tintB = map(sin(frameCount * 0.03), -1, 1, 220, 255);
  }

  // --- DRAW LOGO ---
  push();
  imageMode(CENTER);
  tint(tintR, tintG, tintB);
  image(img, width / 2, height / 2, size, size);
  pop();

  // --- MASK REVEAL (smooth wipe) ---
  if (maskX > 0) {
    maskX = lerp(maskX, -50, 0.08); // smooth cinematic slide
    noStroke();
    fill(245, 245, 240); // same as background
    rect(maskX, 0, width, height);
  }
}
