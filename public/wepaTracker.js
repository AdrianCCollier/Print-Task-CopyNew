// sound that will be played if a printer goes down
let selectedSound = 'sounds/sellingChocolate.mp3'
const audio = new Audio(selectedSound);
// notification HTML that is displayed by default as hidden
const notif = document.getElementById('notification')
//button to close notification
const close_notif = document.getElementById('closenotif')
// There's a web policy known as 'autoplay policy' that prevents modern browsers from autoplaying sounds when a user opens a webpage, for this reason we're going to need to create a button that the user can press to enable sound on the webpage, by default we're setting it to false
let soundEnabled = false

function showEnableSoundPopup() {
  const enableSoundPopup = document.getElementById('enable-sound-popup')
  enableSoundPopup.style.display = 'block'

  document.getElementById('enable-sound-yes').addEventListener('click', () => {
    soundEnabled = true
    enableSoundPopup.style.display = 'none'
  })
  document.getElementById('enable-sound-no').addEventListener('click', () => {
    soundEnabled = false
    enableSoundPopup.style.display = 'none'
  })
}

// Call showEnableSoundPopup initially on page load
showEnableSoundPopup()

// When a printer goes down, the below setInterval function will automatically play a sound every 10 seconds, we are using intervalNo in our stopAudio() to clear that interval and to stop the audio from playing. This is a very basic version if acknowledging the notification for now.
let intervalNo = null

close_notif.onclick = function () {
  notif.classList.add('hide')
}

// call the stopAudio() function when a user clicks on the click to handle button.
document.querySelector('#closenotif').addEventListener('click', stopAudio)


// Allow user to change sound
      document.getElementById('sound-select').addEventListener('change', (event) => {
        selectedSound = event.target.value;
        audio.src = selectedSound;
      });

      // Allow user to test their sound
      document.getElementById('sound-test').addEventListener('click', () => {
        audio.play();
      });

      // Allow the user to change the volume in real time
      document.getElementById('volume-slider').addEventListener('input', (event) => {
        audio.volume = parseFloat(event.target.value);
      });

// This function is responsible for fetching the printer status data our server's /api/wepa-status endpoint, and updating the CSS classes for our status button to change it to its correct color, while playing a sound if a printer is down.
async function getWepaStatus() {
  try {
    // send an HTTP request to the below endpoint to get the printer data
    // const response = await fetch('https://print-task.vercel.app/api/wepa-status');
    const response = await fetch('/api/wepa-status')

    // parse the JSON response
    const data = await response.json()

    // instead of checking if any red or yellow status are > 0
    // this user defined variable allows the user to determine the threshold for an acceptable amount of allowed errors, sometimes a printer is low on toner and we don't want to change the toner yet, so this is to ignore that printer until then
    const allowedPrinterDownCount = parseInt(
      document.querySelector('#allowed-printer-down-input').value
    )

    // Check if there are any red or yellow alerts, log the printer count to the console
    if (
      data.printerCount.red > allowedPrinterDownCount ||
      data.printerCount.yellow > allowedPrinterDownCount
    ) {
      // if there are yellow alerts, change the button color to yellow
      if (data.printerCount.yellow > allowedPrinterDownCount) {
        document.querySelector('#status-button').classList.remove('green')
        document.querySelector('#status-button').classList.add('yellow')
      } else {
        // if there are red alerts, change the button color to red
        document.querySelector('#status-button').classList.remove('green')
        document.querySelector('#status-button').classList.add('red')
      }

      // if sound is enabled, play the audio alert.
      if (data.printerCount && soundEnabled) {
        const volume = parseFloat(
          document.querySelector('#volume-slider').value
        )
        audio.volume = volume
        audio.play()
        console.log('Printer count: ', data.printerCount)
        notif.classList.remove('hide')
      }
    } else {
      // otherwise, if there are no alerts, update the button to green and log a message
      console.log('All printers working correctly, all good in the hood')
      document.querySelector('#status-button').classList.remove('red')
      document.querySelector('#status-button').classList.remove('yellow')
      document.querySelector('#status-button').classList.add('green')
    }
  } catch (error) {
    // if there's an error while fetching the data, log it to the console
    console.error('Error while retrieving data', error)
  }
}

// This function is responsible for allowing the user to stop the audio sound from repeating if a printer is down.
function stopAudio() {
  audio.pause()
  audio.currentTime = 0
  clearInterval(intervalNo)
}

// Call getWepaStatus initially on page load
getWepaStatus()

// Check status every 10 seconds afterwards
intervalNo = setInterval(getWepaStatus, 5000)


