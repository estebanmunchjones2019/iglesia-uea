import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {VideoModel} from "../../model/video.model";
import * as moment from "moment";
import {map} from "rxjs/internal/operators";

import { AngularFireFunctions } from '@angular/fire/functions';

@Injectable()
export class FirebaseFunctionsService {

  constructor(private firebase: AngularFireFunctions) {
  }

  
  sendEmail(from, name, text: string) {
    const callable = this.firebase.httpsCallable('sendMail');
    return callable({ from : from, 
                      name: name,
                      text: text,
                      dest: 'sebas_gallardo@hotmail.com',
                      subject: 'Iglesia Cononel Suarez'});
  }
}
