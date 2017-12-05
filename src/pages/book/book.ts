import { Component, ViewChild, ElementRef} from '@angular/core';
import { NavController ,IonicPage,Events} from 'ionic-angular';
import { ViewController } from 'ionic-angular';
import { ModalController } from 'ionic-angular';
import {LoadingController} from 'ionic-angular';
import {Http, Headers, RequestOptions} from '@angular/http';
import { Appsetting } from '../../providers/appsetting';
import { ToastController } from 'ionic-angular';

import { MapmodelPage } from '../mapmodel/mapmodel';
import { MapmodellPage } from '../mapmodell/mapmodell';
import { DatePipe } from '@angular/common';
import { CharterPage } from '../charter/charter';
import { StatusBar } from '@ionic-native/status-bar';


@Component({
  selector: 'page-book',
  templateUrl: 'book.html'
})

export class BookPage {
  aircode: any;
  code: any;
  info;minDate;
   public plat = '';
   public plong = '';
   public dlat = '';
   public dlong = '';
   public objectdata=Object.keys;
   
  dPipe = new DatePipe('en-US');

  public data:any={
    userid:'',
    service:'',
    date:'',
  //  booking:ride.value.password,
  add:'',
  dadd:'',
    time: '',
    p_add:'',
    drop_add:"",
    vehicle:'',
    psenger:'',
    luggage:'',
    child:'',
    code:'',
    airline:'',
    flight_num:'',
    flight_tim:"",
    meet_option:'',
    handicapped:'',
    eta:''
  }


  public plan;vehicallist;
  
  public Loading=this.loadingCtrl.create({
    content: 'Please wait...'
 
 
    
  });

