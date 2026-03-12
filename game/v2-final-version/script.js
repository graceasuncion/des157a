(function(){

    "use script";

    console.log("reading js");

    const startBtn = document.querySelector('#start-btn');
    const startScreen = document.querySelector('#startscreen');
    const gameScreen = document.querySelector('#gamescreen');

    startBtn.addEventListener("click", function(){

       startScreen.style.display ="none";
       gameScreen.style.display = "block";

    });

}());