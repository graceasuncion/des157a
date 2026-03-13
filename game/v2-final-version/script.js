(function(){

    "use script";

    console.log("reading js");

    /*variables that is needed for the game*/

    const racoonPlayer = document.querySelector('#racoon-boxer');
    const possumPlayer = document.querySelector('#possum-boxer');

    /*the switch from the starting screen to the game screen*/

    const startBtn = document.querySelector('#start-btn');
    const startScreen = document.querySelector('#startscreen');
    const gameScreen = document.querySelector('#gamescreen');

    startBtn.addEventListener("click", function(){

       startScreen.style.display ="none";
       gameScreen.style.display = "block";

    });

    /*randomizing who will play first*/

    const messages = document.querySelector('#messages');
    const randomizeBtn = document.querySelector('#randomize-btn');

    randomizeBtn.addEventListener('click', function(){
        const playerFirst = Math.random() 
    })

}());