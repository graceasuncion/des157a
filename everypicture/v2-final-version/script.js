(function(){
    'use script';
    console.log('running js');

    const button = document.getElementById('openJar');
    const openJar = document.getElementById('jar');
    const collectionPhotos = document.getElementById('collection');

    const overlay = document.getElementById("popupOverlay"); 

    overlay.addEventListener("click",function(event){

        if(event.target == overlay){
            overlay.style.display = "none";
        }
    });


    button.addEventListener("click", function(event){
        
        button.style.display = "none";

        openJar.src = "images/memory-jar-open.png";

        var jarItems = [

            "images/kcon-wrist-bands-removebg-preview.png",
            "images/malakas-maganda-bracelet.png",
            "images/kadal-tahaw-cards-removebg-preview.png",
            "images/mk-reflection-cards-removebg-preview.png",
            "images/grad-night-tickets-removebg-preview.png",
            
        ];

        var itemDescriptions = [

        `<h2>My Wristbands from KCon 2023!</h2>
        <p>KCon 2023 was the first-ever KCon that I’ve been to! KCON is the largest fan and artist festival dedicated to K-Pop and Korean culture. During the day, it would be a convention with panels, workshops, and booths, and at night, a concert hosted by M Countdown, one of South Korea’s major music programs. These wristbands gave access to both the convention floor and the concert for that day.</p>
        <p>Going to KCon was my first experience attending a convention with friends, and it was so fun. During the convention, we got to see K-pop groups walking around and performing, and we picked up free items from different booths. Honestly, the concert portion was the most exciting part! Our seats for both nights were really close to the stage, and I was able to see many of my favorite groups perform in person.</p>
        `,

    `
        <h2>Oh, that’s my Malakas Maganda Friendship Bracelet</h2>
        <p>During my 2nd year, I participated in Philippine Culture Night (PCN) 36! It’s a showcase of Filipino culture at UC Davis through theatre, traditional dances, and modern aspects. One of the dances I joined was Malakas at Maganda, directed by one of my good friends. The dance tells the Filipino myth of how the Philippine islands came to be. There were many moving parts in this dance, and I was a tree.</p>
        <p>Before Heaven (Hell) Week for PCN, our director made friendship bracelets for everyone in the dance—over 20 bracelets! Since I was a tree, mine had a tree pun, which is why it says “Gracedar.” This bracelet is very special to me because I had never danced a Filipino traditional dance before, and receiving something that represented that achievement meant a lot.</p>
        `,

    `
        <h2>Mga Kapatid Board Reflection Cards</h2>
        <p>During my 3rd year, I was on board for UC Davis’s Filipinx-American organization, Mga Kapatid. My role was Public Relations Chair, where I handled social media marketing and media for the organization. During our first retreat, we did an activity answering questions about what we hoped to accomplish during our time on board.</p>
        <p>I remember writing about wanting to feel proud of what I created for the community, which is the card written in pink right there. These reflection cards remind me of the intentions and goals I set for myself that year.</p>
        `,

        `
        <h2>Messages from the Kadal Tahaw Directors for PCN 37</h2>
        <p>During my 3rd year, I participated in Philippine Culture Night 37 and danced Kadal Tahaw. This traditional dance represents a bird that mimics the hopping and movements of the Tahaw bird. These items are thank‑you notes from the two directors of the dance.</p>
        <p>There weren’t many of us in this dance, so we became a very close-knit group. We even referred to ourselves as “Flock,” like a small family of birds. These messages remind me of the community and connection we built together.</p>
        `,

        `
        <h2>Grad Night Disneyland Tickets</h2>
        <p>For my high school’s grad night, we went to Disneyland and Disney’s California Adventure for the entire day. It was so much fun celebrating graduation and spending the day with my friends at the time.</p>
        <p>These tickets remind me of that excitement, the rides, the photos, and the feeling of closing one chapter and stepping into a new one.</p>
        `
        ];


        var angles = [ -90, -45, 0, 45, 90 ];
        var radius = 200;

        collectionPhotos.innerHTML = "";

        for (var i = 0; i< jarItems.length; i++){
            var img = document.createElement("img");
            img.src = jarItems[i];

            img.style.position = "absolute";
            img.style.top = "50%";
            img.style.left = "50%";

            img.style.transform = `translate(-50%, -50%) rotate(${angles[i]}deg) translate(0, -${radius}px) rotate(${-angles[i]}deg)`;

            img.dataset.index = i;

            img.addEventListener("click",function(){
                var index = this.dataset.index;

                document.getElementById("popupImage").src = jarItems[index]; 
                document.getElementById("popupText").innerHTML = itemDescriptions[index]; 
                
                overlay.style.display = "flex";

            });

            collectionPhotos.appendChild(img);
        }
    });

}());