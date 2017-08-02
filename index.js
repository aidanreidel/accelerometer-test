if (window.DeviceMotionEvent) {
  window.addEventListener("devicemotion", motion, false)
} else {
  console.log("DeviceMotionEvent is not supported")
}

const accel_x = document.getElementById('accel-x')
const accel_y = document.getElementById('accel-y')
const accel_z = document.getElementById('accel-z')
// Force'
const mass = window.prompt("Enter Mass (kg)", 1)
const force_x = document.getElementById('force-x')
const force_y = document.getElementById('force-y')
const force_z = document.getElementById('force-z')
// Maximum force
const max_x = document.getElementById('max-x')
const max_y = document.getElementById('max-y')
const max_z = document.getElementById('max-z')
const averageAccelXEl = document.getElementById(`average-accel-x`)
// const averageAccelYEl = document.getElementById(`average-accel-y`)
// const averageAccelZEl = document.getElementById(`average-accel-z`)
const averageVelXEl = document.getElementById(`average-vel-x`)
// const averageVelYEl = document.getElementById(`average-vel-y`)
// const averageVelZEl = document.getElementById(`average-vel-z`)
const timer = document.getElementById(`time`)
const eventCountEl = document.getElementById(`event-count`)

let xMax = 0
let yMax = 0
let zMax = 0
let fSum = 0

let averageAccelX = 0
let totalAccelX = 0
let averageVelX = 0
// let averageAccelY = 0
// let totalAccelY = 0
// let averageVelY = 0
// let averageAccelZ = 0
// let totalAccelZ = 0
// let averageVelZ = 0
let startTime = null

let eventCount = 0

const leftPad = (s, c, n) =>{ s = s.toString(); c = c.toString(); return s.length > n ? s : c.repeat(n - s.length) + s; }

const keep = keepEveryN(4) // every nth motion event will render to UI

function motion(event) {
  eventCount++
  eventCountEl.innerHTML = eventCount
  if (!event.acceleration.x) {
    accel_x.innerHTML = 'Failed to obtain accelerometer data'
    accel_y.innerHTML = ''
    accel_z.innerHTML = ''
    return
  }

  if (keep()) {
    return;
  }
  // Just accel data
  accel_x.innerHTML = `x-axis: ${formatData(event.acceleration.x, 2)} m/s<sup>2</sup>`
  accel_y.innerHTML = `y-axis: ${formatData(event.acceleration.y, 2)} m/s<sup>2</sup>`
  accel_z.innerHTML = `z-axis: ${formatData(event.acceleration.z, 2)} m/s<sup>2</sup>`

  // force data
  force_x.innerHTML = `x-axis: ${formatData(mass*event.acceleration.x, 2)} N`
  force_y.innerHTML = `x-axis: ${formatData(mass*event.acceleration.y, 2)} N`
  force_z.innerHTML = `y-axis: ${formatData(mass*event.acceleration.z, 2)} N`

  // maximum force check
  if(event.acceleration.x > xMax){
    xMax = event.acceleration.x
  }
  if(event.acceleration.y > yMax){
    yMax = event.acceleration.y
  }
  if(event.acceleration.z > zMax){
    zMax = event.acceleration.z
  }


  // maximum force output
  max_x.innerHTML = `x-axis: ${formatData(xMax, 2)} N`
  max_y.innerHTML = `y-axis: ${formatData(yMax, 2)} N`
  max_z.innerHTML = `z-axis: ${formatData(zMax, 2)} N`

  // average accel and vel
  if (!startTime) {
    startTime = new Date()
  }
  const time = new Date()
  const timeElapsed = time - startTime
  timer.innerHTML = timeElapsed

// X
  totalAccelX += Number(event.acceleration.x.toFixed(2))
  averageAccelX = Number((totalAccelX / eventCount).toFixed(2))
  averageAccelXEl.innerHTML = `x-axis: ${formatData(averageAccelX, 2)} m/s<sup>2</sup>`

  // this is probably final velocity, not average.
  averageVelX = Number((averageAccelX * (timeElapsed / 1000)).toFixed(2))
  averageVelXEl.innerHTML = `x-axis: ${formatData(averageVelX, 2)} m/s`

/*
// Y
  totalAccelY += event.acceleration.y
  averageAccelY = totalAccelY / eventCount
  averageAccelYEl.innerHTML = `y-axis: ${formatData(averageAccelY, 4)} m/s<sup>2</sup>`

  // this is probably final velocity, not average.
  averageVelY = averageAccelY * (timeElapsed / 1000)
  averageVelYEl.innerHTML = `y-axis: ${formatData(averageVelY, 4)} m/s`

// Z
  totalAccelZ += event.acceleration.z
  averageAccelZ = totalAccelZ / eventCount
  averageAccelZEl.innerHTML = `z-axis: ${formatData(averageAccelZ, 4)} m/s<sup>2</sup>`

  // this is probably final velocity, not average.
  averageVelZ = averageAccelZ * (timeElapsed / 1000)
  averageVelZEl.innerHTML = `z-axis: ${formatData(averageVelZ, 4)} m/s`

  */
}

function formatData(data, precision) {
  if (data !== null || data !== undefined) {
    return leftPad(data.toFixed(precision), ' ', 8)
  } else {
    return null
  }
}

// used to slow down the text rendering on motion event
function keepEveryN(n) {
  let i = n
  return () => i++ % n !== 0
}

// trying to use git/hub
