"use strict";
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
    let out = 0;
    let i = 0;
    while (i <= 100) {
        out += i;
        i++;
    }
    ;
    console.log(out);
}
function randomDigits() {
    for (let i = 0; i < 10; i++) {
        console.log(Math.floor(Math.random() * 100));
    }
}
function factorial(n) {
    if (n < 1) {
        return 1;
    }
    else {
        let out = 1;
        for (let i = 2; i <= n; i++) {
            out *= i;
        }
        return out;
    }
}
function leapyears() {
    let year = 1900;
    while (year < 2021) {
        if (year % 4 == 0 && year % 100 != 0 && year % 400 == 0) {
            console.log(year);
        }
        year++;
    }
}
//# sourceMappingURL=script5.js.map