let array = [1, 2, 3, 4, 5, 6];
// forEach(array, item => console.log(item));
// let greaterThan4 = filter(array, item => item > 4);
// let sqare = map(array, item => item*item);


Array.prototype.reduceCustom = function(func) {
    "use strict";
    let arr = this;
    let len = arr.length;
    for(let index = 0; index < len-1; index ++) {
        func(arr[index],arr[index+1], index, arr);
    }
};


Array.prototype.forEachCustom = function(func) {
    "use strict";
    let arr = this;
    let len = arr.length;
    for(let index = 0; index < len; index ++) {
        func(arr[index], index, arr);
    }
};


Array.prototype.filterCustom = function(func) {
    "use strict";
    let arr = this;
    let arrLen = arr.length;
    let newArr = [];
    for(let i = 0; i < arrLen; i++){
        if(func(arr[i])) {
            newArr[newArr.length] = arr[i];
        }
    }

    return newArr;
};

Array.prototype.mapCustom = function(func){
    let arr = this;
    let arrLen = arr.length;
    let newArr = [];
    for(let i = 0; i < arrLen; i++){
        newArr = func(arr[i]);
    }

    return newArr;
};

Array.prototype.sliceCustom = function(a, b) {
    "use strict";

    let arr = this;
    let arrLen = arr.length;
    let newArr = [];

    if(b !== undefined) {
        if(a > 0 && b > 0) {
            while(a < (arrLen - b)) {
                newArr[newArr.length] = arr[a];
                a++;
            }
            return newArr;
        } else {
            while(a < (arrLen + b)) {
                newArr[newArr.length] = arr[a];
                a++;
            }
            return newArr;
        }
    }

    if(a > 0) {
        while(a < arrLen) {
            newArr[newArr.length] = arr[a];
            a++;
        }

        return newArr;
    } else {
        while((arrLen - a) < arrLen) {
            newArr[newArr.length] = arr[a];
            a++;
        }

        return newArr;
    }

};

Array.prototype.spliceCustom = function(a, b, ...c) {
    "use strict";
      
};





// Проверяем скрипты

/*array.forEachCustom(function(key){
    "use strict";
    console.log(key);
});*/

let newArr = [];
newArr = array.filterCustom(function(key){
    "use strict";
    return key > 3;
});
console.log(newArr);



