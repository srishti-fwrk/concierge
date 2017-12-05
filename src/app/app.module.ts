import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { ChangepasswordPage } from '../pages/changepassword/changepassword';
import { MessagesPage } from '../pages/messages/messages';
import { BookPage } from '../pages/book/book';
import { HomePage } from '../pages/home/home';
import { MorePage } from '../pages/more/more';
import { CharterPage } from '../pages/charter/charter';
import { TabsPage } from '../pages/tabs/tabs';
import { ForgotPage } from '../pages/forgot/forgot';
import { SigninPage } from '../pages/signin/signin';
import { SignupPage } from '../pages/signup/signup';
import { ProfilePage } from '../pages/profile/profile';
import { ProfileeditPage } from '../pages/profileedit/profileedit';
import { PaymentPage } from '../pages/payment/payment';
import { PaymentnewPage } from '../pages/paymentnew/paymentnew';
import { PaymentinfoPage } from '../pages/paymentinfo/paymentinfo';
import { MembershipplanePage } from '../pages/membershipplane/membershipplane';
import { HttpModule } from '@angular/http';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Appsetting } from '../providers/appsetting';
import { MapmodelPage } from '../pages/mapmodel/mapmodel';
import { MapmodellPage } from '../pages/mapmodell/mapmodell';
import { BookdetailsPage } from '../pages/bookdetails/bookdetails';
import { ThankyouPage } from '../pages/thankyou/thankyou';
import { MymembershipPage } from '../pages/mymembership/mymembership';
import { WelcomePage } from '../pages/welcome/welcome';
import { MymembershipnewPage } from '../pages/mymembershipnew/mymembershipnew';

import { MomentModule } from 'angular2-moment'; 



import { InAppBrowser } from '@ionic-native/in-app-browser';
import { Camera } from '@ionic-native/camera';
import { SocialSharing } from '@ionic-native/social-sharing';
import { ToastController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { PayPal, PayPalPayment, PayPalConfiguration } from '@ionic-native/paypal';
import { Firebase } from '@ionic-native/firebase';
import { LaunchNavigator, LaunchNavigatorOptions } from '@ionic-native/launch-navigator';
const firebaseConfig = {
  apiKey: "AIzaSyC2uJAkjaRwkCyrbN4U1p_-ZcCIbABoFd0",//"AIzaSyAPXo07UYrFu4-2id6_TqnbpLMEw6ZV3d8",
    authDomain: "concierge-3c973.firebaseapp.com",//"fash-4ce5a.firebaseapp.com",
    databaseURL: "https://concierge-3c973.firebaseio.com", //"https://fash-4ce5a.firebaseio.com",
    storageBucket: "",
    messagingSenderId: "767344077684" //"1053226265908" 
};


@NgModule({
  declarations: [
    MyApp,
    MessagesPage,
    BookPage,
    HomePage,
    MorePage,
    CharterPage,
    TabsPage,
    SigninPage,
    SignupPage,
    PaymentPage,
    ProfilePage,
    MembershipplanePage,
    ForgotPage,
    ChangepasswordPage,
    ProfileeditPage,
    MapmodelPage,
    MapmodellPage,
    PaymentnewPage,
    PaymentinfoPage,
    BookdetailsPage,
    ThankyouPage,
    MymembershipPage,
    MymembershipnewPage,
    WelcomePage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    MomentModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    MessagesPage,
    BookPage,
    HomePage,
    MorePage,
    CharterPage,
    TabsPage,
    SigninPage,
    ForgotPage,
    SignupPage,
    ProfilePage,
    PaymentPage,
    MembershipplanePage,
    ChangepasswordPage,
    ProfileeditPage,
    MapmodelPage,
    MapmodellPage,
    PaymentinfoPage,
    BookdetailsPage,
    ThankyouPage,
    MymembershipPage,
    WelcomePage,
    PaymentnewPage,
    MymembershipnewPage
  ],
  providers: [
    StatusBar,
    Appsetting,
    SocialSharing,
    SplashScreen,
    Camera,
    LaunchNavigator,
    Firebase,
    InAppBrowser,
    PayPal,
    ToastController,
    Geolocation,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
