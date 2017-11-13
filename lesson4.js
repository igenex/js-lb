let obj1 = {
    name : 'Евгений',
    lastName : 'Сикиржицкий',
    unuse : false,
    prep : '0',
    length: 180,
    valueOf () {
    return this.length;
},
    toString() {
        "use strict";
        return `[${this.name}] - [${this.lastName}]`;
    }
};

let obj2 = {
    name : 'Василий',
    lastName : 'Иванов',
    unuse : false,
    prep : '0',
    length : 210,
    valueOf () {
        return this.length;
    },
    toString() {
        "use strict";
        return "++++";
    }
};

if(obj1 < obj2) {
    console.log("YES!");
}

console.log(obj1 + obj2);

let key = 'lastName';

console.log(obj1.lastName);
console.log(obj1[key]);

delete obj1.unuse;

for(let prop in obj1) {
    console.log(obj1[prop]);
    console.log(prop);
}

let keys = Object.keys(obj1);
for (let i = 0; i < keys.length; i++) {
    console.log(keys[i]);
}

Object.keys(obj1).forEach(key => console.log(obj1[key]));

//Методы object
obj1.hasOwnProperty('prep'); //Имеет ли объект это свойство (собственное, не унаследованное)
Object.keys(obj1); //Список имен свойств, возращенные в массиве
obj1.toString(); //Функция объекта, которая будет выполняться каждый раз
//При попытке представить объект как строковое значение
obj1.valueOf(); //Функция объекта, которая будет выполняться каждый раз
//При попытке представить объект как не строковое значение

//Более гибкая установка свойств объекта

Object.defineProperty(obj1, 'fullName', {
    value : '!!!!!',
    enumerable : true,
    writable : true,
});

Object.defineProperty(obj2, 'fullName', {
    get() {
        "use strict";
        return `${this.name} ${this.lastName}`;
    },
    set(value) {
        "use strict";
        // console.log('Новое значение', value);
        // let parts = value.split(' ');
        //
        // this.name = parts[0];
        // this.lastName = parts[1];
        //Это можно записать по другому

        [this.name, this.lastName] = value.split(' ');
    }
});

console.log(obj2);

obj2.fullName = 'Евгений Сикиржицкий';

console.log(obj2);

let array = [100, 200, 300, 400, 500, 600];
let array1 = [1,2,3,4,5];

array.splice(1,0, ...array1);

console.log(array);


