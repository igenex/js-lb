function isAllTrue ( source, filterFn ) {
    "use strict";
    if(!source.length) {
        throw new Error("Массив пустой");
    }
    for(let i = 0; i < source.length; i++) {
        if(!isNumber(source[i])) {
            throw new Error("Это не число: " + source[i]);
        }

    }
}

function isSomeTrue(source, filterFn) {
    "use strict";
    let count = 0;
    for(let i = 0; i < source.length; i++) {
        if(isNumber(source[i])) {
            return true;
        }
        else {
            count++;
        }
    }
    if(count === source.length) {
        return false;
    }
}

let allNumbers = [1, 2, 3, 4, 5, 6, 7, 8],
    someNumbers = [1, 2, 'привет', 4, 5, 'loftschool', 6, 7, 8],
    noNumbers = ['это', 'массив', 'без', 'чисел'];

function isNumber(val) {
    "use strict";
    return typeof val === 'number';
}

// console.log(isAllTrue(allNumbers, isNumber));
// console.log(isAllTrue(someNumbers, isNumber));
// console.log(isAllTrue(noNumbers, isNumber));

// console.log(isSomeTrue(allNumbers, isNumber));
// console.log(isSomeTrue(someNumbers, isNumber));
// console.log(isSomeTrue(noNumbers, isNumber));

function calculator(num) {
    "use strict";
    return {
        sum : function(numbers) {
            for(let i=0; i<arguments.length;i++) {
                num += arguments[i];
            }
            return num;
        },
        dif : function(numbers) {
            for(let i=0; i<arguments.length;i++) {
                num -= arguments[i];
            }
            return num;
        },
        div : function(numbers) {
            for(let i=0; i<arguments.length;i++) {
                if (arguments[i]===0){
                    throw new Error("Делить на 0 нельзя!");
                }
                num /= arguments[i];
            }
            return num;
        },
        mul : function(numbers) {
            for(let i=0; i<arguments.length;i++) {
                num *= arguments[i];
            }
            return num;
        }
    }
}

let myCalculator = calculator(100);

console.log(myCalculator.sum(1, 2, 3)); //вернет 106
console.log(myCalculator.dif(10, 20)); //вернет 70
console.log(myCalculator.div(2, 2)); //вернет 25
console.log(myCalculator.mul(2, 2)); //вернет 400