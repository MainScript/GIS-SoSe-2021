function hash(): void {
    for(let i: number = 1; i <= 7; i++){
        let out: string = "";
        for(let k: number = 1; k <= i; k++){
            out += "#";
        }
        console.log(out);
    }
}

function fizzBuzz(): void {
    for (let i: number = 1; i < 100; i++) {
        if(i%3 == 0 && i%5 != 0){
            console.log("Fizz");
        } else if (i%3 != 0 && i%5 == 0){
            console.log("Buzz");
        } else if (i%3 == 0 && i%5 == 0){
            console.log("FizzBuzz");
        } else {
            console.log(i);
        }
    }
}

function schach(height: number, width: number): void {
    let out = "";
    for (let i = 0; i < height; i++){
        if (i%2 == 0){
            for (let k = 0; k < width; k++){
                if (k%2 == 0){
                    out += " ";
                } else {
                    out += "#";
                }
            }
        } else {
            for (let k = 0; k < width; k++){
                if (k%2 == 0){
                    out += "#";
                } else {
                    out += " ";
                }
            }
        }
        out += "\n";
    }
    console.log(out);
}