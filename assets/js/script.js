AOS.init()


//music
var tempmusic = ''
music = document.querySelector('.music')
if (tempmusic) {
    music.src = tempMusic
}

//door mulai
function mulai() {
    //back to top
    window.scrollTo(0, 0)

    //sound door
    var soundDoor = document.querySelector('.sound-door')
    soundDoor.play()

    //door section
    var doorSection = $('#door-section')
    var doors = document.querySelectorAll('.door')
    doors.forEach(function (door, index) {
        var direction = (index === 0) ? -1 : 1
        door.style.transform = 'rotateY(' + (70 * direction) + 'deg)'
    })

    //set timeout music
    setTimeout(function () {
        //music play
        music.play()
        doorSection.css('transform', 'scale(6)')
    }, 600)

    //set timeout door section
    setTimeout(function () {
        doorSection.css('opacity', 0)
        $('body').removeClass('overflow-hidden')
        $('body').addClass('transition')
        doorSection.css('display', 'none')
    }, 2000)

}

var isPlaying = true;
var music = new Audio('assets/audio/yungkai-blue.mp3');  // Ganti dengan path file musik Anda

function toggleMusic(event) {
    event.preventDefault();

    const musicButton = document.getElementById('music-button');
    const icon = musicButton.querySelector('i');
    
    if (isPlaying) {
        icon.classList.remove('fa-compact-disc');
        icon.classList.add('fa-pause');
        musicButton.classList.remove('rotate');
        musicButton.style.transform = 'translateY(0)';
        music.pause();
    } else {
        icon.classList.remove('fa-pause');
        icon.classList.add('fa-compact-disc');
        musicButton.classList.add('rotate');
        music.play();
    }

    isPlaying = !isPlaying;
}

//countdown wedding
var countdownDate = new Date("Apr 26, 2025 10:00:00").getTime()

var x = setInterval(function () {
    var now = new Date().getTime()

    var distance = countdownDate - now

    var days = Math.floor(distance / (1000 * 60 * 60 * 24))
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
    var seconds = Math.floor((distance % (1000 * 60)) / 1000)

    document.getElementById('countdown-wedding').innerHTML =
        `<div class="col-lg-1 col-3"><div class="text-center p-2 rounded text-light"><h5>${days}</h5>Hari</div></div>
        <div class="col-lg-1 col-3"><div class="text-center p-2 rounded text-light"><h5>${hours}</h5>Jam</div></div>
        <div class="col-lg-1 col-3"><div class="text-center p-2 rounded text-light"><h5>${minutes}</h5>Menit</div></div>
        <div class="col-lg-1 col-3"><div class="text-center p-2 rounded text-light"><h5>${seconds}</h5>Detik</div></div>`

        if (distance < 0){
            clearInterval(x)
            document.getElementById('countdown-wedding').innerHTML = "<span class='text-cennter p-3 rounded text-light m-2'><h2>Sudah dimulai!</h2></span>"
        }
}, 1000)

//nama sambutan
const urlParams = new URLSearchParams(window.location.search)
const panggilan = urlParams.get('to')
const nama = urlParams.get('n')
const namaSambutan = document.querySelector('#nama-sambutan')
namaSambutan.innerText = `${panggilan} ${nama},`

/*
function copyText(el)
{
    var content = jQuery(el).siblings('div.card-container').find('div.card-number').text().trim()

    var temp = document.createElement("textarea")

    document.body.appendChild(temp)

    temp.value = content.replace(/\s+/g, '')
    temp.select()

    document.execCommand("Copy")

    document.body.removeChild(temp)

    jQuery(el).text('Berhasil di copy ke papan klip')

    setTimeout(function (){
        jQuery(el).html(`<i class="fas fa-regular fa-copy"></i> Copy`)
    })

}
*/

function copyText(el) {
    var content = jQuery(el).siblings('div.card-container').find('div.card-number').text().trim();

    navigator.clipboard.writeText(content).then(() => {
        jQuery(el).text('Berhasil di copy ke papan klip');

        setTimeout(function () {
            jQuery(el).html(`<i class="fas fa-regular fa-copy"></i> Copy`);
        }, 2000);
    }).catch(err => {
        console.error('Gagal menyalin teks: ', err);
    });
}

//rsvp
window.addEventListener("load", function() {
    const form = document.getElementById('rsvp-form');
    form.addEventListener("submit", function(e){
        e.preventDefault();

        const status = document.getElementById('status').value
        const nama = document.getElementById('nama').value.trim()

        if (nama === ""){
            Swal.fire({
                icon: "error",
                text: "Nama harus diisi!"
            })
            return;
        }

        if (status == "0") {
            Swal.fire({
                icon: "error",
                text: "Pilih salah satu status terlebih dahulu!"
            })
            return;
        }

        const data = new FormData(form);
        const action = e.target.action;
        const input = form.querySelectorAll('input, select, button')
        input.forEach(input => {
            input.disabled = true
        })

        fetch(action, {
            method: 'POST',
            body: data
        })
        .then(() => {
            Swal.fire({
                icon: "success",
                text: "Konfirmasi kehadiran Anda berhasil terkirim!"
            })
        })
        .catch((error) => {
            Swal.fire({
                icon: "error",
                text: error
            })
        })
        .finally(() => {
            input.forEach(input => {
                input.disabled = false
            })
        })

    })
})