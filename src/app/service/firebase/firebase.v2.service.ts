import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {VideoModel} from "../../model/video.model";
import * as moment from "moment";
import {map} from "rxjs/internal/operators";

import { AngularFirestore } from '@angular/fire/firestore';

import * as uuid from 'uuid';

@Injectable()
export class FirebaseV2Service {

  private baseUrl: string = "/assets/json/videos.json";

  constructor(private httpClient: HttpClient,
    private firestore: AngularFirestore) {
  }

  getAllVideos(video, action, size: number, search: string): Promise<any> {
   
    return this.firestore.firestore.collection('videos-v2').doc('content')
    .get()
    .then(response => {
      let videos = new Array();
      let data = response.data();
      let content = JSON.parse(data.videos);
      content.forEach(element => {
        videos.push({
          id : element.id,
          data: function data() {
            return element.data;
          }
        })
      });
      return this.filterVideos(videos, video, action, size, search);
    });
  }

  getVideoById(id) {
    //return this.firestore.firestore.collection('videos').doc(id).get();
    return this.firestore.firestore.collection('videos-v2').doc('content')
    .get()
    .then(response => {
      debugger;
      let video = null;
      let data = response.data();
      let content = JSON.parse(data.videos);
      content.forEach(element => {
        if (element.id == id) {
          video = {
            id : element.id,
            data: function data() {
             return element.data;
            }
          }
        }
      });
      return video;
    });
  }

  addVideo(url, preacher, date) {

    return this.firestore.firestore.collection('videos-v2').doc('content')
    .get()
    .then(response => {
      let data = response.data();
      let content = JSON.parse(data.videos);
      content.push({
        id: uuid.v4(),
        data: {
          date: date,
          url: url,
          preacher: preacher
        }
      });
     
      let updated = {
        "videos": JSON.stringify(content)
      }
      return this.firestore.firestore.collection('videos-v2').doc('content').set(updated);
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

  updateIsLive(isLive, url) {
    let data = {
      "url": url,
      "isLive": isLive
    }
    return this.firestore.firestore.collection('novedades').doc('envivo').set(data);
  }

  updateNews(showNews, message) {
    let data = {
      "show": showNews,
      "message": message
    }
    return this.firestore.firestore.collection('novedades').doc('novedad').set(data);
  }

private filterVideos(videos: Array<any>, video, action, size: number, search: string): Array<any> {

  videos = videos.sort((a, b) => {
    // order by dates
    let dateA = new Date(a.data().date);
    let dateB = new Date(b.data().date);
    return (dateB.getTime() - dateA.getTime());
    });
  videos = videos.filter(f => {
    // preacher filter
    if (search !== null && search !== undefined && search.length > 0 && 'todos'.localeCompare(search) !== 0) {
      return f.data().preacher == search;
    } else {
      return true;
    }
  })
  let videoIndex = 0;
  if (video !== null && video !== undefined && video.id !== null && video.id !== undefined) {
    for (let i = 0; i < videos.length; i++) {
      if ( videos[i].id == video.id) {
        videoIndex = i;
      }
    }
  }  
  let first, last;
  if (action == null) {
    first = 0;
    last = size - 1;
  } else if (action === 'next') {
    first = videoIndex + 1;
    last = first + size - 1;
  } else if (action === 'previous') {
    first = videoIndex - size;
    last = first + size - 1;
  }

  return videos.filter((f, index) => {
    // paginated filter
    if (size == null) {
      return true;
    }
    return (index >= first && index <= last)
  })
}

  getCount(search: string) {
    return this.firestore.firestore.collection('videos-v2').doc('content')
    .get()
    .then(response => {
      let videos = new Array();
      let data = response.data();
      let content = JSON.parse(data.videos);
      content.forEach(element => {
        videos.push({
          id : element.id,
          data: function data() {
            return element.data;
          }
        })
      });
      return this.filterVideos(videos, null, null, null, search);
    });
  }

  mapDate(videos: VideoModel[]) {
    for (let v of videos) {
      v.date = moment(v.date);
    }
  }
}
