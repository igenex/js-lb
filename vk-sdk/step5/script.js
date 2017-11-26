Handlebars.registerHelper('formatTime', time => {
    "use strict";
    let minutes = parseInt(time / 60);
    let seconds = time - minutes * 60;

    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;

    return `${minutes} : ${seconds}`;
});

let globalPlayer = document.createElement('audio');
let playingItem;

new Promise(resolve => {
    "use strict";
    if(document.readyState === 'complete') {
        resolve();
    } else {
        window.onload = resolve;
    }
}).then(() => {
    "use strict";
    return new Promise((resolve, reject) => {
        VK.init({
            apiId: 6272226
        });
        VK.Auth.login(function(response) {
            if (response.session) {
                resolve(response);
            } else {
                reject(new Error('Не удалось авторизироваться'));
            }
        }, 8);
    });
}).then(() => {
    return new Promise((resolve, reject) => {
        "use strict";
        VK.api('users.get', {'name_case' : 'gen'}, response => {
            if(response.error) {
                reject(new Error(response.error.error_msg));
            } else {
                let userData = response.response[0];
                headerInfo.textContent = `Музыка на странице ${userData.first_name} ${userData.last_name}`;
                resolve();
            }
        });
    });
}).then(() => {
    "use strict";
    return new Promise((resolve, reject) => {
        VK.api('audio.get', {v: '5.53'}, response => {
            if(response.error) {
                reject(new Error(response.error.error_msg));
            } else {
                let source = playerItemTemplate.innerHTML;
                let templateFn = Handlebars.compile(source);
                let template = templateFn({list: response.response.items});

                result.innerHTML = template;

                resolve();
            }
        })
    })
}).then(
    () => {
        "use strict";
        function onProgress (e) {
            let progressbar = playingItem.querySelector('[data-role=progressbar]');
            let duration = e.target.duration;
            let currentTime = e.target.currentTime;
            let progress = parseInt(100 / duration * currentTime);

            progressbar.style.width = progress + "%";
        }

        function onPlay() {
            playingItem.querySelector('[data-role=playback]').className = 'glyphicon glyphicon-pause';
            mainPlaybackButton.querySelector("[data-role=playback]").className = "glyphicon glyphicon-pause";
        }

        function onPause () {
            playingItem.querySelector('[data-role=playback]').className = 'glyphicon glyphicon-play';
            mainPlaybackButton.querySelector("[data-role=playback]").className = "glyphicon glyphicon-play";
        }

        function toSong (to) {
            if(playingItem) {
                let nextPlayer = to === 'next' ? playingItem.nextElementSibling : playingItem.previousElementSibling;

                if(nextPlayer) {
                    nextPlayer.querySelector('[data-role=playback]').dispatchEvent(new CustomEvent('click'));
                }
            }
        }

        function onEnd () {
            toSong('next');
        }

        prevSongButton.addEventListener('click', () => {
            toSong('prev');
        });
        mainPlaybackButton.addEventListener('click', () => {
            if(playingItem){
                playingItem.querySelector('[data-role=playback]').click();
            } else if(audioList) {
                let firstItem = audioList.querySelector('li');

                if(firstItem) {
                    firstItem.querySelector('[data-role=playback]').click();
                }
            }

        });
        nextSongButton.addEventListener('click', () => {
            toSong('next');
        });

        document.addEventListener('keydown', (e) => {
            if(e.target.tagName !== 'INPUT') {
                switch (e.keyCode) {
                    case 32 :
                        e.preventDefault();
                        mainPlaybackButton.dispatchEvent(new CustomEvent('click'));
                        break;
                    case 37 :
                        e.preventDefault();
                        prevSongButton.dispatchEvent(new CustomEvent('click'));
                        break;
                    case 39 :
                        e.preventDefault();
                        nextSongButton.dispatchEvent(new CustomEvent('click'));
                        break;

                }
            }
        }, true);

        globalPlayer.addEventListener('play', onPlay);
        globalPlayer.addEventListener('pause', onPause);
        globalPlayer.addEventListener('timeupdate', onProgress);
        globalPlayer.addEventListener('ended', onEnd);

        result.addEventListener('click', (e) => {
            if(e.target.getAttribute('data-role') === 'playback') {
                let currentItem = e.target.closest('li');

                if(currentItem === playingItem) {
                    if(globalPlayer.paused) {
                        globalPlayer.play();
                    } else {
                        globalPlayer.pause();
                    }
                } else {
                    if(!globalPlayer.paused) {
                        onPause();
                    }

                    playingItem = currentItem;

                    globalPlayer.src = e.target.getAttribute('data-src');
                    globalPlayer.play();
                }
            }
        });
    }
).catch(e => {
    alert(`Ошибка : ${e.message}`);
});