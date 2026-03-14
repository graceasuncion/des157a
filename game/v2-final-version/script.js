(function(){

    "use script";

    console.log("reading js");

    /*variables that is needed for the game*/

    const raccoonPlayer = document.querySelector('#raccoon-boxer');
    const possumPlayer = document.querySelector('#possum-boxer');
    const attackBtn = document.querySelector('#attack-btn');

    /*audio sfx*/

    const hitSound = new Audio("sounds/punch-sound.mp3");
    const winnerSound = new Audio("sounds/winner-sound.mp3")

    const gameData = {
        animals:[
            {name:'Raccoon', class: "raccoon-highlight"}, 
            {name:'Possum', class: "possum-highlight"}
        ]
    };

    let turn = null
    let turnMessageTimeout = null;

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
        const index = Math.floor(Math.random() * gameData.animals.length);
        const chosen = gameData.animals[index];

        if (chosen.name === "Raccoon"){
            turn = "raccoonPlayer";
        } else{
            turn = "possumPlayer";
        }

        messages.innerHTML =`<p>Oh! <strong class="${chosen.class}">${chosen.name}</strong> was chosen to attack first. Press the button to start the match.</p>`;
        
        randomizeBtn.style.display = "none";
        attackBtn.style.display = "block";

        console.log("Chosen:",chosen.name);
        console.log("Turn set to:", turn);
    });

    /*health bar + damage function*/
    function randomDamage(min = 5, max = 35) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    let raccoonHP = 100;
    let possumHP = 100;

    function updateHealth(barId, textId, currentHP){
        const percent = Math.max(currentHP, 0);

        console.log("HP VALUE RECEIVED:", currentHP, "PERCENT:", percent);

        
        const fill = document.querySelector(`#${barId} .fill`);
        fill.style.width = percent + "%";

        fill.classList.remove("health-green","health-yellow","health-red");

        if(percent >=70){
            fill.classList.add("health-green");
        } else if (percent >= 30){
            fill.classList.add("health-yellow");
        } else {
            fill.classList.add("health-red");
        }

        document.getElementById(textId).textContent = percent + "%";

        if (percent <=0){
            if(barId === "raccoon-health-bar"){
                gameOver("Possum");
            } else if (barId === "possum-health-bar"){
                gameOver("Raccoon");
            }
        }

        console.log("Checking bar:", barId, "HP:", percent);
    };

    /*damage/attack messages on the textbox*/
    function showMessage(text){
        messages.innerHTML = `<p>${text}</p>`;
    }

    /*raccoon + possum attack*/
    function raccoonAttack(){
        const damage = randomDamage();
        possumHP -= damage;

        hitSound.currentTime = 0;
        hitSound.play();

        updateHealth("possum-health-bar","possum-health",possumHP);

        if (possumHP > 0){
            showMessage(`<span class="raccoon-highlight">Raccoon</span> punched Possum for ${damage} damage!`);

        }
        
    }

    function possumAttack(){
        const damage = randomDamage();
        raccoonHP -= damage;

        hitSound.currentTime = 0;
        hitSound.play();

        updateHealth("raccoon-health-bar","raccoon-health",raccoonHP);

        if (raccoonHP > 0){
            showMessage(`<span class="possum-highlight">Possum</span> punched Raccoon for ${damage} damage!`);

        }
        
    }

    /*attack button function*/
    attackBtn.addEventListener("click",function(){

        if (raccoonHP <= 0 || possumHP <=0) return;

        if (turn === "raccoonPlayer"){
            raccoonAttack();
            turn = "possumPlayer";

            turnMessageTimeout = setTimeout(function(){
                showMessage(`Now it's <span class="possum-highlight">Possum</span>'s turn!`);
            }, 1500);

            
        } else {
            possumAttack();
            turn = "raccoonPlayer"

            turnMessageTimeout = setTimeout(function(){
                showMessage(`Now it's <span class="raccoon-highlight">Raccoon</span>'s turn!`);
            }, 1500);

        }

        console.log("Current turn:", turn);
    });

    /*game over overlay function*/
    function gameOver(winner){

        attackBtn.style.display = "none";

        winnerSound.currentTime = 0;
        winnerSound.play();

        const box = document.querySelector('#gameover-box');
        const winnerText = document.querySelector('#winner-text');

        if (winner === "Raccoon") {
            winnerText.innerHTML = `<span class="raccoon-highlight">Raccoon</span> wins the match!`;
        } else {
            winnerText.innerHTML = `<span class="possum-highlight">Possum</span> wins the match!`;
        }

        document.querySelector('#gameover-overlay').style.display = "flex";


    };

    /*restart button function*/
    function restartGame(){

        clearTimeout(turnMessageTimeout);

        raccoonHP = 100;
        possumHP = 100;


        updateHealth("raccoon-health-bar", "raccoon-health", raccoonHP);
        updateHealth("possum-health-bar", "possum-health", possumHP);

        showMessage("<p>Press the button to choose who attacks first!</p>");

        randomizeBtn.style.display = "block";
        attackBtn.style.display = "none";

        document.querySelector('#gameover-overlay').style.display = "none";

        turn = null;
    }

    document.querySelector('#restart-btn').addEventListener("click", restartGame);


    /*resource overlay function*/
    const resourcesLink = document.querySelector('#resources-link');
    const resourcesOverlay = document.querySelector('#resources-overlay');
    const closeResources = document.querySelector('#close-resources');

    resourcesLink.addEventListener("click", () => {
        resourcesOverlay.style.display = "flex";
    });

    closeResources.addEventListener("click", () => {
        resourcesOverlay.style.display = "none";
    });



}());