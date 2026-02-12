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
            Dear <span class="highlight">${firstName} ${lastName}</span>,

            I am writing to you in hopes of being your most <span class="highlight">${adjOne}</span> and <span class="highlight">${adjTwo}</span> employee at the amazing <span class="highlight">${adjThree}</span> convenience store because I love to enjoy <span class="highlight">${verbIng}</span> and being surrounded by <span class="highlight">${pluralNoun}</span> at all times.
            
            I have many skills that can be useful to you, <span class="highlight">${skill}</span>, customer service, and the ability to fight off an <span class="highlight">${animal}</span> using only a <span class="highlight">${tool}</span>. I am extremely qualified to restock <span class="highlight">${food}</span> and can carry <span class="highlight">${number}</span> boxes at once. When customers are rude to me, I remain <span class="highlight">${emotion}</span> and simply <span class="highlight">${verbQuiet}</span> quietly in the snack aisle. When the store gets busy, I stay calm by remembering to <span class="highlight">${verbCalm}</span> and whisper “<span class="highlight">${sillyWord}</span>” under my breath for emotional support. If hired, I promise always to refill the coffee, protect the sacred supply of <span class="highlight">${beverage}</span>, and only cry in the freezer aisle when <span class="highlight">${celebrity}</span> visits unexpectedly.

            Thank you for considering my application, and I look forward to hearing from you soon!

            Best,
            <span class="highlight">${diffFirst} ${diffLast}</span>`;

       
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