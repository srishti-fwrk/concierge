import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SignupPage } from '../signup/signup';
import { TabsPage } from '../tabs/tabs';
import 'rxjs/add/operator/map';
import { LoadingController } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
import { ForgotPage } from '../forgot/forgot';
import { Appsetting } from '../../providers/appsetting';
import { ToastController } from 'ionic-angular';
import { Firebase } from '@ionic-native/firebase';


/**
 * Generated class for the SigninPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html',
})
export class SigninPage {
  public data = ''; id;
  public tokenid = '';

  public Loading = this.loadingCtrl.create({
    content: 'Please wait...'

  });
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public http: Http,
    public appsetting: Appsetting,
    private toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    private firebase: Firebase, ) {

  }
  login(form) {

    // this.firebase.getToken()
    //    .then(token => {
    //      console.log(`The token is ${token}`)
    //      this.tokenid = token

        //save the token server-side and use it to push notifications to this device

        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
        let options = new RequestOptions({ headers: headers });
        // var url:string = 'http://rakesh.crystalbiltech.com/bookride/api/users/login';
        //alert(this.tokenid)
        var data = {
          email: form.value.email,
          password: form.value.password,
        //  tokenid: this.tokenid,
          tokenid: "hh",
          reg_status: 1
        }
        var Serialized = this.serializeObj(data);
        console.log(data);
        //alert(JSON.stringify(data))
        this.Loading.present();
        this.http.post(this.appsetting.myGlobalVar + 'users/login', Serialized, options).map(res => res.json()).subscribe(data => {
          this.Loading.dismiss();
          if (data.error == 0) {
            this.data = data;
            this.id = data.data.User.id
            localStorage.setItem("USERID", data.data.User.id);
            localStorage.setItem("USER_DATA", JSON.stringify(data));
            // alert(data.msg);
            let toast = this.toastCtrl.create({
              message: data.msg,
              duration: 3000,
              position: 'middle'
            });
            toast.present();
            this.navCtrl.push(TabsPage);
          } else {
            let toast = this.toastCtrl.create({
              message: data.msg,
              duration: 3000,
              position: 'middle'
            });
            toast.present();
            // alert(data.msg)
          }


        })



 // })
  }



  serializeObj(obj) {
    var result = [];
    for (var property in obj)
      result.push(encodeURIComponent(property) + "=" + encodeURIComponent(obj[property]));

    return result.join("&");
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad SigninPage');
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

  signupPage() {
    this.navCtrl.push(SignupPage);
  }
  forgotPage() {
    this.navCtrl.push(ForgotPage);
  }

  tabPage() {
    this.navCtrl.push(TabsPage);
  }

}
