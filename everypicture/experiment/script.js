(function(){
    "use strict"

    console.log('running js');

    const container = document.querySelector('#container');
    const hotSpots = document.querySelectorAll('#container div');
    const theImg  = document.querySelector('#container img');

    hotSpots.forEach(function (eachSpot){

        eachSpot.addEventListener('mouseover', zoomPhoto);
        eachSpot.addEventListener('mouseout', function(){
            theImg.className = 'start';

        });

    });

    function zoomPhoto(event){

        const thisCorner = event.target.id;
        console.log(thisCorner);
        
        switch (thisCorner){
            case 'topleft': theImg.className = 'topleft'; break;
            case 'topright': theImg.className = 'topright'; break;
            case 'bottomleft': theImg.className = 'bottomleft'; break;
            case 'bottomright': theImg.className = 'bottomright'; break;
            case 'center': theImg.className = 'center'; break;

        }
    }

}());