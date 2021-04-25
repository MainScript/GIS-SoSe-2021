function hash() {
    for (var i = 1; i <= 7; i++) {
        var out = "";
        for (var k = 1; k <= i; k++) {
            out += "#";
        }
        console.log(out);
    }
}
function fizzBuzz() {
    for (var i = 1; i < 100; i++) {
        if (i % 3 == 0 && i % 5 != 0) {
            console.log("Fizz");
        }
        else if (i % 3 != 0 && i % 5 == 0) {
            console.log("Buzz");
        }
        else if (i % 3 == 0 && i % 5 == 0) {
            console.log("FizzBuzz");
        }
        else {
            console.log(i);
        }
    }
}
function schach(height, width) {
    var out = "";
    for (var i = 0; i < height; i++) {
        if (i % 2 == 0) {
            for (var k = 0; k < width; k++) {
                if (k % 2 == 0) {
                    out += " ";
                }
                else {
                    out += "#";
                }
            }
        }
        else {
            for (var k = 0; k < width; k++) {
                if (k % 2 == 0) {
                    out += "#";
                }
                else {
                    out += " ";
                }
            }
        }
        out += "\n";
    }
    console.log(out);
}
