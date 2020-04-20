import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {VideoModel} from "../../model/video.model";
import * as moment from "moment";
import {map} from "rxjs/internal/operators";

import { AngularFirestore } from '@angular/fire/firestore';

@Injectable()
export class FirebaseService {

  private baseUrl: string = "/assets/json/videos.json";

  constructor(private httpClient: HttpClient,
    private firestore: AngularFirestore) {
  }

  getAllVideos(page, size, search: string) {

    let videosRef = this.firestore.firestore.collection('videos');
    let queryRef;
    if (search !== null && search !== undefined && search.length > 0) {
      queryRef = videosRef.where('preacher', '==', search).orderBy('date', 'desc');
    } else {
      queryRef = videosRef.orderBy('date', 'desc');
    }

    return queryRef.get();
        
    
    //snapshotChanges();
    //return videosRef.where('preacher', '==', search).get()
    /*return videosRef.get()
    .then(response => {
        debugger;
        let videos : any[] = new Array();
        response.forEach(v => {
          let d = v.data
          console.log(v.id + ' --- ' + v.data.apply);
          console.log(d);
          videos.push(v.data);
        });
        return videos;
      })*/
  }

  addVideo(video: VideoModel) {

    return this.firestore.firestore.collection('videos').add({
        date: video.date,
        url: video.url,
        preacher: video.preacher
    });
  }

  getAllPreachers() {

    return this.firestore.collection('predicadores').valueChanges()
    .pipe(
      map(response => {
        let predicadores : any[] = new Array();
        response.forEach(p => predicadores.push(p));
        return predicadores;
      })
    );
  }


  getCount(search: string) {
    return this.httpClient.get(this.baseUrl)
      .pipe(
         map((response: VideoModel[]) => {
            if (search != null && search !== undefined && search.length > 0) {
              response = response.filter(v => v.preacher === search);
            }
            return response.length;
        })
      );
  }

  mapDate(videos: VideoModel[]) {
    for (let v of videos) {
      v.date = moment(v.date);
    }
  }
}
