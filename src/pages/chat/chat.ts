import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { iUser } from '../../interfaces/interfaces';
import { LoginServiceProvider } from '../../providers/login-service/login-service';
import { MainServiceProvider } from '../../providers/main-service/main-service';
import { ConversationService } from '../../providers/conversation-service/conversation-service';
import { Vibration } from '@ionic-native/vibration';
/**
 * Generated class for the ChatPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})
export class ChatPage {
  user:iUser;
  Friend: iUser;
  conversationID: any;
  message:string
  conversation: any;
  Shake: boolean = false;
  messageObject:any
  constructor(public navCtrl: NavController, public navParams: NavParams, private loginservice:LoginServiceProvider
    ,private UserService : MainServiceProvider, public conversationService:ConversationService, private vibration: Vibration) {
    this.Friend= this.navParams.get('param')
    this.loginservice.getStatus().subscribe((data)=>{
      this.UserService.getUserByid(data.uid).valueChanges().subscribe((DataUser:iUser)=>{
        this.user = DataUser
        let IdsArray = [this.user.uid,this.Friend.uid].sort()
        this.conversationID = IdsArray.join('|')
        this.GetMessage()
      }, (error) =>
      {
        console.log(error)
      })
    }, (error)=>{

    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChatPage');
  }

  SendMesage()
  {
    if(this.message === undefined || this.message === ''){
      alert('no se puede enviar mensaje vacio care verga')
    }
    else{
      const messageObject: any = {
        uid: this.conversationID,
        timestamp:Date.now(),
        sender:this.user.uid,
        reciever:this.Friend.uid, 
        type: 'text',
        content: this.message
      }
      
      this.conversationService.add(messageObject).then((data)=>{
        this.message = '';
      }).catch((error)=>{
  
      })
    }
    }
    
    GetMessage(){
      this.conversationService.GetMessageById(this.conversationID).valueChanges().subscribe((data)=>{
        this.conversation = data
        this.ExecZumbido()

        /*if(this.conversation.type === 'zumbido')
        {
          this.ExecZumbido()
        }
        else
        {
          return
        }*/
        

      })
    }
    GetnameById(uid)
    {
      if(uid === this.Friend.uid)
      {
        return this.Friend.nombre
      }
      else
      return this.user.nombre
    }
   
    GetById(uid)
    {
      if(uid === this.Friend.uid)
      {
        return this.Friend.uid
      }
      else
      return this.user.uid
    }
    
    ExecZumbido()
    {
      const audio = new Audio('assets/sound/zumbido.m4a')
      audio.volume = 1;
      audio.play()
      this.vibration.vibrate(1000);      
      this.Shake = true
        window.setTimeout(()=>{
          this.Shake = false
        },800)
    }

    SendZumbido()
    {
      
        const messageObject: any = {
          uid: this.conversationID,
          timestamp:Date.now(),
          sender:this.user.uid,
          reciever:this.Friend.uid, 
          type: 'zumbido',
         
        }
        
        this.conversationService.add(messageObject).then((data)=>{
        
        this.GetMessage()


        }).catch((error)=>{
    
        })
      }
}
