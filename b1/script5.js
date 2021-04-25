function multiply(a, b) {
    return a * b;
}
function max(a, b) {
    if (a > b) {
        return a;
    }
    else if (b > a) {
        return b;
    }
    else {
        return -1;
    }
}
function oneToHundred() {
    var out = 0;
    var i = 0;
    while (i <= 100) {
        out += i;
        i++;
    }
    ;
    console.log(out);
}
function randomDigits() {
    for (var i = 0; i < 10; i++) {
        console.log(Math.floor(Math.random() * 100));
    }
}
function factorial(n) {
    if (n < 1) {
        return 1;
    }
    else {
        var out = 1;
        for (var i = 2; i <= n; i++) {
            out *= i;
        }
        return out;
    }
}
function leapyears() {
    var year = 1900;
    while (year < 2021) {
        if (year % 4 == 0 && year % 100 != 0 && year % 400 == 0) {
            console.log(year);
        }
        year++;
    }
}