  constructor(public navCtrl: NavController,
              public http:Http,
              public appsetting: Appsetting,
              public loadingCtrl:LoadingController,
              public events : Events,
              public modalCtrl: ModalController,
              private statusBar: StatusBar,
              public viewCtrl: ViewController,
              private toastCtrl: ToastController) {
                this.servicelist(),
                this.vehical()
                this.events.subscribe('tab-t0-2', (data)=>{
                  this.servicelist(),
                  this.vehical(),
                  this.airportcode()
                  this.statusBar.overlaysWebView(true);
                  this.reset()
                  // set status bar to white
                  this.statusBar.backgroundColorByHexString('#ffffff');
                 
               }) 
               

  }
  servicelist(){
    let headers = new Headers();
    headers.append('Content-Type',  'application/x-www-form-urlencoded;charset=utf-8');
    let options= new RequestOptions({ headers: headers });
    //var url:string = 'http://rakesh.crystalbiltech.com/bookride/api/services/servicelist';
    this.http.get(this.appsetting.myGlobalVar + 'services/servicelist',  options).map(res=>res.json()).subscribe(data=>{
      this.Loading.dismiss();
      if(data.status == 0){
        this.data = data;
        this.plan = data.data;
        

      }else{
        let toast = this.toastCtrl.create({
          message: data.msg,
          duration: 3000,
          position: 'middle'
        });
        toast.present();
         // alert(data.msg)
      }
            
          })

  }
  airportcode(){
    let headers = new Headers();
    headers.append('Content-Type',  'application/x-www-form-urlencoded;charset=utf-8');
    let options= new RequestOptions({ headers: headers });
    //var url:string = 'http://rakesh.crystalbiltech.com/bookride/api/airportcodes/airportcode';
    this.http.get(this.appsetting.myGlobalVar + 'airportcodes/airportcode',  options).map(res=>res.json()).subscribe(data=>{
      this.Loading.dismiss();
      if(data.status == 0){
        this.data = data;
        this.aircode = data.data;
        console.log(this.data)
        console.log(this.aircode)
  
      }else{
        let toast = this.toastCtrl.create({
          message: data.msg,
          duration: 3000,
          position: 'middle'
        });
        toast.present();
         // alert(data.msg)
      }
            
          })
  
  }
  ToastFunction(msg){
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'middle'
    });
    toast.present();
  }
  vehical(){
    this.minDate = this.dPipe.transform(new Date(), 'yyyy-MM-dd');
    console.log(this.minDate)
    let headers = new Headers();
    headers.append('Content-Type',  'application/x-www-form-urlencoded;charset=utf-8');
    let options= new RequestOptions({ headers: headers });
    //var url:string = 'http://rakesh.crystalbiltech.com/bookride/api/vehicles/vehicallist';
    this.http.get(this.appsetting.myGlobalVar + 'vehicles/vehicallist',  options).map(res=>res.json()).subscribe(data=>{
      this.Loading.dismiss();
      if(data.status == 0){
        this.data = data;
        this.vehicallist = data.data;

      }else{
        let toast = this.toastCtrl.create({
          message: data.msg,
          duration: 3000,
          position: 'middle'
        });
        toast.present();
         // alert(data.msg)
      }
            
          })
  }
  bookride(ride){
    console.log(this.minDate);
    let headers = new Headers();
    headers.append('Content-Type',  'application/x-www-form-urlencoded;charset=utf-8');
    let options= new RequestOptions({ headers: headers });
    //var url:string = 'http://rakesh.crystalbiltech.com/bookride/api/bookCabs/bookcab';
    var Userid = JSON.parse(localStorage.getItem("USERID"));
    console.log(Userid);
   console.log(ride.value);
    if(ride.value.services == undefined || ride.value.services == ""){
     // console.log(ride.value.services)
      this.ToastFunction("Please fill services");
    }else if(this.minDate == undefined || this.minDate == ""){
      this.ToastFunction("Please fill pickup date");
     // alert("Please fill date")
    }else if(ride.value.add == undefined || ride.value.add == ""){
      this.ToastFunction("Please fill pickup address");
    }else if(ride.value.time == undefined || ride.value.time == ""){
      this.ToastFunction("Please fill  pickup time");
    }else if(ride.value.dadd == undefined || ride.value.dadd == ""){
      this.ToastFunction("Please fill drop off address");
    }else if(ride.value.vehicaltype == undefined || ride.value.vehicaltype == ""){
      this.ToastFunction("Please fill vehicle type");
    }else if(ride.value.pass == undefined || ride.value.vehicaltype == ""){
      this.ToastFunction("Please fill Passengers");
    }
    // else if(ride.value.code == undefined || ride.value.code == ""){
    //   this.ToastFunction("Please fill code");
    // }
    // else if(ride.value.fnumber == undefined || ride.value.fnumber == ""){
    //   this.ToastFunction("Please fill flight number");
    // }
    // else if(ride.value.airline == undefined || ride.value.airline == ""){
    //   this.ToastFunction("Please fill airline");
    // }
    // else if(ride.value.moption == undefined || ride.value.moption == ""){
    //   this.ToastFunction("Please fill meet option");
    // }
    // else if(ride.value.eta == undefined || ride.value.eta == ""){
    //   this.ToastFunction("Please fill ETA");
    // }
    else if(ride.value.luggage == undefined || ride.value.luggage == ""){
      this.ToastFunction("Please fill luggage");
    }
   
    else{

   
      console.log(ride.value);
     var postdata = {
      userid:Userid,
      service:ride.value.services,
      pdate: this.minDate,
      dadd:ride.value.dadd,
      add:ride.value.add,
      ptime: ride.value.time,
      p_add:ride.value.add,
      drop_add:ride.value.dadd,
      vehicle:ride.value.vehicaltype,
      psenger:ride.value.pass,
      luggage:ride.value.luggage,
      child:ride.value.child,
      code:ride.value.code,
      airline:ride.value.airline,
      flight_num:ride.value.fnumber,
      meet_option:ride.value.moption,
      handicapped:ride.value.handicap,
      eta:ride.value.eta,
      lat:this.plat,
      long:this.plong,
      d_lat:this.dlat,
      d_long:this.dlong
    }
    console.log(postdata)
    var serialized = this.serializeObj(postdata);
    this.http.post(this.appsetting.myGlobalVar + 'BookCabs/bookcab', serialized, options).map(res => res.json()).subscribe(dataa => {
      this.Loading.dismiss();
      if(dataa.status  == 0){
        localStorage.setItem('hit',"0");
       
        this.info = dataa;
        this.ToastFunction(dataa.msg);
       
        this.navCtrl.push(CharterPage);
        this.events.publish('tab-t0-3')
       // alert(dataa.msg)
      }else{
        this.ToastFunction(dataa.msg);

      }
		

		})
  }
  }
 reset(){
   
  this.data={
    userid:'',
    services:'',
    date:'',
  //  booking:ride.value.password,
   add:'',
   dadd:'',
    time: '',
    vehicaltype:'',
    pass:'',
    luggage:'',
    child:'',
    code:'',
    airline:'',
    fnumber:'',
    flight_tim:"",
    moption:'',
    handicap:false,
    eta:''
  }
  console.log(this.data)
 }


  serializeObj(obj) {
    var result = [];
    for (var property in obj)
      result.push(encodeURIComponent(property) + "=" + encodeURIComponent(obj[property]));
    return result.join("&");
  }


  openModal() {
    let myModal = this.modalCtrl.create(MapmodelPage);
    myModal.onDidDismiss(data => {
    this.data.add=data.address;
    console.log(data.lat)
    console.log(data.long)
    this.plat = data.lat
    this.plong = data.long

  });
    myModal.present();
  }
  openModall() {
    let myModal = this.modalCtrl.create(MapmodellPage);
    myModal.onDidDismiss(data => { 
    this.data.dadd=data.address;
    console.log(this.data.dadd)
    console.log(data.lati)
    console.log(data.longi)
    this.dlat = data.lati
    this.dlong = data.longi
  });
    myModal.present();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ForgotPage');
    console.log('rahul');
    console.log(window.navigator.onLine);
    if (window.navigator.onLine == true) {
     // alert('Network connection');
    } else {
      //alert('Network connection failed');
     // alert('Network connection failed');
      let toast = this.toastCtrl.create({
        message: 'Network connection failed',
        duration: 3000,
        position: 'middle'
      });
      toast.present();
  }
}



charterPage(){
  this.navCtrl.push(CharterPage);
  //this.app.getRootNav().setRoot(MembershipplanePage);
}
}
