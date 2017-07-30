if (window.DeviceMotionEvent) {
  window.addEventListener("devicemotion", motion, false)
} else {
  console.log("DeviceMotionEvent is not supported")
}

// just accel
const accel_x = document.getElementById('accel-x')
const accel_y = document.getElementById('accel-y')
const accel_z = document.getElementById('accel-z')
// 'Force'
const force_x = document.getElementById('force-x')
const force_y = document.getElementById('force-y')
const force_z = document.getElementById('force-z')
const mass = window.prompt("Enter Mass (kg)", 1)

const leftPad = (s, c, n) =>{ s = s.toString(); c = c.toString(); return s.length > n ? s : c.repeat(n - s.length) + s; }

function motion(event) {
  if (!event.acceleration.x) {


    accel_x.innerHTML = 'Failed to obtain accelerometer data'
    accel_y.innerHTML = ''
    accel_z.innerHTML = ''
    return
  }

  if (tooFast(Date.now())) {
    return;
  }
  // Just accel data
  accel_x.innerHTML = `x-axis: ${formatData(event.acceleration.x)} m/s<sup>2</sup>`
  accel_y.innerHTML = `y-axis: ${formatData(event.acceleration.y)} m/s<sup>2</sup>`
  accel_z.innerHTML = `z-axis: ${formatData(event.acceleration.z)} m/s<sup>2</sup>`

  // force data
  force_x.innerHTML = `x-axis: ${formatData((mass*event.acceleration.x))} N`
  force_y.innerHTML = `x-axis: ${formatData((mass*event.acceleration.y))} N`
  force_z.innerHTML = `y-axis: ${formatData((mass*event.acceleration.z))} N`

}

function formatData(data) {
  if (data) {
    return leftPad(data.toFixed(2), ' ', 8)
  } else {
    return null
  }
}

// used to slow down the text rendering on motion event
function tooFast(date) {
  console.log(date)
  return date % 2 !== 0
}

// trying to use git/hub
