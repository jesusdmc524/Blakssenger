import { Component } from '@angular/core';
import { IonicPage, NavController, ToastController } from 'ionic-angular';

import { HomePage } from '../home/home';
import { MainServiceProvider } from '../../providers/main-service/main-service';
import { LoginServiceProvider } from '../../providers/login-service/login-service';
import { Status, iUser } from '../../interfaces/interfaces';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
 
  name:string
  mail: string 
  password: string
  password2: string
  edad:number
  status: Status
  constructor(public mainservice: MainServiceProvider, public auth :LoginServiceProvider, public navCtrl: NavController
    ,public toastctrl : ToastController ) {
 
   
  }
  
  
    login()
    {
      this.auth.loginWithEmail(this.mail,this.password).then((data)=>{
        const toast = this.toastctrl.create({
          message: 'Sesión iniciada ',
          duration: 2000,
          position: 'bottom'

        });
        toast.present()
     this.navCtrl.setRoot(HomePage,{param:data.user.uid})
      }).catch((error)=>{
        const toast = this.toastctrl.create({
          message: error,
          duration: 2000,
          position: 'bottom'

        });
        toast.present()
      })
    }
  
    register()
    {
      if(this.password === this.password2)
      {
        this.auth.registerWithEmail(this.mail,this.password).then((data)=>{
          let user = this.RegisterUser(data)
          this.mainservice.createuser(user).then((data)=>{
            this.clearcamps()
          }).catch((error)=>{
            console.log(error)
          })
          const toast = this.toastctrl.create({
            message: 'Usuario registrado satisfactoriamente',
            duration: 2000
          });
          toast.present()
        }).catch((error)=>{
          const toast = this.toastctrl.create({
            message: error,
            duration: 4000,
            position: 'bottom'
          });
          toast.present()
        })

      }else{
        const toast = this.toastctrl.create({
          message: 'Las contraseñas no coinciden',
          duration: 2000,
          position: 'bottom'

        });
        toast.present()
      }
      
    }
    clearcamps()
    {
      
      this.name = ''
      this.mail = ''
      this.password = ''
      this.password2 = ''
      this.edad = 0
    }
    LoginGoogle()
    {
      this.auth.googlelogin().then((data)=>{
        console.log(data)
        debugger
        this.name = data.user.displayName
        this.mail = data.user.email
        let user = this.RegisterUser(data)
        console.log(user)
        if(data.additionalUserInfo.isNewUser === true)
        {
          this.mainservice.createuser(user).then((data)=>{
            this.clearcamps()
            const toast = this.toastctrl.create({
              message: 'Usuario nuevo: Registro exitoso',
              duration: 3000,
              position: 'bottom'
    
            });
            toast.present()
          this.navCtrl.setRoot(HomePage)
          }).catch((error)=>{
            console.log(error)
          })
        }else{
          const toast = this.toastctrl.create({
            message: 'Sesión iniciada',
            duration: 3000,
            position: 'bottom'
  
          });
          toast.present()
        this.navCtrl.setRoot(HomePage)

        }
      
      }).catch((err)=>{
        
      })
    }
    RegisterUser(data)
    {
      const user: iUser = {
        nombre: this.name,
        age: this.edad,
        email: this.mail,
        active: true,
        uid: data.user.uid,
        status: Status.Online,
      };
      return user
    }

  }


