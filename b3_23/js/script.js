"use strict";
//import { b3data } from "./data";
// Ich bekomme immer Uncaught ReferenceError: exports is not defined
var b3Aufgabe23;
(function (b3Aufgabe23) {
    // Dieser Teil wäre eigentlich in data.ts
    let optionData = [
        ["test"], ["test", "test"]
    ];
    class Part {
        constructor(_x, _y, _options) {
            this.possibleoptions = _options;
            this.position[0] = _x;
            this.position[1] = _y;
        }
        choose(_ch) {
            this.chosenoption = this.possibleoptions[_ch];
        }
        addOption(_opt) {
            this.possibleoptions.push(_opt);
        }
    }
})(b3Aufgabe23 || (b3Aufgabe23 = {}));
//# sourceMappingURL=script.js.map