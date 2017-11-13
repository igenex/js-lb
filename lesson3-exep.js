function div(a, b) {
    if(b === 0){
        throw new Error("Деление на 0");
    }
    if (b < 0) {
        throw new Error("Делитель меньше 0");
    }
    return a/b;
}

try{
    console.log( div(10, -3) );
    console.log( div(10, -3) + 1000 );
} catch(e) {
    console.error("Ошибка!!! " + e.message);
} finally {
    console.log('Finally!!!');
}
