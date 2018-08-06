import { Component,ViewChild, ElementRef, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ViewController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { Http, Headers, RequestOptions } from '@angular/http';
import {googlemaps} from 'googlemaps';

declare var google; 
/**
 * Generated class for the MapmodelPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-mapmodel',
  templateUrl: 'mapmodel.html',
})
export class MapmodelPage {
  infowindow: any;
  lat; long;
  public currentLatitude : any;
  public currentLongitude : any;

  autocompleteItems: any;
  autocomplete: any;
  acService:any;
  placesService: any;
  
  @ViewChild('map') mapElement: ElementRef;
  map: any;
  geocoder: any;
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public http: Http,
              public viewCtrl: ViewController,
              public places: ElementRef,
              private geolocation: Geolocation,) {
                this. getlocation()
  }
  public data={
    myInput: '',
  }
  getlocation(){
    let headers = new Headers();
  //  headers.append('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
   // let options = new RequestOptions({ headers: headers });
    
   
    var aa = this;
	 headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: headers });
    this.geolocation.getCurrentPosition().then((resp) => {
    this.currentLatitude =  resp.coords.latitude
    this.currentLongitude = resp.coords.longitude
    console.log(this.currentLatitude)
    console.log( this.currentLongitude)
     /*  this.http.post('https://maps.googleapis.com/maps/api/geocode/json?latlng=' + this.lat + ',' + this.long+ '&key=AIzaSyAXGlAGu65KTW7YFB5MD46b2ndwwQo9Ivk', options).map(res => res.json()).subscribe(data => {
        console.log(data);
      //  alert(data);
       // alert(JSON.stringify(data));
       // console.log(data.results);
        this.autocomplete.query=data.results[0].formatted_address;
}) */
     // alert(resp.coords.latitude);
       //alert(resp.coords.longitude);
       let latLng = new google.maps.LatLng(this.currentLatitude,this.currentLongitude); 
       
	   
	  this.geocoder.geocode({'latLng': latLng}, ((results, status)=>{
		if (status == google.maps.GeocoderStatus.OK) {
    if (results[1]) {
    this.autocomplete.query= results[1].formatted_address;
                    }
                }
		   
	   })
	   )
	   
	   
	   
	   
        let mapOptions = {
        center: latLng,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
        }; 
        this.map = new google.maps.Map(aa.mapElement.nativeElement, mapOptions);
         var marker = new google.maps.Marker({
         position: latLng,
         draggable: true,
         map: this.map,
       });
      
     google.maps.event.addListener(marker, 'dragend', ((marker)=>{
      var latLng = marker.latLng; 
      this.currentLatitude = latLng.lat();
      this.currentLongitude = latLng.lng();
     console.log(this.currentLatitude)
     console.log(this.currentLongitude)
     let latLong = new google.maps.LatLng(this.currentLatitude,this.currentLongitude); 
	  this.geocoder.geocode({'latLng': latLong}, ((results, status)=>{
		  console.log(results);
		   if (status == google.maps.GeocoderStatus.OK) {
          if (results[1]) {
              this.autocomplete.query= results[1].formatted_address;
           
                    }
                }
		   
	   })
	   )

	 
	 
      // this.http.post('https://maps.googleapis.com/maps/api/geocode/json?latlng=' + this.currentLatitude + ',' + this.currentLongitude + '&key=AIzaSyAXGlAGu65KTW7YFB5MD46b2ndwwQo9Ivk', options).map(res => res.json()).subscribe(data => {
        // console.log(data);
      /*  alert(data);
       alert(JSON.stringify(data));
       console.log(data.results); */
        // this.autocomplete.query=data.results[0].formatted_address;
// })
   }));
     }).catch((error) => {
   
      let latLng = new google.maps.LatLng(36.778259,-119.417931); 
      this.geocoder.geocode({'latLng': latLng}, ((results, status)=>{
        if (status == google.maps.GeocoderStatus.OK) {
        if (results[1]) {
        this.autocomplete.query= results[1].formatted_address;
                        }
                    }
           
         })
         )
         
         
         
         
            let mapOptions = {
            center: latLng,
            zoom: 15,
            mapTypeId: google.maps.MapTypeId.ROADMAP
            }; 
            this.map = new google.maps.Map(aa.mapElement.nativeElement, mapOptions);
             var marker = new google.maps.Marker({
             position: latLng,
             draggable: true,
             map: this.map,
           });
           google.maps.event.addListener(marker, 'dragend', ((marker)=>{
            var latLng = marker.latLng; 
            this.currentLatitude = latLng.lat();
            this.currentLongitude = latLng.lng();
           console.log(this.currentLatitude)
           console.log(this.currentLongitude)
           let latLong = new google.maps.LatLng(this.currentLatitude,this.currentLongitude); 
          this.geocoder.geocode({'latLng': latLong}, ((results, status)=>{
            console.log(results);
             if (status == google.maps.GeocoderStatus.OK) {
                if (results[1]) {
                    this.autocomplete.query= results[1].formatted_address;
                    console.log("srishti")
                    console.log( this.autocomplete.query)
                          }
                      }
             
           })
           )
            // this.http.post('https://maps.googleapis.com/maps/api/geocode/json?latlng=' + this.currentLatitude + ',' + this.currentLongitude + '&key=AIzaSyAXGlAGu65KTW7YFB5MD46b2ndwwQo9Ivk', options).map(res => res.json()).subscribe(data => {
              // console.log(data);
            /*  alert(data);
             alert(JSON.stringify(data));
             console.log(data.results); */
              // this.autocomplete.query=data.results[0].formatted_address;
      // })
         }));
       console.log('Error getting location', error);
     });
     
     let watch = this.geolocation.watchPosition();
     watch.subscribe((data) => {
      // data can be a set of coordinates, or an error (if an error occurred).
      // data.coords.latitude
      // data.coords.longitude
     });
   }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MapmodelPage');
  }



  closeModal() {
    console.log(this.autocomplete.query)
    this.viewCtrl.dismiss({
      address:this.autocomplete.query,
      lat: this.currentLatitude,
      long:this.currentLongitude
    });

  }
