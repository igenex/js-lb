new Promise(resolve => {
    "use strict";
    if(document.readyState === 'complete') {
        resolve();
    } else {
        window.onload = resolve;
    }
}).then(
    () => {
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
    }
).then(
    () => {
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
    }
);