"use strict";
function a1() {
    let x = "Alles";
    console.log(x);
    func1();
    console.log("Logo!");
}
a1();
function func1() {
    console.log("Klar?");
}
//1a) Ausgabe: "Alles" "Klar?" "Logo!"
//Die Funktion a1() wird aufgerufen, welche zuerst den String x = "Alles" in der Konsole ausgibt
//danach wird die Funktion func1 aufgerufen, welche "Klar?" in der Konsole ausgibt
//danach gibt die funktion a1() "Logo!" in der Konsole aus
//zulässige Werte für x sind alle Zeichenketten
//1b: Die Reihenfolge, die ich in 1a) angegeben habe, wird bestätigt
//1c:
function a2() {
    func2();
    console.log("Gute!");
    func2();
    console.log("Klar?");
    func2();
    console.log("Logo!");
}
a2();
function func2() {
    console.log("Alles");
}
//# sourceMappingURL=script1.js.map