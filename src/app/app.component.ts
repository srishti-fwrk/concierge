import { Component,ViewChild } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { SigninPage } from '../pages/signin/signin';
import { MessagesPage } from '../pages/messages/messages';
import { TabsPage } from '../pages/tabs/tabs';
import { SignupPage } from '../pages/signup/signup';
import { WelcomePage } from '../pages/welcome/welcome';
import { Firebase } from '@ionic-native/firebase';
import { AlertController, Nav } from 'ionic-angular';

export class NotificationModel {
  public body: string;
  public title: string;
  public tap: boolean
}
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  public user = '';
  @ViewChild(Nav) nav: Nav;
  rootPage:any = WelcomePage;
  pages: Array<{ title: string, component: any }>;
	pages2: any;
 

  constructor(public platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,public firebase: Firebase,public alertCtrl: AlertController) {
	
		

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      this.firebase.grantPermission();   // for push notifications
      if (this.platform.is('cordova')) {
          // Initialize push notification feature
        //	alert("ios"+this.platform)
          this.initializeFireBaseIos();
    } else {
       //	alert(this.platform)
      console.log('Push notifications are not enabled since this is not a real device');
    }
      this.rootPage= localStorage.getItem("USERID")!=null ?  TabsPage:WelcomePage;
    });
  }
  private initializeFireBaseIos(): Promise<any> {
		return this.firebase.grantPermission()
			.catch(error => console.error('Error getting permission', error))
			.then(() => {
				this.firebase.getToken()
					.catch(error => console.error('Error getting token', error))
					.then(token => {

						console.log(`The token is ${token}`);

						Promise.all([
							this.firebase.subscribe('firebase-app'),
							this.firebase.subscribe('ios'),
							this.firebase.subscribe('userid-2')
						]).then((result) => {

							if (result[0]) console.log(`Subscribed to FirebaseDemo`);
							if (result[1]) console.log(`Subscribed to iOS`);
							if (result[2]) console.log(`Subscribed as User`);

							this.subscribeToPushNotificationEvents();
						});
					});
			})

  }
  //this.firebase.grantPermission();
  private saveToken(token: any): Promise<any> {
		// Send the token to the server
		console.log('Sending token to the server...');
		return Promise.resolve(true);
  } 
 


  	private subscribeToPushNotificationEvents(): void {
	//	alert("hello everyone");
		// Handle token refresh
		this.firebase.onTokenRefresh().subscribe(
			token => {
				console.log(`The new token is ${token}`);
				this.saveToken(token);
			},
			error => {
				console.error('Error refreshing token', error);
			});

		// Handle incoming notifications
		this.firebase.onNotificationOpen().subscribe(
			(notification: NotificationModel) => {
				//alert('alert - > '+ JSON.stringify(notification))

				!notification.tap
					?  console.log('The user was using the app when the notification arrived...') 
					: console.log('The app was closed when the notification arrived...')
					// alert starts
				

				let notificationAlert = this.alertCtrl.create({
					title: '<center>' + notification.title + '</center>',
					message: notification.body,
					buttons: [{
							text: 'Ignore',
							role: 'cancel'
						}, {
							text: 'View',
							handler: () => {
								//TODO: Your logic here
								this.user = localStorage.getItem('USERID');
								//alert('user' + this.user)
								if (this.user == undefined || this.user == null) {
									this.nav.push(SigninPage);
								} else {
									this.nav.push(MessagesPage, { message: notification }); //this.nav.setRoot(this.pages2.SchedulePage);
								}

							}
						}]
				});
				if(notification.title != undefined){
					notificationAlert.present();
				}

			
			},
			error => {
				console.error('Error getting the notification', error);
			});
	}
}
