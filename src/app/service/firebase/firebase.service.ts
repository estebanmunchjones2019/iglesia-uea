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

  getAllVideos(video, action, size: number, search: string) {

    let videosRef = this.firestore.firestore.collection('videos');
    let queryRef;
    
    // Filtramos por predicador
    if (search !== null && search !== undefined && search.length > 0 && 'todos'.localeCompare(search) !== 0) {
      queryRef = videosRef.where('preacher', '==', search).orderBy('date', 'desc');
    } else {
      queryRef = videosRef.orderBy('date', 'desc');
    }

    // Aplicamos paginado
    if (video == null) {
      queryRef = queryRef.limit(size);
    } else {
      if (action === 'next') {
          queryRef = queryRef.startAfter(video.data.date).limit(size);
      } else if (action === 'previous') {
          queryRef = queryRef.endBefore(video.data.date).limitToLast(size);
      }
    }
    return queryRef.get();
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

  getNews() {
     return this.firestore.firestore.collection('novedades').doc('novedad').get()
  }

  isLive() {
    return this.firestore.firestore.collection('novedades').doc('envivo').get()
  }

  getCount(search: string) {
   let videosRef = this.firestore.firestore.collection('videos');
   let queryRef;
    
    // Filtramos por predicador
    if (search !== null && search !== undefined && search.length > 0 && 'todos'.localeCompare(search) !== 0) {
      queryRef = videosRef.where('preacher', '==', search);
    } else {
      queryRef = videosRef;
    }
    return queryRef.get();
  }

  mapDate(videos: VideoModel[]) {
    for (let v of videos) {
      v.date = moment(v.date);
    }
  }
}
