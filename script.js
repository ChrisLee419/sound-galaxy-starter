let fft

let Particle = function(position) {
  this.position = position 
  this.speed = createVector(0,1)
  this.color = [random(0,255),0,0,255]

  this.draw = function() {
    circle(this.position.x, this.position.y, this.diameter)
    fill(this.color)
  }

  this.update = function(energy) {
    this.diameter = random(20,30) + energy * 10
    this.position.y += this.speed.y * energy * 10
    if (this.position.y > height) {
      this.position.y = 0
    }
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight)
  noStroke()

  let mic = new p5.AudioIn()
  mic.start()

  fft = new p5.FFT()
  fft.setInput(mic)

  positionParticles()
}

function draw() {
  background(255,255,255)
  let spectrum = fft.analyze()
  updateParticles(spectrum)
}