/* Get Our Elements */
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');
let clicked = false;
// Functions

const togglePlay = () => {
    if(video.paused){
        video.play()
    } else {
        video.pause()
    }
}

function toggleIcon(){
    const icon = this.paused ? '►' : '❚ ❚';
    // console.log(icon);
    toggle.textContent = icon;
}

function skip () {
    console.log(this.dataset.skip)
    video.currentTime += parseInt(this.dataset.skip, 10)
}

function handleRanges () {
    if(clicked){
        console.log(this.name, this.value)
        video[this.name] = this.value
    }
}


function updateProgress () {
    const percent = (video.currentTime / video.duration) * 100
    // console.log(percent)
    progressBar.style.flexBasis = `${percent}%`
}

function scrub(e){
    console.log(e)
    const num = (e.offsetX / progress.offsetWidth) * video.duration
    video.currentTime = num
}
//Event Listeners

toggle.addEventListener('click', togglePlay)

video.addEventListener('click', togglePlay)
video.addEventListener('play', toggleIcon)
video.addEventListener('pause', toggleIcon)
video.addEventListener('timeupdate', updateProgress)

skipButtons.forEach(button => button.addEventListener('click', skip))

//change sliders while dragging instead of when you let go
ranges.forEach(range => {
    range.addEventListener('change', handleRanges)
    range.addEventListener('mousedown', () => clicked = true)
    range.addEventListener('mouseup', () => clicked = false )
    range.addEventListener('mousemove', handleRanges)
})

progress.addEventListener('click', scrub)
progress.addEventListener('mouseup', () => clicked = false)
progress.addEventListener('mousedown', () => clicked = true)
progress.addEventListener('mousemove', (e) => clicked && scrub(e))


const fullscreen = document.querySelector('.fullscreen')

fullscreen.addEventListener('click', () => {
  video.requestFullscreen()
.then(() => {
  console.log('now in fullscreen')
}).catch(error => {
  console.error(error)
})
})