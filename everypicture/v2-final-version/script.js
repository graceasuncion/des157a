(function(){
    'use script';
    console.log('running js');

    var button = document.getElementById('openJar');
    var openJar = document.getElementById('jar');
    var collectionPhotos = document.getElementById('collection');

    

    button.addEventListener("click", function(event){
        
        button.style.display = "none";

        openJar.src = "images/memory-jar-open.png";

        var jarItems = [
            "images/grad-night-tickets-removebg-preview.png","images/kadal-tahaw-cards-removebg-preview.png",
            "images/kcon-wrist-bands-removebg-preview.png",
            "images/mk-reflection-cards-removebg-preview.png",
            "images/malakas-maganda-bracelet.png"
        ];

        var angles = [ -90, -45, 0, 45, 90 ];

        collectionPhotos.innerHTML = "";

        var radius = 200;

        for (var i = 0; i< jarItems.length; i++){
            var img = document.createElement("img");
            img.src = jarItems[i];

            img.style.position = "absolute";
            img.style.top = "50%";
            img.style.left = "50%";

            img.style.transform = `translate(-50%, -50%) rotate(${angles[i]}deg) translate(0, -${radius}px) rotate(${-angles[i]}deg)`;

            collectionPhotos.appendChild(img);
        }
    });

}());