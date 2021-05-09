"use strict";
// Aufgabe 4:
let x = "Hallo";
console.log(x);
func3(x);
console.log(x);
func4();
func5();
console.log(x);
function func3(y) {
    y = "Bla";
    console.log(y);
}
function func4() {
    let x = "Blubb";
    console.log(x);
}
function func5() {
    x = "Test";
}
// Ausgabe: Hallo Bla Hallo Blubb Test Hallo
// Funktionen ähneln Variablen, indem sie auch einen Typ haben (Rückgabewert im Falle von Funktionen)
// Sie unterscheiden sich, da Funktionen Code ausführen können und einen Wert zurückgeben können und Variablen nur einen Wert haben
//# sourceMappingURL=script4.js.map