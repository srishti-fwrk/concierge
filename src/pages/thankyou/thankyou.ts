import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { Http, Headers, RequestOptions } from '@angular/http';
import { LoadingController } from 'ionic-angular';
import { Appsetting } from '../../providers/appsetting';
import 'rxjs/add/operator/map';

/**
 * Generated class for the ThankyouPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-thankyou',
  templateUrl: 'thankyou.html',
})
export class ThankyouPage {

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public http: Http,
              public appsetting: Appsetting,
              public loadingCtrl: LoadingController,) {
                this.statusupdate()
  }
statusupdate(){
  //alert("update data");
  let headers = new Headers();
  headers.append('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
  let options = new RequestOptions({ headers: headers });
  var user_id = localStorage.getItem("USERID")
  var postdata = {
    id: user_id
  };
  console.log(postdata);
  var serialized = this.serializeObj(postdata);
  let Loading = this.loadingCtrl.create({
    content: 'Please wait...'
  })
  Loading.present().then(() => {
    this.http.post(this.appsetting.myGlobalVar + 'users/updaterequest', serialized, options).map(res => res.json()).subscribe(data => {
      Loading.dismiss();
      console.log(data)
      // if (data.data.User.status = !1) {
      //   this.memberplan()
      // } 
      // else {
      //  this.navCtrl.push(MymembershipPage);
      // }

    })
  });

}
serializeObj(obj) {
  var result = [];
  for (var property in obj)
    result.push(encodeURIComponent(property) + "=" + encodeURIComponent(obj[property]));

  return result.join("&");
}
  ionViewDidLoad() {
    console.log('ionViewDidLoad ThankyouPage');
        setTimeout(()=>{    
          this.navCtrl.push(TabsPage);
        },4000);
  }
 
}
