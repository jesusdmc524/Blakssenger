import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { MainServiceProvider } from '../../providers/main-service/main-service';
import { LoginServiceProvider } from '../../providers/login-service/login-service';
import { iUser, Status } from '../../interfaces/interfaces';
import { ChatPage } from '../chat/chat';
import { ProfilePage } from '../profile/profile';
import { RequestService } from '../../providers/Request_service/Request-service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  users: iUser;
  friends: iUser[];
  search: string = ''
  status: Status;
  constructor(public navCtrl: NavController, private service: MainServiceProvider,
    public navparam: NavParams, private loginservice: LoginServiceProvider,
    private userService: MainServiceProvider, public alertCtrl: AlertController,
     public requestS : RequestService, public toastCtrl: ToastController) {

    this.loginservice.getStatus().subscribe((session) => {
      this.service.getUserByid(session.uid).valueChanges().subscribe((user: iUser) => {
        this.users = user
        this.users.friends = Object.keys(this.users.friends).map(key =>
          this.users.friends[key])
          console.log(this.users)
      })
    }, (err) => {
      console.log(err)
    })
    const usersObservable = this.userService.getUsers();
    usersObservable.valueChanges().subscribe((data: iUser[]) => {
      this.friends = data;
    }, (error) => {
      alert(error);
      console.log(error);
    });
  }

  Addfriend() {
    const prompt = this.alertCtrl.create({
      title: 'Agregar amigo',
      message: "Escribe el correo de un amigo al que desea agregar",
      inputs: [
        {
          name: 'email',
          placeholder: 'Example@mail.com'
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Enviar',
          handler: data => {
            const request = {
              timestamp: Date.now(),
              Reciever_email: data.email,
              Sender: this.users,
              state: 'Pendiente'
            }
            console.log(request)
            this.requestS.CreateRequest(request).then((data)=>
            {
               let toast = this.toastCtrl.create({
                 message:'Solicitud enviada.',
                 duration: 3000,
                 position: 'bottom'

               })
               toast.present()
            }).catch((error)=>{
                console.log(error)
            })
          }
        }
      ]
    });
    prompt.present();
  }
  

 
  GotoProfile() {
    this.navCtrl.push(ProfilePage)
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


