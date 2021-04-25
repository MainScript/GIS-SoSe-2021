// Aufgabe 4:

let x: string = "Hallo";
console.log(x);
func3(x);
console.log(x);
func4();
func5();
console.log(x);

function func3(y: string): void{
    y = "Bla";
    console.log(y);
}

function func4(): void{
    let x: string = "Blubb";
    console.log(x);
}

function func5(): void{
    x = "Test";
}

// Ausgabe: Hallo Bla Hallo Blubb Test Hallo
// Funktionen ähneln Variablen, indem sie auch einen Typ haben (Rückgabewert im Falle von Funktionen)
// Sie unterscheiden sich, da Funktionen Code ausführen können und einen Wert zurückgeben können und Variablen nur einen Wert haben