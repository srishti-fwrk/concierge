import { Component } from '@angular/core';
import { NavController, Events } from 'ionic-angular';
import 'rxjs/add/operator/map';
import { LoadingController } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Appsetting } from '../../providers/appsetting';
import { ToastController } from 'ionic-angular';
import { ActionSheetController } from 'ionic-angular'

@Component({
  selector: 'page-messages',
  templateUrl: 'messages.html'
})
export class MessagesPage {
  message;
  doRefresh(refresher) {
    console.log('Begin async operation', refresher);
   
    this.msg()
    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 2000);
  }
  public Loading = this.loadingCtrl.create({
    content: 'Please wait...'
  })
  constructor(public navCtrl: NavController,
    public http: Http,
    public appsetting: Appsetting,
    private toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    public events: Events,
    public actionSheetCtrl: ActionSheetController) {
   
    this.events.subscribe('tab-t0-1', (data) => {
      this.msg()

    })

  }
  msg() {
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
    let options = new RequestOptions({ headers: headers });
    var id = localStorage.getItem("USERID")
    var postdata = {
      user_id: id
    };
    console.log(postdata);
    var serialized = this.serializeObj(postdata);
    let Loading = this.loadingCtrl.create({
      content: 'Please wait...'
    })
    Loading.present().then(() => {
      this.http.post(this.appsetting.myGlobalVar + 'promotions/notification', serialized, options).map(res => res.json()).subscribe(data => {
        Loading.dismiss();
        console.log(data)
        if (data.isSucess == true) {
          this.message = data.data
          console.log(this.message)
        }
        else {
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
  removemsg() {

    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
    let options = new RequestOptions({ headers: headers });
    var user_id = localStorage.getItem("USERID")
    var postdata = {
      user_id: user_id
    };
    console.log(postdata);
    var serialized = this.serializeObj(postdata);
    let Loading = this.loadingCtrl.create({
      content: 'Please wait...'
    })
      Loading.present().then(() => {
      this.http.post(this.appsetting.myGlobalVar + 'promotions/removemsgall', serialized, options).map(res => res.json()).subscribe(data => {
        Loading.dismiss(); 
        console.log(data)
        if (data.isSucess == true) {
          //this.msg()
          this.message=[];
          let toast = this.toastCtrl.create({
            message: data.msg,
            duration: 3000,
            position: 'middle'
          });
          toast.present();
        }
        else {
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


  presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Are you sure want to delete',
      buttons: [
        {
          text: 'Remove',
          role: 'remove',
          handler: () => {
            this.removemsg()
            console.log('remove clicked');
          }
        },

        {
          text: 'Cancel',
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
