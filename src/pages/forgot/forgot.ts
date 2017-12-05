import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import 'rxjs/add/operator/map';
import {LoadingController} from 'ionic-angular';
import {Http, Headers, RequestOptions} from '@angular/http';
import { Appsetting } from '../../providers/appsetting';
import { SigninPage } from '../signin/signin';
import { ToastController } from 'ionic-angular';


/**
 * Generated class for the SigninPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-forgot',
  templateUrl: 'forgot.html',
})
export class ForgotPage {
public data = '';

public Loading=this.loadingCtrl.create({
    content: 'Please wait...'
    
  });
  constructor(public navCtrl: NavController,
   public navParams: NavParams,
   public http:Http,
   public appsetting: Appsetting,
   public loadingCtrl:LoadingController,
   private toastCtrl: ToastController) {
  }
forgot(form){
let headers = new Headers();
headers.append('Content-Type',  'application/x-www-form-urlencoded;charset=utf-8');
let options= new RequestOptions({ headers: headers });
//var url:string = 'http://rakesh.crystalbiltech.com/bookride/api/users/forgetpwd';
 var data ={
  username:form.value.email,
}
 var Serialized = this.serializeObj(data);
console.log(data);
  this.http.post(this.appsetting.myGlobalVar + 'users/forgetpwd', Serialized, options).map(res=>res.json()).subscribe(data=>{
this.Loading.dismiss();
if(data.isSucess == "true"){
 this.data = data;
   console.log(this.data);
   localStorage.clear();
   let toast = this.toastCtrl.create({
    message: data.msg,
    duration: 3000,
    position: 'middle'
  });
  toast.present();
   //alert(data.msg);
   
   this.navCtrl.push(SigninPage);
}else{
  let toast = this.toastCtrl.create({
    message: data.msg,
    duration: 3000,
    position: 'middle'
  });
  toast.present();
 // alert(data.msg);
}
    
     
    })
}



 serializeObj(obj) {
    var result = [];
    for (var property in obj)
      result.push(encodeURIComponent(property) + "=" + encodeURIComponent(obj[property]));

    return result.join("&");
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


  tabPage(){
  this.navCtrl.push(TabsPage);
}
signinPage(){
  
this.navCtrl.push(SigninPage);
}

}
