import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import 'rxjs/add/operator/map';
import {LoadingController} from 'ionic-angular';
import {Http, Headers, RequestOptions} from '@angular/http';
import { Appsetting } from '../../providers/appsetting';
import { ProfileeditPage } from '../profileedit/profileedit';
import { ToastController } from 'ionic-angular';

/**
 * Generated class for the ProfilePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
profile;srcImage;
doRefresh(refresher) {
  console.log('Begin async operation', refresher);
  this.profilePage()
  setTimeout(() => {
    console.log('Async operation has ended');
    refresher.complete();
  }, 2000);
}
 public Loading = this.loadingCtrl.create({
    content: 'Please wait...'
  })
  constructor(public navCtrl: NavController,
              public navParams: NavParams, 
              public http:Http,
              public appsetting: Appsetting,
              public loadingCtrl:LoadingController,
              private toastCtrl: ToastController) {
              this. profilePage()
  }
	profilePage() {

		let headers = new Headers();
		headers.append('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
		let options = new RequestOptions({ headers: headers });
		var user_id = localStorage.getItem("USERID")
		// var url = 'http://rakesh.crystalbiltech.com/fash/api/lookbooks/productoflookbook'; 
		var postdata = {
			id: user_id
		};
		console.log(postdata);
		var serialized = this.serializeObj(postdata);
    this.Loading.present();
		this.http.post(this.appsetting.myGlobalVar + 'users/user', serialized, options).map(res => res.json()).subscribe(data => {
			this.Loading.dismiss();

			console.log(data)
			this.profile = data.data.User
			this.srcImage=this.profile.image
			console.log(this.profile)

		})
	}
  serializeObj(obj) {
    var result = [];
    for (var property in obj)
      result.push(encodeURIComponent(property) + "=" + encodeURIComponent(obj[property]));

    return result.join("&");
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfileeditPage');
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
    profileeditPage(){
  this.navCtrl.push(ProfileeditPage);
}

}
