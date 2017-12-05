import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import 'rxjs/add/operator/map';
import { LoadingController } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Appsetting } from '../../providers/appsetting';
import { ToastController } from 'ionic-angular';
import { PaymentnewPage } from '../paymentnew/paymentnew';
import { TabsPage } from '../tabs/tabs';

/**
 * Generated class for the MymembershipnewPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-mymembershipnew',
  templateUrl: 'mymembershipnew.html',
})
export class MymembershipnewPage {
  data; plan; planid; trans;trasfer;
  public Loading = this.loadingCtrl.create({
    content: 'Please wait...'

  });
  constructor(public navParams: NavParams,
    public navCtrl: NavController,
    public http: Http,
    public appsetting: Appsetting,
    public loadingCtrl: LoadingController,
    private toastCtrl: ToastController) {
    this.memberplan()
  }
  memberplan() {
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
    let options = new RequestOptions({ headers: headers });
    //var url:string = 'http://rakesh.crystalbiltech.com/bookride/api/subscriptionPlans/membershipplan';
    var user_id = localStorage.getItem("USERID")
    var postdata = {
      userid: user_id
    };
    console.log(postdata);
    var serialized = this.serializeObj(postdata);
    // this.Loading.present();
    this.http.post(this.appsetting.myGlobalVar + 'subscriptionPlans/newmembershipplan', serialized, options).map(res => res.json()).subscribe(data => {
      // this.Loading.dismiss();
      console.log(data)
    
        this.data = data;
        this.plan = data.data;
        console.log(this.plan)
        console.log(this.data);
  

    })
  }

  selectvalue(A_id, Id) {
   
    console.log(A_id, Id);
    this.planid = Id;
    this.trasfer = A_id;
    localStorage.setItem('planidd', Id)


  }
  tabPage() {
    this.navCtrl.push(TabsPage);
  }
  // buyplan() {
  //   if (this.planid == undefined) {
      
  //           let toast = this.toastCtrl.create({
  //             message: 'Please select a plan',
  //             duration: 3000,
  //             position: 'middle'
  //           });
  //           toast.present();
  //         }
  //   else{
  //     alert(this.trasfer);
  //     this.navCtrl.push(PaymentnewPage,{trans:this.trasfer});
  //   }      
    
  // }

  buyplan() {
    if (this.planid == undefined) {

      let toast = this.toastCtrl.create({
        message: 'Please select a plan',
        duration: 3000,
        position: 'middle'
      });
      toast.present();
    } else {
      // alert("heufhu")
      let headers = new Headers();
      headers.append('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
      let options = new RequestOptions({ headers: headers });
      var user_id = localStorage.getItem("USERID")
      var postdata = {
        user_id: user_id,
        plan_id: this.planid,

      };

      console.log(postdata);
      var serialized = this.serializeObj(postdata);
      this.http.post(this.appsetting.myGlobalVar + 'users/newplanadd', serialized, options).map(res => res.json()).subscribe(data => {
        this.Loading.dismiss();
        console.log(data)
        console.log(data.data.SubscriptionPlan)
        if (data.isSucess == true) {
          var paymentdata = localStorage.setItem("paymentnew", JSON.stringify(data.data.SubscriptionPlan));
          console.log(paymentdata)
          this.navCtrl.push(PaymentnewPage,{trans:this.trasfer});
        }
        //  // alert("something going wrong")
      })
      // }
    }

  }
  serializeObj(obj) {
    var result = [];
    for (var property in obj)
      result.push(encodeURIComponent(property) + "=" + encodeURIComponent(obj[property]));

    return result.join("&");
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad MymembershipnewPage');
  }

}
