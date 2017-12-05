import { Component } from '@angular/core';

import { MessagesPage } from '../messages/messages';
import { BookPage } from '../book/book';
import { HomePage } from '../home/home';
import { CharterPage } from '../charter/charter';
import { MorePage } from '../more/more';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';



@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = MessagesPage;
  tab3Root = BookPage;
  tab4Root = CharterPage;
  tab5Root = MorePage;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
     public events : Events
  ) {
    
    
  }
  
  tabIs(tab) {
    //alert(tab);
    var br = tab._btnId.split('-');
   // alert("bhumika"+br)
    if (br[2] == '1') {
      this.events.publish('tab-t0-1', 'honey');
    }
    if (br[2] == '2') {
      this.events.publish('tab-t0-2', 'honey');
    }
    if (br[2] == '3') {
      this.events.publish('tab-t0-3', 'honey');
    }
    if (br[2] == '0') {
      this.events.publish('tab-t0-0', 'honey');
    }
    if (br[2] == '4') {
      this.events.publish('tab-t0-4', 'honey');
    }
  }
}
