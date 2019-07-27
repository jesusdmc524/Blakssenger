import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, ViewController } from 'ionic-angular';
import { ProfilePage } from '../profile/profile';
import { LoginServiceProvider } from '../../providers/login-service/login-service';
import { MainServiceProvider } from '../../providers/main-service/main-service';
import { iUser } from '../../interfaces/interfaces';

/**
 * Generated class for the EditProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-profile',
  templateUrl: 'edit-profile.html',
})
export class EditProfilePage {
  UserData:number
  User:iUser
  constructor(public navCtrl: NavController, public navParams: NavParams, private loginservice:LoginServiceProvider
    ,private mainservice:MainServiceProvider, public toastCtrl: ToastController, private viewCtrl :ViewController) {
    this.UserData = this.navParams.get('param')
    this.loginservice.getStatus().subscribe((data)=>{
        this.mainservice.getUserByid(data.uid).valueChanges().subscribe((user:any)=>{
          this.User = user
        },(err)=>{
          console.log(err)
        })
    },(err)=>{
      console.log(err)
    })
    }
    updateDataUser()
    {
      this.mainservice.UpdateUser(this.User).then((data)=>{
        this.closeModal()
        const toast = this.toastCtrl.create({
          message: 'Datos actualizados',
          duration: 2000,
          position: 'bottom'
        });
        toast.present()
      }).catch((err)=>{
        console.log(err)
      })
    }
  
    closeModal() {
     this.navCtrl.pop()
    }
}
