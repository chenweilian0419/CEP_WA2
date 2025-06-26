let balls = [];
// Length of the trail
let trailLength = 35;
// Cooldown of interacting to prevent adding or deleting too fast due to rapid clicks
let cooldown = 0;
// Gravity constant to control the strength of gravity
let gravity = 1;
// A slider to control the value of gravity
let gravStrength;
// A variable to keep track of, like, what its name suggests
let showVelocity = 1;
// Position of pivot for translating
let pivot;
// A slider to control the size of the field (Or actually changing the size and position of the balls)
let zoom;

function setup() {
  createCanvas(600, 600);

  // Initialising the Sliders and Buttons
  zoom = createSlider(0.3, 1.5, 1, 0.05);
  zoom.position(120, 10);
  zoom.size(80);
  gravStrength = createSlider(0.5, 5, 1, 0.1);
  gravStrength.position(370, 10);
  gravStrength.size(100);
  velocityButton = createButton('no arrow(v)');
  velocityButton.position(490, 10);
  velocityButton.mousePressed(toggleVelocity);
  
  textSize(19);
  textAlign(LEFT, TOP);
  
  // Initialise the pivot for translating around
  pivot = createVector(0, 0);
}

function draw() {
  // Changing gravity to the current strength value
  gravity = gravStrength.value();
  background(35);
  resetMatrix()
  // Putting description texts
  fill("white")
  text("zoom(scroll): ", 10, 10);
  text("gravity strength: ", 230, 10);

  // Translating and scaling
  handleTranslation();
  // Translate to the centre to zoom and draw zoom pivot cross in the centre
  translate(width/2, height/2);
  scale(zoom.value());
  // Draws the zoom pivot for reference
  stroke(250, 100, 0, 200)
  strokeWeight(3)
  line(0, -10, 0, 10);
  line(-10, 0, 10, 0);
  strokeWeight(0);
  // Actually translate to the centre we want
  translate(pivot.x, pivot.y);
  // Update the position of balls
  balls.forEach((p) => {
    p.update();
    //p.checkEdges();
  });
  // Applies gravitational force
  for (let i = 0; i < balls.length; i++) {
    balls.forEach((p) => {
      // Of course we dont calculate gravitational force between one object and itself
      if(p != balls[i]) {
        let force = p.calculateAttraction(balls[i]);
        balls[i].applyForce(force);
      }
    });
  }
  for (let i = 0; i < balls.length; i++) {
    for (let j = i + 1; j < balls.length; j++) {
      // Determine distance between the balls and check if they collide
      if (p5.Vector.dist(balls[i].position, balls[j].position) < (balls[i].r + balls[j].r)) {
        // The balls collide and hence adjust one's mass and delete the other
        balls[i].collide(balls[j]);
        balls.splice(j, 1);
      }
    }
  }
  balls.forEach((p) => {
    p.display();
  });

  // Decrease cooldown value
  cooldown--;
}

function mouseClicked() {
  if (cooldown <= 0) {
    // Finding the actual mouseX after removing effect of translating and scaling.
    let mX = (mouseX - width/2) / zoom.value() - pivot.x,
        mY = (mouseY - height/2) / zoom.value() - pivot.y;
    for (let i = 0; i < balls.length; i++) {
      // Determine whether the mouse is inside the ball
      if (p5.Vector.dist(balls[i].position, createVector(mX, mY)) < balls[i].r) {
        // Delete the ball
        balls.splice(i, 1);
        return;
      }
    }
    // Add a new ball if no ball is deleted
    balls.push(new Attractor(mX, mY, random(30, 80)));
    cooldown = 20;
  }
}

function handleTranslation() {
  let step = 5 / zoom.value(); // Scale movement so it's consistent at different zooms
  // The directions are opposite because you are moving background
  if (keyIsDown(LEFT_ARROW) || keyIsDown(65))  pivot.x += step;
  if (keyIsDown(RIGHT_ARROW) || keyIsDown(68)) pivot.x -= step;
  if (keyIsDown(UP_ARROW) || keyIsDown(87))    pivot.y += step;
  if (keyIsDown(DOWN_ARROW) || keyIsDown(83))  pivot.y -= step;
}

// Shortcut using key 'v'
function keyPressed() {
  if (key == 'v') {
    toggleVelocity();
  }
}


// Toggles showVelocity
function toggleVelocity() {
  showVelocity ^= 1;
  velocityButton.html(showVelocity == 0 ? 'show arrow(v)' : 'no arrow(v)');
}

function mouseWheel(event) {
  // Allows mouse wheel to control the zoom slider
  let delta = -event.delta / 2000;
  let current = zoom.value();
  // Constraining the value of zoom
  zoom.value(constrain(current + delta, zoom.elt.min, zoom.elt.max));
  return false;
}
