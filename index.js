if (window.DeviceMotionEvent) {
  window.addEventListener("devicemotion", motion, false)
} else {
  console.log("DeviceMotionEvent is not supported")
}

const accel_x = document.getElementById('accel-x')
const accel_y = document.getElementById('accel-y')
const accel_z = document.getElementById('accel-z')

function motion(event) {
  accel_x.innerHTML = `x-axis: ${event.acceleration.x}`
  accel_y.innerHTML = `y-axis: ${event.acceleration.y}`
  accel_z.innerHTML = `z-axis: ${event.acceleration.z}`

  if (!accel_x.innerHTML) {
    accel_x.innerHTML = "No accelerometer data"
  }
}
