import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireStorage } from 'angularfire2/storage';

/*
  Generated class for the MainServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MainServiceProvider {

  constructor(public Afdb: AngularFireDatabase, private AfS : AngularFireStorage ) {
  }

  getUsers()
  {
    return this.Afdb.list('/usuarios/')
  }
  getUserByid(uid)
  {
    return this.Afdb.object('/usuarios/' + uid)
  }
  createuser(user)
  {
    return this.Afdb.object('/usuarios/' + user.uid).set(user)
  }
  UpdateUser(user)
  {
    return this.Afdb.object('/usuarios/' + user.uid).set(user)
  }

  UploadPicture(Picture_name: string,image)
  {
    return this.AfS.ref('picutres/' + Picture_name).putString(image,'data_url')
  }
  GetPicture(Iamge_name: string)
  {
    return  this.AfS.ref('pictures/' + Iamge_name).getDownloadURL()
  }
  addFriend(uid,UserName,friendid,FriendName)
  {
     this.Afdb.object('usuarios/' + uid + '/friends/' + FriendName).set(friendid)
     return this.Afdb.object('usuarios/' + friendid + '/friends/' + UserName).set(uid)

  }
}
