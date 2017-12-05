import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SignupPage } from '../signup/signup';
import { SigninPage } from '../signin/signin';

/**
 * Generated class for the WelcomePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html',
})
export class WelcomePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }
  signupPage() {
    this.navCtrl.push(SignupPage);
  }
  signinPage(){
    
this.navCtrl.push(SigninPage);
}
  ionViewDidLoad() {
    console.log('ionViewDidLoad WelcomePage');
  }

}
