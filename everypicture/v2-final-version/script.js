(function(){
    'use script';
    console.log('running js');

    var button = document.getElementById('openJar');
    var openJar = document.getElementById('jar');
    var collectionPhotos = document.getElementById('collection');

    button.addEventListener("click", function(event){
        openJar.src = "images/memory-jar-open.png";

        var jarItems = [
            "images/grad-night-tickets-removebg-preview.png","images/kadal-tahaw-cards-removebg-preview.png",
            "images/kcon-wrist-bands-removebg-preview.png",
            "images/mk-reflection-cards-removebg-preview.png",
            "images/malakas-maganda-bracelet.png"
        ];

        for (var i = 0; i<jarItems.length; i++){
            var img = document.createElement("img");
            img.src = jarItems[i];
            collectionPhotos.appendChild(img);
        }
    });

}());