import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,Events } from 'ionic-angular';
import 'rxjs/add/operator/map';
import {LoadingController} from 'ionic-angular';
import {Http, Headers, RequestOptions} from '@angular/http';
import { Appsetting } from '../../providers/appsetting';
import { ToastController } from 'ionic-angular';
import { BookdetailsPage } from '../bookdetails/bookdetails';
import { BookPage } from '../book/book';
import { AlertController } from 'ionic-angular';
/**
 * Generated class for the CharterPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-charter',
  templateUrl: 'charter.html',
})
export class CharterPage {
  public select = 1;iid;
  updata;pastdata; 
  public bookingid  = ''
  bitstatus = '';
  segments:any ='team';
  // doRefresh(refresher) {
  //   console.log('Begin async operation', refresher);
  //   this.upcoming();
  //   this.past()
    
  //   setTimeout(() => {
  //     console.log('Async operation has ended');
  //     refresher.complete();
  //   }, 2000);
  // }
  public Loading = this.loadingCtrl.create({
    content: 'Please wait...'
  })
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public http:Http,
              public appsetting: Appsetting,
              public events : Events,
              public alertCtrl: AlertController,
              private toastCtrl: ToastController,
              public loadingCtrl:LoadingController) {
               
               
              this.events.subscribe('tab-t0-3', (data)=>{
               this.upcomingg()
               //this.past()
             
               this.segments = "team";
            }) 
          
  }
upcomingg(){
  //alert('upcoming');
 // this.select=1;
  let headers = new Headers();
  headers.append('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
  let options = new RequestOptions({ headers: headers });
  var userid = localStorage.getItem("USERID")
  var postdata = {
    user_id: userid
  };
  console.log(postdata);
  var serialized = this.serializeObj(postdata);
  let Loading = this.loadingCtrl.create({
    content: 'Please wait...'
  })
  Loading.present().then(()=>{
  this.http.post(this.appsetting.myGlobalVar + 'BookCabs/upcomingbooking', serialized, options).map(res => res.json()).subscribe(data => {
    Loading.dismiss();
    console.log(data)
    if(data.status == 0){
   //   alert("if")
   this.bitstatus = 'upcoming';
      this.updata = data.data
      console.log(this.updata)
    }else{
     // alert("else")
      let toast = this.toastCtrl.create({
        message: data.msg,
        duration: 3000,
        position: 'middle'
      });
      toast.present();
     
    }
  

  },err=>{

  })
});
}

past(){
  this.select=0;
  let headers = new Headers();
  headers.append('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
  let options = new RequestOptions({ headers: headers });
  var userid = localStorage.getItem("USERID")
  var postdata = {
    user_id: userid
  };
  console.log("vikki");
  console.log(postdata);
  var serialized = this.serializeObj(postdata);
  let Loading = this.loadingCtrl.create({
    content: 'Please wait...'
  })
  Loading.present().then(()=>{
  this.http.post(this.appsetting.myGlobalVar + 'BookCabs/pastbooking', serialized, options).map(res => res.json()).subscribe(dataa => {
    Loading.dismiss();
    console.log("hello");
    console.log(dataa)
    if(dataa.status == 0){
      this.bitstatus = 'past';
      this.pastdata = dataa.data
      console.log(this.pastdata)
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
  //alert(id)
  let headers = new Headers();
  headers.append('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
  let options = new RequestOptions({ headers: headers });
  var userid = localStorage.getItem("USERID")
  var postdata = {
       id: this.iid
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
      this.upcomingg();
for(let i in this.updata){
console.log(this.updata[i])
if(parseInt(this.updata[i].BookCab.id)==parseInt(this.iid))
{
  this.updata.splice(i, 1);
}



}

      let toast = this.toastCtrl.create({
        message: dataa.msg,
        duration: 3000,
        position: 'middle'
      });
      toast.present();
      
    }else{
      this.upcomingg();
      let toast = this.toastCtrl.create({
        message: dataa.msg,
        duration: 3000,
        position: 'middle'
      });
      toast.present();
      
    }
  
  })
  })

}
serializeObj(obj) {
  var result = [];
  for (var property in obj)
    result.push(encodeURIComponent(property) + "=" + encodeURIComponent(obj[property]));

  return result.join("&");
}

ionViewDidLoad() {
  this.upcomingg()
  console.log('ionViewDidLoad ProfilePage');
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

bookdetailsPage(id){
 
  this.bookingid = id;
  this.navCtrl.push(BookdetailsPage, { bookid: id,bookstatus:this.bitstatus});
  
}




showConfirm(id) {
  this.iid=id;
  let confirm = this.alertCtrl.create({
    title: 'Delete Booking',
    message: 'Are you sure you want delete it?',
    buttons: [
      {
        text: 'Disagree',
        handler: () => {
          console.log('Disagree clicked');
        }
      },
      {
        text: 'Agree',
        handler: () => {
          console.log('Agree clicked');
          this.removebooking()
        }
      }
    ]
  });
  confirm.present();
}

cleanvalue(){
 
  this.navCtrl.push(BookPage);
}

}
