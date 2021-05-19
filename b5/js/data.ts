namespace b4 {
    let optionsTop: Options = { red: "img/top_red.png", green: "img/top_green.png", blue: "img/top_blue.png" };
    let optionsMid: Options = { red: "img/mid_red.png", green: "img/mid_green.png", blue: "img/mid_blue.png" };
    let optionsBot: Options = { red: "img/bot_red.png", green: "img/bot_green.png", blue: "img/bot_blue.png" };

    let optionsArray: OptionsArray = {
        top: optionsTop,
        mid: optionsMid,
        bot: optionsBot
    };

    export let optionsJSON: string = JSON.stringify(optionsArray);
}