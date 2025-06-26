class Attractor {
  constructor(x, y, m) {
    // Initiating
    this.position = createVector(x, y);
    // We take the area of a ball as its mass
    // Although area = pi * r^2, we just ignore pi here for simplicity
    this.mass = m;
    this.r = sqrt(m);
    // Random initial velocity
    this.velocity = createVector(random(-1, 1), random(-1, 1));
    this.acceleration = createVector(0, 0);
    this.col = color(random(100, 250), random(100, 250), random(100, 250));
    // A list to store previous positions of the ball which makes up the trail
    this.trail = [];
  }

  calculateAttraction(object) {
    let force = p5.Vector.sub(this.position, object.position);
    let distance = force.mag();
    // Limiting the distance to eliminate "extreme" results
    // for very close or very far objects
    distance = constrain(distance, 10, 500);
    force.normalize();
    // Calculate gravitional force magnitude
    let strength = (gravity * this.mass * object.mass) / (distance * distance);
    // Get force vector --> magnitude * direction
    force.mult(strength);
    return force;
  }
  
  applyForce(force) {
    // a = F / m
    let f = p5.Vector.div(force, this.mass);
    this.acceleration.add(f);
  }
  
  update() {
    // Add current position to trail
    this.trail.push(this.position.copy());
    if (this.trail.length>trailLength){
      strokeWeight(0.5);
      this.trail.shift();
    }
    // Simulates motion
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
  }
  
  display() {
    strokeWeight(0);
    // Trail is drawn before the actual object to prevent trail from covering the object itself.
    for (let i = 0; i < this.trail.length; i++) {
      // Trail will increasing transparency and size
      this.col.setAlpha(i)
      fill(this.col);
      circle(this.trail[i].x, this.trail[i].y, this.r * 2 / (trailLength+10) * (i+10));
    }
    // Drawing the ball
    strokeWeight(2);
    stroke(0);
    this.col.setAlpha(255);
    fill(this.col);
    circle(this.position.x, this.position.y, this.r * 2);
    // Drawing velocity arrows
    if(showVelocity) {
      this.drawArrow(this.velocity.copy(), 'red');
    }
  }
  
  drawArrow(vec, col) {
    // Store the current status to not affect other places
    push();
    stroke(col)
    fill(col)
    // Constraining magnitude to prevent extreme values like an arrow with length 400
    // Weird manupilation but its for better visual effects.
    vec.setMag(vec.mag() + 0.1);
    vec.mult(this.r)
    vec.setMag(constrain(vec.mag(), 10, 120))
    strokeWeight(2);
    translate(this.position);
    line(0, 0, vec.x, vec.y);

    let arrowSize = this.r / 4;
    // Maths out the arrowhead
    let angle = atan2(vec.y, vec.x);
    translate(vec.x, vec.y);
    rotate(angle);
    triangle(0, 0, -arrowSize, arrowSize / 2, -arrowSize, -arrowSize / 2);
    pop();
    // Reset status
  }
  
  collide(object) {
    // Merging velocity based on mass
    let xVel = (this.mass*this.velocity.x + object.mass*object.velocity.x) / (this.mass+object.mass);
    let yVel = (this.mass*this.velocity.y + object.mass*object.velocity.y) / (this.mass+object.mass);
    this.velocity.x = xVel;
    this.velocity.y = yVel;
    
    // Readjusting mass and radius
    this.mass += object.mass;
    this.r = sqrt(this.mass);
  }
  
  // Check if the ball is bouncing at the edge(previous idea that is unused)
  checkEdges() {
    if (this.position.x + this.r > width) {
      this.velocity.x *= -1;
      this.position.x = width - this.r;
    } else if (this.position.x - this.r < 0) {
      this.velocity.x *= -1;
      this.position.x = this.r;
    }
    if (this.position.y + this.r > height) {
      this.velocity.y *= -1;
      this.position.y = height - this.r;
    } else if(this.position.y - this.r < 0) {
      this.velocity.y *= -1;
      this.position.y = this.r;
    }
  }
}
