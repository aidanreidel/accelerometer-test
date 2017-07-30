if (window.DeviceMotionEvent) {
  window.addEventListener("devicemotion", motion, false)
} else {
  console.log("DeviceMotionEvent is not supported")
}

const accel_x = document.getElementById('accel-x')
const accel_y = document.getElementById('accel-y')
const accel_z = document.getElementById('accel-z')

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

  accel_x.innerHTML = `x-axis: ${formatData(event.acceleration.x)} m/s<sup>2</sup>`
  accel_y.innerHTML = `y-axis: ${formatData(event.acceleration.y)} m/s<sup>2</sup>`
  accel_z.innerHTML = `z-axis: ${formatData(event.acceleration.z)} m/s<sup>2</sup>`
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
