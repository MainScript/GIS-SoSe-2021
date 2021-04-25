function multiply(a: number, b: number): number {
    return a*b;
}

function max(a: number, b: number): number {
    if (a > b){
        return a;
    } else if (b > a ){
        return b;
    } else {
        return -1;
    }
}

function oneToHundred(): void {
    let out: number = 0;
    let i: number = 0;
    while (i <= 100) {
        out += i;
        i++;
    };
    console.log(out);
}

function randomDigits(): void{
    for (let i: number = 0; i < 10; i++) {
        console.log(Math.floor(Math.random() * 100));
    }
}

function factorial(n: number): number{
    if (n < 1) {
        return 1;
    } else {
        let out: number = 1;
        for (let i: number = 2; i <= n; i++) {
            out *= i;
        }
        return out;
    }
}

function leapyears(): void {
    let year: number = 1900;
    while (year < 2021){
        if (year%4 == 0 && year%100 != 0 && year%400 == 0) {
            console.log(year);
        }
        year++;
    }
}