(function(){
  function init(){
    var centerMap=new google.maps.LatLng(53.45275691550154, 17.124603872327434);
    var ddd=new google.maps.LatLng(53.45043554294898, 17.092494321306425);

 
      var mapOptions={
        center: centerMap,
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