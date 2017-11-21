function getNFunctions(count) {
    var arr = [], i;
    for (i = 1; i < count; i++) {
        (function(index){
            arr.push(function(){ alert(index); });
        }(i));
    }
    return arr;
}

var i = 1000;
var mas = prompt('Будет показан массив, введенного числа','');
var arr = getNFunctions(i);

/*arr[0]();
arr[2]();
arr.shift();
arr[2]();*/

alert(arr[mas]());
