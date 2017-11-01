function initMap() {
    var barselona = {lat: 41.3759, lng: 2.2381};
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 3,
      center: barselona
    });
    var marker = new google.maps.Marker({
        position: barselona,
        icon: "./assets/img/map_marker.png",
        animation: google.maps.Animation.BOUNCE,
        map: map,
        draggable:true,
        title:"Drag me!"
    });
  }