clsmodel(){
  this.viewCtrl.dismiss();
}
  

  ngOnInit() {
    this.acService = new google.maps.places.AutocompleteService();    
  this.geocoder= new google.maps.Geocoder();
 this.infowindow = new google.maps.InfoWindow;
    this.autocompleteItems = [];
    this.autocomplete = {
    query: ''
    };        
    }

    updateSearch() {
      console.log('modal > updateSearch');
      if (this.autocomplete.query == '') {
      this.autocompleteItems = [];
      return;
      }
      //let self = this; 
      let config = { 
      //types:  ['geocode'], // other types available in the API: 'establishment', 'regions', and 'cities'
      input: this.autocomplete.query, 
      componentRestrictions: {  } 
      }
      this.acService.getPlacePredictions(config, ((predictions, status)=> {
      console.log('modal > getPlacePredictions > status > ', status);
      this.autocompleteItems = [];   
      console.log(predictions)         
      predictions.forEach(((prediction)=> {   
        console.log("rufh")           
      this.autocompleteItems.push(prediction);
      })
    );
      })
    );
      }
      chooseItem(item){
        console.log(item)
        this.autocomplete.query=item.description;
       // place_id

        this.geocoder.geocode({'placeId': item.place_id}, ((results, status)=>{
          if (status === 'OK') {
            if (results[0]) {
              console.log(results[0])

              this.map.setZoom(11);
              this.map.setCenter(results[0].geometry.location);
              this.currentLatitude = results[0].geometry.location.lat();
              this.currentLongitude = results[0].geometry.location.lng();
              var marker = new google.maps.Marker({
                map: this.map,
                position: results[0].geometry.location
              });
              this.infowindow.setContent(results[0].formatted_address);
              this.infowindow.open(this.map, marker);
            }
          }
        }))               


        this.autocompleteItems = [];
      }

}
