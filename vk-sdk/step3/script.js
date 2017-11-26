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
        function onPlay() {
            playingItem.querySelector('[data-role=playback]').className = 'glyphicon glyphicon-pause';
        }

        function onPause () {
            playingItem.querySelector('[data-role=playback]').className = 'glyphicon glyphicon-play';
        }

        globalPlayer.addEventListener('play', onPlay);
        globalPlayer.addEventListener('pause', onPause);

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