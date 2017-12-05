import { Component,ViewChild, ElementRef, OnInit} from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import 'rxjs/add/operator/map';
import {Http, Headers, RequestOptions} from '@angular/http';
import { Appsetting } from '../../providers/appsetting';
import { ToastController } from 'ionic-angular';
import { LaunchNavigator, LaunchNavigatorOptions } from '@ionic-native/launch-navigator';
import { ActionSheetController } from 'ionic-angular'
import { CharterPage } from '../charter/charter';
import { MomentModule } from 'angular2-moment'; 
import * as moment from 'moment';
/**
 * Generated class for the BookdetailsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-bookdetails',
  templateUrl: 'bookdetails.html',
})
export class BookdetailsPage {

  public data = '';
  longitude: any;
  latitude;
  moment: any;ptime;
  directionservice; directionsDisplay;
  
  map: any;
  @ViewChild('map') mapElement: ElementRef;
  bookid: any;dropoff_address;airport_code = null;date;vehicle;psenger_count;luggage_count;
  updata;pickup_address;flight_number = null;airline = null;status;
  public plat: any; 
  public plong: any;
  public dlat: any; 
  public dlong: any;
  boostat;
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public http:Http,
              public places: ElementRef,
              public appsetting: Appsetting,
              private toastCtrl: ToastController,
              private launchNavigator: LaunchNavigator,
              public actionSheetCtrl: ActionSheetController,
              public loadingCtrl:LoadingController) {
                //this.plat = null;
                this.bookingdetail();
              //  this.googlemap();
              this.bookid = this.navParams.get('bookid');
              if(this.navParams.get('bookstatus')){
                this.boostat = this.navParams.get('bookstatus');
              }
              
              console.log(this.bookid)
  }


  ngOnInit() {
    this.directionservice = new google.maps.DirectionsService();    
    this.directionsDisplay = new google.maps.DirectionsRenderer();
	      
    }

  bookingdetail(){
    this.bookid = this.navParams.get('bookid');
    console.log(this.bookid)
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
    let options = new RequestOptions({ headers: headers });
    var userid = localStorage.getItem("USERID")
    var postdata = {
        user_id:userid,
        bookid: this.bookid
    };
    console.log(postdata);
    var serialized = this.serializeObj(postdata);
    let Loading = this.loadingCtrl.create({
      content: 'Please wait...'
    })
    Loading.present().then(()=>{
    this.http.post(this.appsetting.myGlobalVar + 'bookCabs/bookingdetails', serialized, options).map(res => res.json()).subscribe(data => {
      Loading.dismiss();
      console.log(data)
      if(data.status == 1){
       
        this.updata = data.data.BookCab;
        var d = moment(this.updata.pickup_date).format('YYYY-MM-DD');
        this.date = d;
        console.log(this.date)
        console.log(this.updata.airline)
        if(this.updata.airline != "undefined" ){
          if(this.updata.airline != ""){
            this.airline = this.updata.airline;
          }else{
            this.airline = 1;
          }  
        }else{
          this.airline = 1;
        }
       
        if(this.updata.airport_code != "undefined"){
        if(this.updata.airport_code != ""){
         
          this.airport_code = this.updata.airport_code;
          }else{
            this.airport_code = 1;
          }
        }else{
          this.airport_code = 1;
        }
        if(this.updata.flight_number != "undefined" ){
          if(this.updata.flight_number != ""){
            this.flight_number =this.updata.flight_number;
          }else{
            this.flight_number = 1;
          }
         }else{
          this.flight_number = 1;
        }
        this.ptime = this.updata.pickup_time;
        console.log(this.ptime)
        this.dropoff_address = this.updata.dropoff_address;
        this.pickup_address = this.updata.pickup_address ;
        this.plat = this.updata.pick_lat;
        this.plong = this.updata.pick_long;
        this.dlat = this.updata.drop_lat;
        this.dlong = this.updata.drop_long;
        this.vehicle = this.updata.vehicle_type;  
        this.psenger_count = this.updata.psenger_count; 
        this.luggage_count = this.updata.luggage_count;
        this.status = this.updata.status;

        console.log(this.plat);
        console.log(this.plong);
        this.googlemap(this.plat,this.plong);
      }else{
        let toast = this.toastCtrl.create({
          message: data.msg,
          duration: 3000,
          position: 'middle'
        });
        toast.present();
       

      }
  
  
    })
  });
  }
  
  canclebooking(){
    this.bookid = this.navParams.get('bookid');
    console.log(this.bookid)
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
    let options = new RequestOptions({ headers: headers });
    var userid = localStorage.getItem("USERID")
    var postdata = {
         id: this.bookid
    };
    console.log(postdata);
    var serialized = this.serializeObj(postdata);
    let Loading = this.loadingCtrl.create({
      content: 'Please wait...'
    })
    Loading.present().then(()=>{
    this.http.post(this.appsetting.myGlobalVar + 'BookCabs/canclebooking', serialized, options).map(res => res.json()).subscribe(dataa => {
      Loading.dismiss();
      console.log(dataa)
      if(dataa.isSucess == true){
        let toast = this.toastCtrl.create({
          message: dataa.msg,
          duration: 3000,
          position: 'middle'
        });
        toast.present();
        this.navCtrl.push(CharterPage);
      }else{
        let toast = this.toastCtrl.create({
          message: dataa.msg,
          duration: 3000,
          position: 'middle'
        });
        toast.present();
        
      }
    
  
    })
  });
  }
    removebooking(){
    this.bookid = this.navParams.get('bookid');
    console.log(this.bookid)
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
    let options = new RequestOptions({ headers: headers });
    var userid = localStorage.getItem("USERID")
    var postdata = {
         id: this.bookid
    };
    console.log(postdata);
    var serialized = this.serializeObj(postdata);
    let Loading = this.loadingCtrl.create({
      content: 'Please wait...'
    })
    Loading.present().then(()=>{
    this.http.post(this.appsetting.myGlobalVar + 'BookCabs/removebooking', serialized, options).map(res => res.json()).subscribe(dataa => {
      Loading.dismiss();
      console.log(dataa)
      if(dataa.isSucess == true){
        let toast = this.toastCtrl.create({
          message: dataa.msg,
          duration: 3000,
          position: 'middle'
        });
        toast.present();
        this.navCtrl.push(CharterPage);
      }else{
        let toast = this.toastCtrl.create({
          message: dataa.msg,
          duration: 3000,
          position: 'middle'
        });
        toast.present();
        
      }
    
  
    })
  });
  }

  presentActionSheet() {
    if(this.boostat == 'upcoming'){
      let actionSheet = this.actionSheetCtrl.create({
        title: 'Are you sure want to cancel booking',
        buttons: [
          {
            text: 'Cancel Booking',
            role: 'remove',
            handler: () => {
              this.canclebooking()
              console.log('remove clicked');
            }
          },
  
          {
            text: 'Close',
            role: 'cancel',
            handler: () => {
              console.log('Cancel clicked');
            }
          }
        ]
      });
      actionSheet.present();
    }else{
      let actionSheet = this.actionSheetCtrl.create({
        title: 'Are you sure you want delete it?',
        buttons: [
          {
            text: 'Remove Booking',
            role: 'remove',
            handler: () => {
              this.removebooking()
              
              console.log('remove clicked');
            }
          },
  
          {
            text: 'Close',
            role: 'cancel',
            handler: () => {
              console.log('Cancel clicked');
            }
          }
        ]
      });
      actionSheet.present();
    }


  
  }
  googlemap(lat,long){

console.log(lat+':'+long);
console.log(this.dlat+':'+this.dlong);
    let latLng = new google.maps.LatLng(this.plat, this.plong); 
    
        let mapOptions = {
          center: latLng,
          zoom: 15,
          mapTypeId: google.maps.MapTypeId.ROADMAP
          }; 
          this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions) //new google.maps.Map(this.mapElement.nativeElement, mapOptions);
           var marker = new google.maps.Marker({
           position: latLng,
           draggable: true,
           map: this.map,
         });
    
         var start = new google.maps.LatLng(this.plat, this.plong);
         //var end = new google.maps.LatLng(38.334818, -181.884886);
         var end = new google.maps.LatLng(this.dlat, this.dlong);
         console.log(end);
         var bounds = new google.maps.LatLngBounds();
         bounds.extend(start);
         bounds.extend(end);
         this.map.fitBounds(bounds);

         var request = {
          origin: start,
          destination: end,
          travelMode: google.maps.TravelMode.DRIVING
      };
      this.directionservice.route(request, ((response, status)=>{
        if (status == google.maps.DirectionsStatus.OK) {
              this.directionsDisplay.setDirections(response);
              this.directionsDisplay.setMap(this.map);
            } else {
               // alert("Directions Request from " + start.toUrlValue(6) + " to " + end.toUrlValue(6) + " failed: " + status);
            }
            
      }) )



      // function (response, status) {
      //   if (status == google.maps.DirectionsStatus.OK) {
      //     this.directionsDisplay.setDirections(response);
      //     this.directionsDisplay.setMap(this.map);
      //   } else {
      //       alert("Directions Request from " + start.toUrlValue(6) + " to " + end.toUrlValue(6) + " failed: " + status);
      //   }

      // });


    // alert("bhumika")
    // let options: LaunchNavigatorOptions = {
    //   start: 'London, ON',
    // //  app: LaunchNavigator.APPS.UBER
    // };
    
    // this.launchNavigator.navigate('Toronto, ON', options)
    //   .then(
    //     success => console.log('Launched navigator'),
    //     error => console.log('Error launching navigator', error)
    //   );

  }
    // alert(this.latitude+'/'+this.longitude);
   //  }).catch((error) => {
   //  console.log('Error getting location', error);
    // alert(error)
   //  let toast = aa.toastCtrl.create({
   //  message: 'Please on your location',
   //  duration: 3000,
   //  cssClass: 'toastCss',
   //  position: 'bottom',
   //  });
   //  toast.present();
   //  this.diagnostic.switchToLocationSettings();

  serializeObj(obj) {
    var result = [];
    for (var property in obj)
      result.push(encodeURIComponent(property) + "=" + encodeURIComponent(obj[property]));
  
    return result.join("&");
  }
  ionViewDidLoad() {
  // this.googlemap();
    console.log('ionViewDidLoad BookdetailsPage');
  }
  charterPage(){
    this.navCtrl.push(CharterPage);
  }
}
