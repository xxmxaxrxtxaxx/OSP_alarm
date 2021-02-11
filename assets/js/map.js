(function(){
  function init(){


 
      var mapOptions={
        zoom: 11,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }


      var map = new google.maps.Map(document.querySelector("#map"), mapOptions);
      var marker = new google.maps.Marker({
        position: centerMap,
        //icon: "/pin.png",
        label: "OSP"

      });
      marker.setMap(map);
      var m = new google.maps.Marker({
        position: ddd,
        //icon: "/pin.png",
        label: "ddff"

      });
      m.setMap(map);
  }
  google.maps.event.addDomListener(window, 'load', init);
})();