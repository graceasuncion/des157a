(function(){

    "use script";

    console.log("reading js");

    /*variables that is needed for the game*/

    const raccoonPlayer = document.querySelector('#raccoon-boxer');
    const possumPlayer = document.querySelector('#possum-boxer');
    const attackBtn = document.querySelector('#attack-btn')

    const gameData = {
        animals:[
            {name:'Raccoon', class: "raccoon-highlight"}, 
            {name:'Possum', class: "possum-highlight"}
        ]
    };

    let turn = null

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

        updateHealth("possum-health-bar","possum-health",possumHP);

        if (possumHP > 0){
            showMessage(`Raccoon punched Possum for ${damage} damage!`);
        }
        
    }

    function possumAttack(){
        const damage = randomDamage();
        raccoonHP -= damage;

        updateHealth("raccoon-health-bar","raccoon-health",raccoonHP);

        if (raccoonHP > 0){
            showMessage(`Possum punched Raccoon for ${damage} damage!`);
        }
        
    }

    /*attack button function*/
    attackBtn.addEventListener("click",function(){

        if (raccoonHP <= 0 || possumHP <=0) return;

        if (turn === "raccoonPlayer"){
            raccoonAttack();
            turn = "possumPlayer";

            setTimeout(function(){
                if (possumHP > 0 && raccoonHP > 0){
                    showMessage("Now it's Possum's turn!");
                }
                
            }, 1500);
            
        } else {
            possumAttack();
            turn = "raccoonPlayer"

            setTimeout( function(){
                if (possumHP > 0 && raccoonHP > 0){
                    showMessage("Now it's Raccoon's turn!");
                }
                
            }, 1500);
            
        }

        console.log("Current turn:", turn);
    });

    function gameOver(winner){

        attackBtn.style.display = "none";

        showMessage(`${winner} wins the match!`);

    };
    
}());