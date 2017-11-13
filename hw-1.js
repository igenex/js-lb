function logArray(array, n){
    "use strict";
    if(n < array.length){
        console.log(array[n]);
        n++;
        logArray(array,n);
    }
}

logArray(['я', 'уменю', 'писать', 'рекурсивные', 'функции'],0);