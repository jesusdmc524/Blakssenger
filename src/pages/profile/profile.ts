import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ToastController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { EditProfilePage } from '../edit-profile/edit-profile';
import { LoginServiceProvider } from '../../providers/login-service/login-service';
import { MainServiceProvider } from '../../providers/main-service/main-service';
import { iUser } from '../../interfaces/interfaces';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Geolocation } from '@ionic-native/geolocation';

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  User:iUser;
  ImageId: string;
  location: any;
  constructor(public navCtrl: NavController, public navParams: NavParams , public ToastCtrl:ToastController,
    private LoginService:LoginServiceProvider, private mainservice:MainServiceProvider, private camera:Camera,
      private geolocation: Geolocation) {
      this.LoginService.getStatus().subscribe((data)=>{
        this.mainservice.getUserByid(data.uid).valueChanges().subscribe((user:any)=>{
            this.User=user
            console.log(this.User.status)
        },(err)=>{
          console.log(err)
        })
      }, (err)=>{
        console.log(err)
      })
    
  }
  async Takepicture(option)
  {
    try{
      let cameraOptions: CameraOptions = {
        quality: 70,
        targetHeight:800,
        targetWidth: 800,
        destinationType: this.camera.DestinationType.DATA_URL,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType:this.camera.MediaType.PICTURE,
        allowEdit:true        
      } 
      cameraOptions.sourceType = (option === 'camera') ? this.camera.PictureSourceType.CAMERA : 
      this.camera.PictureSourceType.PHOTOLIBRARY
      const result = await this.camera.getPicture(cameraOptions)
      const image = 'data:image/jpeg;base64,' + result
      console.log(image)
      let id = Date.now()
      this.ImageId = id.toString()
      this.mainservice.UploadPicture(this.ImageId + '.jpg',image).then((data)=>{
        this.mainservice.GetPicture(this.ImageId + '.jpg').subscribe((url)=>{
          this.User.ImageProfile = url
            const toast = this.ToastCtrl.create({
              message: 'Imagen actualizada con exito',
              duration: 3000
            });
            toast.present();
         
        })
      }).catch((err)=>{
        console.log(err)
      })
      
    }
    catch(err)
    {
      console.log(err)
    }

  }
  GetLocation()
  {
   this.geolocation.getCurrentPosition().then((data)=>{
     console.log(data)
     this.location = data
   }).catch((err)=>{
    console.log(err)
   })
  }

  EditPage(data) {
    this.navCtrl.push(EditProfilePage,{param:data})
  }
}
