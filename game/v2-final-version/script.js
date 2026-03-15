(function(){

    "use script";

    console.log("reading js");

    /*variables that is needed for the game*/

    document.querySelector('#gameover-overlay').style.display = "none";

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

    /*list of all timeouts*/
    let timeouts = [];

    function addTimeout(callback, delay) {
        const id = setTimeout(callback, delay);
        timeouts.push(id);
        return id;
    }

    function clearAllTimeouts() {
        for (let t of timeouts) {
            clearTimeout(t);
        }
        timeouts = [];
    }


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
        } else if (percent >= 20){
            fill.classList.add("health-yellow");
        } else {
            fill.classList.add("health-red");
        }

        console.log("FILL CLASSES NOW:", fill.className);


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

    /*messages on the textbox*/
    function showMessage(text){
        messages.innerHTML = `<p>${text}</p>`;
    }

    /*floating animation*/
     function stopFloating(characterId){
        const noFloat = document.getElementById(characterId);
        noFloat.classList.remove("floating");
     }

     function resumeFloating(characterId){
        const yesFloat = document.getElementById(characterId);
        yesFloat.classList.add('floating');
     }

    /*attack animations*/

    function playAttackAnimation(id, idleImg, attackImg){
        const char = document.getElementById(id);

        stopFloating(id);
        char.src = attackImg;

        setTimeout(function(){
            char.src = idleImg;
            resumeFloating(id);
        }, 500);
    }

    function smallHitAnim(characterId){
        const smallHit = document.getElementById(characterId);
        smallHit.classList.remove("small-hit");
        void smallHit.offsetWidth;
        smallHit.classList.add("small-hit");

        setTimeout( function(){
            smallHit.classList.remove("small-hit");
        }, 2000);
    }

    function bigHitAnim(characterId){
        const bigHit = document.getElementById(characterId);
        bigHit.classList.remove("big-hit");
        void bigHit.offsetWidth;
        bigHit.classList.add("big-hit");

        setTimeout(function(){
            bigHit.classList.remove("big-hit");

        },1500);
    }

    /*dodge animation*/

    function dodgeAnim(characterId){
        const char = document.getElementById(characterId);

        stopFloating(characterId);

        char.classList.remove("dodge");
        void char.offsetWidth;
        char.classList.add("dodge");

        setTimeout(function(){
            char.classList.remove("dodge");
            resumeFloating(characterId);
        }, 500);

    }

    /*raccoon + possum attack*/
    function raccoonAttack(){
        const damage = randomDamage();
        possumHP -= damage;

        hitSound.currentTime = 0;
        hitSound.play();

        playAttackAnimation(
            "raccoon-boxer",             
            "images/racoon_in_the_ring.png",    
            "images/racoon_fighting.png"   
        );

        if (damage <= 15) {
            smallHitAnim("possum-boxer");
        } else {
            bigHitAnim("possum-boxer");
        }

        updateHealth("possum-health-bar","possum-health",possumHP);

        if (possumHP > 0){
            showMessage(`<span class="raccoon-highlight">Raccoon</span> punched Possum for ${damage} damage!`);
        }
        
        console.log("Raccoon HP:", raccoonHP, "Possum HP:", possumHP);

    }

    function possumAttack(){
        const damage = randomDamage();
        raccoonHP -= damage;

        hitSound.currentTime = 0;
        hitSound.play();

        playAttackAnimation(
            "possum-boxer",
            "images/possum_in_the_ring.png",
            "images/possum_fighting.png"
        );

        if (damage <= 15) {
            smallHitAnim("raccoon-boxer");
        } else {
            bigHitAnim("raccoon-boxer");
        }

        updateHealth("raccoon-health-bar","raccoon-health",raccoonHP);

        if (raccoonHP > 0){
            showMessage(`<span class="possum-highlight">Possum</span> punched Raccoon for ${damage} damage!`);
        }

        console.log("Raccoon HP:", raccoonHP, "Possum HP:", possumHP);

            
    }

    /*attack button function*/
    attackBtn.addEventListener("click", function () {

        if (raccoonHP <= 0 || possumHP <= 0) return;

        attackBtn.style.display = "none";

        
        if (turn === "raccoonPlayer") {

            // DODGE CHECK
            if (Math.random() < 0.3) {
                dodgeAnim("possum-boxer");
                showMessage(`<span class="possum-highlight">Possum</span> dodged the attack!`);
                turn = "possumPlayer";

                addTimeout(() => {
                    showMessage(`Now it's <span class="possum-highlight">Possum</span>'s turn!`);
                    attackBtn.style.display = "block";
                }, 1500);

                return;
            }

           
            raccoonAttack();
            turn = "possumPlayer";

            addTimeout(() => {
                if (possumHP > 0) {
                    showMessage(`Now it's <span class="possum-highlight">Possum</span>'s turn!`);
                    attackBtn.style.display = "block";
                }
            }, 1500);

        } 
        
        else {

            
            if (Math.random() < 0.2) {
                dodgeAnim("raccoon-boxer");
                showMessage(`<span class="raccoon-highlight">Raccoon</span> dodged the attack!`);
                turn = "raccoonPlayer";

                addTimeout(() => {
                    showMessage(`Now it's <span class="raccoon-highlight">Raccoon</span>'s turn!`);
                    attackBtn.style.display = "block";
                }, 1500);

                return;
            }

            
            possumAttack();
            turn = "raccoonPlayer";

            addTimeout(() => {
                if (raccoonHP > 0) {
                    showMessage(`Now it's <span class="raccoon-highlight">Raccoon</span>'s turn!`);
                    attackBtn.style.display = "block";
                }
            }, 1500);
        }
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

        const overlay = document.querySelector('#gameover-overlay');
        overlay.style.display = "flex";       
        overlay.style.opacity = "1";  
        overlay.style.pointerEvents = "auto";        


    };

    /*restart button function*/
    function restartGame(){

        clearAllTimeouts();

        raccoonHP = 100;
        possumHP = 100;


        updateHealth("raccoon-health-bar", "raccoon-health", raccoonHP);
        updateHealth("possum-health-bar", "possum-health", possumHP);

        showMessage("<p>Press the button to choose who attacks first!</p>");

        randomizeBtn.style.display = "block";
        attackBtn.style.display = "none";

        const overlay = document.querySelector('#gameover-overlay');

        overlay.style.opacity = "0";
        overlay.style.pointerEvents = "none";

        setTimeout(() => {
            overlay.style.display = "none";
        }, 300);

        turn = null;
    }

    document.querySelector('#restart-btn').addEventListener("click", restartGame);


    /*resource overlay function*/
    const resourcesLink = document.querySelector('#resources-link');
    const resourcesOverlay = document.querySelector('#resources-overlay');
    const closeResources = document.querySelector('#close-resources');

    resourcesLink.addEventListener("click", function() {
        resourcesOverlay.style.display = "flex";
    });

    closeResources.addEventListener("click", function() {
        resourcesOverlay.style.display = "none";
    });



}());