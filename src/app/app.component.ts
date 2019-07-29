import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, ToastController, App, ModalController, AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { ProfilePage } from '../pages/profile/profile';
import { LoginServiceProvider } from '../providers/login-service/login-service';
import { MainServiceProvider } from '../providers/main-service/main-service';
import { iUser } from '../interfaces/interfaces';
import { LoginPage } from '../pages/login/login';
import { RequestService } from '../providers/Request_service/Request-service';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any;

  pages: Array<{ title: string, component: any }>;
  user: iUser;
  requests: any;
  mailsShown: any = [];
  constructor(public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public loginservice: LoginServiceProvider,
    public toastctrl: ToastController,
    public App: App,
    public mainservice: MainServiceProvider,
    public requestService: RequestService,
    public modalCtrl: ModalController,
    public alertCtrl: AlertController) {
    this.initializeApp();
    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Inicio', component: HomePage },
      { title: 'Perfil', component: ProfilePage }

    ];

    this.loginservice.getStatus().subscribe((session) => {

      if (!session) {
        this.rootPage = LoginPage
        return
      }
      else {
        //this.nav.setRoot(HomePage)
        this.rootPage = HomePage
        this.mainservice.getUserByid(session.uid).valueChanges().subscribe((Datauser: iUser) => {
          this.user = Datauser
          if (this.user != undefined) {
            this.GetFriendsRequest()

          }
          else {
            return
          }

        }, (error) => {
            console.log(error)
          })
      }


    })

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.push(page.component);
  }
  logout() {
    this.loginservice.logout().then((data) => {
      const toast = this.toastctrl.create({
        message: 'Sesion cerrada',
        duration: 2000
      });
      toast.present()
      this.App.getRootNav().setRoot(LoginPage)
    }).catch((err) => {
      const toast = this.toastctrl.create({
        message: err,
        duration: 2000
      });
      toast.present()
    })
  }

  GetFriendsRequest() {
    this.requestService.GetRequestForEmail(this.user).valueChanges().subscribe((data) => {
      this.requests = data
      this.requests = this.requests.filter((r) => {
        return r.status !== 'aceptado' && r.status !== 'rechazado'
      })

      this.requests.forEach((r) => {
        if (r.Sender != undefined) {
          if (this.mailsShown.indexOf(r.Sender.email) === -1) {
            this.mailsShown.push(r.Sender.email);
            //mostrar aceptar
            this.ShowMessage(r)
          } else {
            return
          }
        } else
        {
          return
        }

      });
    }, (error) => {
      console.log(error)
    })
  }

  ShowMessage(r) {
    let alert = this.alertCtrl.create()
    alert.setTitle('Solicitud de amistad')
    alert.setMessage(r.Sender.nombre + ' te ha enviado una solicitud de amistad')
    alert.addButton({
      text: 'Aceptar',
      handler: data => {
        this.requestService.SetRequestStatus(r, 'Aceptado').then((data) => {
          this.mainservice.addFriend(this.user.uid, this.user.nombre, r.Sender.uid, r.Sender.nombre);
          console.log('Solicitud aceptada')
        }).catch((error) => { console.log(error) })
      }
    })
    alert.addButton({
      text: 'Rechazar',
      handler: data => {
        this.requestService.SetRequestStatus(r, 'Rechazado').then((data) => {
          console.log('Solicitud rechazado')
        }).catch((error) => { console.log(error) })
      }
    })
    alert.present()

  }
}
