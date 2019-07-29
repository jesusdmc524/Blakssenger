import { Injectable } from "@angular/core";
import { AngularFireDatabase } from "angularfire2/database";

@Injectable()
export class RequestService {

  constructor(private AfDB: AngularFireDatabase) {
  }

  CreateRequest(request) {
    const CleanEmail = request.Reciever_email.replace('.', ',');
    return this.AfDB.object('requests/' + CleanEmail + '/' + request.Sender.uid).set(request)

  }

  SetRequestStatus(request, status) {
    const CleanEmail = request.Reciever_email.replace('.', ',');
    return this.AfDB.object('requests/' + CleanEmail + '/' + request.Sender.uid).set(status)

  }

  GetRequestForEmail(request) {
    const CleanEmail = request.email.replace('.', ',');
    return this.AfDB.list('requests/' + CleanEmail )

  }
  
  

}