//import { b3data } from "./data";
// Ich bekomme immer Uncaught ReferenceError: exports is not defined

namespace b3Aufgabe23 {
    // Dieser Teil wäre eigentlich in data.ts
    let optionData: string[][] = [
        ["test"],["test", "test"]
    ];
    
    class Part {
        position: number[];
        possibleoptions: string[];
        chosenoption: string;
        constructor(_x: number, _y: number, _options: string[]){
            this.possibleoptions = _options;
            this.position[0] = _x;
            this.position[1] = _y;
        }

        choose(_ch: number){
            this.chosenoption = this.possibleoptions[_ch];
        }

        addOption(_opt: string){
            this.possibleoptions.push(_opt);
        }
    }

    interface Bild{
        top: Part;
        mid: Part;
        bottom: Part;
    }

    
}