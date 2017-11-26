VK.init({
    apiId : 6272226
});

let cb = response => {
    "use strict";
    if(response.session) {
        console.log('Авторизация прошла успешно');
    } else {
        console.log('Ошибка авторизации');
    }
};

VK.Auth.login(cb);