import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginServiceProvider } from '../providers/login-service/login-service';
import { MainServiceProvider } from '../providers/main-service/main-service';
import { LoginPage } from '../pages/login/login';
import { ProfilePage } from '../pages/profile/profile';
import { EditProfilePage } from '../pages/edit-profile/edit-profile';
import { SearchPipe } from '../pipes/search/search';

import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireStorageModule } from 'angularfire2/storage';

import { Geolocation } from '@ionic-native/geolocation';
import { Camera } from '@ionic-native/camera';

import { ChatPage } from '../pages/chat/chat';
import { ConversationService } from '../providers/conversation-service/conversation-service';
import { Vibration } from '@ionic-native/vibration';
import { RequestService } from '../providers/Request_service/Request-service';
import { ProfilePageModule } from '../pages/profile/profile.module';
import { FriendsComponent } from '../components/friends/friends';


export const firebaseConfig = {
  apiKey: "AIzaSyDNgyZhjVL-3Q-65K1f0jgBXyoq0P-xXM8",
  authDomain: "funnymoments-ff5b0.firebaseapp.com",
  databaseURL: "https://funnymoments-ff5b0.firebaseio.com",
  projectId: "funnymoments-ff5b0",
  storageBucket: "funnymoments-ff5b0.appspot.com",
  messagingSenderId: "991858795263",
  appId: "1:991858795263:web:8c74d78f108091e1"
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    ProfilePage,
    EditProfilePage,
    SearchPipe,
    ChatPage,
    FriendsComponent
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule, 
    AngularFireStorageModule,
    
    
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    ProfilePage,
    EditProfilePage,
    ChatPage,
    FriendsComponent
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    LoginServiceProvider,
    MainServiceProvider,
    Camera,
    Geolocation,
    ConversationService,
    Vibration, 
    RequestService
  ]
})
export class AppModule {}
