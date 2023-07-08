// Defining Types Of Drum Keys Available
 var data = {
    'W': {
        name: 'Clap',
        sound: 'sounds/clap.wav',
    },
    'E': {
        name: 'HiHat',
        sound: 'sounds/hihat.wav'
    },
    'R': {
        name: 'Kick',
        sound: 'sounds/kick.wav'
    },
    'T': {
        name: 'OpenHat',
        sound: 'sounds/openhat.wav'
    },
    'Y': {
        name: 'Boom',
        sound: 'sounds/boom.wav'
    },
    'U': {
        name: 'Ride',
        sound: 'sounds/ride.wav'
    },
    'I': {
        name: 'Snare',
        sound: 'sounds/snare.wav'
    },
    'O': {
        name: 'Tom',
        sound: 'sounds/tom.wav'
    },
    'P': {
        name: 'Tink',
        sound: 'sounds/tink.wav'
    }
};

var drumkit = document.getElementById("drumkit");


function construct() {
    for (var key in data) {
        var drumKey = document.createElement('div');
        drumKey.classList.add('keyBlock', data[key].name);
        var h2 = document.createElement('h2');
        h2.textContent = key;

        var span = document.createElement('span');
        span.textContent = data[key].name;

        drumKey.appendChild(h2);
        drumKey.append(span);
        drumkit.appendChild(drumKey);

 
        drumKey.addEventListener('click', function (event) {
            var key = event.currentTarget.querySelector('h2').textContent;
            playDrum(key.toUpperCase());
        });
    }
};


function playDrum(key) {
    if (data.hasOwnProperty(key)) {
        var drumKey = document.querySelector('.keyBlock.' + data[key].name);
        drumKey.classList.add('active');
        var audio = new Audio();
        audio.src = data[key].sound;
        audio.play();


        audio.addEventListener('timeupdate', function () {
            if (audio.currentTime >= audio.duration / 32) {
                drumKey.classList.remove('active');
                audio.removeEventListener('timeupdate', arguments.callee);
            }
        });
    } else {
    
        alert(
            "OOPS!\nIt looks like you've pressed a key that isn't defined.\nTry again with a valid key."
        );

        setTimeout(function () {
            console.clear();
        }, 10000);
    }
};

function keyEvents(event) {
    playDrum(event.key.toUpperCase());
};

window.addEventListener('keydown', keyEvents);

construct();