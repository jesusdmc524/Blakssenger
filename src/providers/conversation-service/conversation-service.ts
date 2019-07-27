import {Injectable} from "@angular/core";
import {AngularFireDatabase} from "angularfire2/database";

@Injectable()
export class ConversationService {
  constructor(private AfDB: AngularFireDatabase) {
  }

  add(conversation)
  {
  
      return this.AfDB.object('conversations/'+ conversation.uid +'/'+ conversation.timestamp).set(conversation)

  }

  GetMessageById(uid)
  {
    return this.AfDB.list('conversations/'+ uid)

  }

}