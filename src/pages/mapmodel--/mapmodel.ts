import { Component,ViewChild, ElementRef } from '@angular/core';
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
  lat;long;
  public currentLatitude : any;
  public currentLongitude : any;

  autocompleteItems: any;
  autocomplete: any;
  acService:any;
  placesService: any;
  
  @ViewChild('map') mapElement: ElementRef;
  map: any;
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
    this.geolocation.getCurrentPosition().then((resp) => {
      this.lat =  resp.coords.latitude
      this.long = resp.coords.longitude
      
     // alert(resp.coords.latitude);
       //alert(resp.coords.longitude);
       let latLng = new google.maps.LatLng(this.lat,this.long); 
       
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
   // alert(this.currentLatitude)
   // alert(this.currentLongitude)
      headers.append('Content-Type', 'application/json');
      let options = new RequestOptions({ headers: headers });
      this.http.post('https://maps.googleapis.com/maps/api/geocode/json?latlng=' + this.currentLatitude + ',' + this.currentLongitude + '&key=AIzaSyAXGlAGu65KTW7YFB5MD46b2ndwwQo9Ivk', options).map(res => res.json()).subscribe(data => {
        console.log(data);
      //  alert(data);
       // alert(JSON.stringify(data));
       // console.log(data.results);
        this.data.myInput=data.results[0].formatted_address;
})
   }));
     }).catch((error) => {
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
    this.viewCtrl.dismiss(this.data.myInput);
  }



  ngOnInit() {
    this.acService = new google.maps.places.AutocompleteService();        
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
      let self = this; 
      let config = { 
      //types:  ['geocode'], // other types available in the API: 'establishment', 'regions', and 'cities'
      input: this.autocomplete.query, 
      componentRestrictions: {  } 
      }
      this.acService.getPlacePredictions(config, function (predictions, status) {
      console.log('modal > getPlacePredictions > status > ', status);
      self.autocompleteItems = [];            
      predictions.forEach(function (prediction) {   
        console.log("rufh")           
      self.autocompleteItems.push(prediction);
      });
      });
      }
      

}
