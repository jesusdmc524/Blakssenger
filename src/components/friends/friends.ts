import { Component, Input, OnInit } from '@angular/core';
import { MainServiceProvider } from '../../providers/main-service/main-service';
import { iUser, Status } from '../../interfaces/interfaces';
import { ChatPage } from '../../pages/chat/chat';
import { NavController } from 'ionic-angular';

/**
 * Generated class for the FriendsComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'friends',
  templateUrl: 'friends.html'
})
export class FriendsComponent implements OnInit {

  text: string;
  @Input() uid: string
  Friend: iUser
  Status: Status
  constructor( private MainService: MainServiceProvider,public navCtrl: NavController,) {
   
  }
  ngOnInit() {
    this.MainService.getUserByid(this.uid).valueChanges().subscribe((DataUser:iUser)=>{
      this.Friend = DataUser
      console.log(this.Friend)
    })
    console.log(this.uid)
  }
  GoToChat(user) {
    this.navCtrl.push(ChatPage, { param: user })
  }
  getstatusclass(user) {
    let state = ''

    switch (user) {
      case Status.Online:
        state = 'online'
        break;
      case Status.Offline:
        state = 'offline'
        break;
      case Status.AppearOffline:
        state = 'offline'
        break;
      case Status.Busy:
        state = 'busy'
        break;
      case Status.Away:
        state = 'away'
        break;

    }
    return state

  }
}
