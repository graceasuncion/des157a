(function(){

    "use strict"
    console.log('reading js');
    
    document.addEventListener("DOMContentLoaded", function () {
        const form = document.getElementById("madlibForm");
        const storyDiv = document.getElementById("story");
        const madlibText = document.getElementById("madlibText");
        const resetBtn = document.getElementById("resetBtn");

        const h = (text) => `<span class="highlight">${text}</span>`;


        form.addEventListener("submit", function (event) {
            event.preventDefault();

            
            const firstName = document.getElementById("first-name").value;
            const lastName = document.getElementById("last-name").value;
            const adjOne = document.getElementById("adj-one").value;
            const adjTwo = document.getElementById("adj-two").value;
            const adjThree = document.getElementById("adj-three").value;
            const verbIng = document.getElementById("verb-ing").value;
            const pluralNoun = document.getElementById("plural-noun").value;
            const skill = document.getElementById("skill").value;
            const animal = document.getElementById("animal").value;
            const tool = document.getElementById("tool").value;
            const food = document.getElementById("food").value;
            const number = document.getElementById("number").value;
            const emotion = document.getElementById("emotion").value;
            const verbQuiet = document.getElementById("verb-quiet").value;
            const verbCalm = document.getElementById("verb-calm").value;
            const sillyWord = document.getElementById("silly-word").value;
            const beverage = document.getElementById("beverage").value;
            const celebrity = document.getElementById("celebrity").value;
            const diffFirst = document.getElementById("diff-first").value;
            const diffLast = document.getElementById("diff-last").value;

        /*the madlib story*/
            const story = `
                Dear ${firstName} ${lastName},

                I am writing to you in hopes of being your most ${adjOne} and ${adjTwo} employee at the amazing ${adjThree} convenience store because I love to enjoy ${verbIng} and being surrounded by ${pluralNoun} at all times.
                I have many skills that can be useful to you, ${skill}, customer service, and the ability to fight off an ${animal} using only a ${tool}. I am extremely qualified to restock ${food} and can carry ${number} boxes at once. When customers are rude to me, I remain ${emotion} and simply ${verbQuiet} quietly in the snack aisle. When the store gets busy, I stay calm by remembering to ${verbCalm} and whisper “${sillyWord}” under my breath for emotional support. If hired, I promise always to refill the coffee, protect the sacred supply of ${beverage}, and only cry in the freezer aisle when ${celebrity} visits unexpectedly.

                Thank you for considering my application, and I look forward to hearing from you soon!

                Best,
             ${diffFirst} ${diffLast}
            `;

       
            madlibText.innerHTML = story;
            storyDiv.style.display = "grid";
            form.style.display = "none";
        });

        
    
        resetBtn.addEventListener("click", function() {
            form.reset();
            madlibText.innerHTML = "";
            storyDiv.style.display = "none";
            form.style.display = "grid";  
            
        });
    });
}());