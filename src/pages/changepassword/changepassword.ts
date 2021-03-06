import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,App } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import 'rxjs/add/operator/map';
import {LoadingController} from 'ionic-angular';
import {Http, Headers, RequestOptions} from '@angular/http';
import { SigninPage } from '../signin/signin';
import { Appsetting } from '../../providers/appsetting';
import { ToastController } from 'ionic-angular';

/**
 * Generated class for the SigninPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-changepassword',
  templateUrl: 'changepassword.html',
})
export class ChangepasswordPage {
public data = {};

public Loading=this.loadingCtrl.create({
    content: 'Please wait...'
    
  });
  constructor(public navCtrl: NavController,
   public navParams: NavParams,
   public http:Http,
   public appsetting: Appsetting,
   public loadingCtrl:LoadingController,
   public app: App,private toastCtrl: ToastController) {
  }
changepass(form){
let headers = new Headers();
headers.append('Content-Type',  'application/x-www-form-urlencoded;charset=utf-8');
let options= new RequestOptions({ headers: headers });
//var url:string = 'http://rakesh.crystalbiltech.com/bookride/api/users/changepassword';
var User = JSON.parse(localStorage.getItem("USER_DATA"));
console.log(User)
var email = User.data.email;
console.log(email)
if (form.value.newpassword == form.value.conpassword) {
 var data ={
        email: email,
      	old_password: form.value.password,
      	new_password: form.value.newpassword
}
 console.log(data);
var Serialized = this.serializeObj(data);
console.log(data);
this.http.post(this.appsetting.myGlobalVar + 'users/changepassword', Serialized, options).map(res=>res.json()).subscribe(data=>{
this.Loading.dismiss();
console.log(data)
if(data.isSucess == "true"){
  let toast = this.toastCtrl.create({
    message: data.msg,
    duration: 3000,
    position: 'middle'
  });
  toast.present();
   // alert(data.msg);
    localStorage.clear();
		this.navCtrl.push(SigninPage)
   this.app.getRootNav().setRoot(SigninPage);
}else{
     let toast = this.toastCtrl.create({
     message: data.msg,
     duration: 3000,
     position: 'middle'
  });
     toast.present();
   //alert(data.msg);
}
 

    
     
   })
}else{
  let toast = this.toastCtrl.create({
    message: "Passwords do not match",
    duration: 3000,
    position: 'middle'
  });
  toast.present();
 // alert("Passwords do not match");
}
}



 serializeObj(obj) {
    var result = [];
    for (var property in obj)
      result.push(encodeURIComponent(property) + "=" + encodeURIComponent(obj[property]));

    return result.join("&");
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ChangepasswordPage');
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

}
