import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {VideoModel} from "../../model/video.model";
import * as moment from "moment";
import {map} from "rxjs/internal/operators";

import { AngularFirestore } from '@angular/fire/firestore';

@Injectable()
export class VideoService {
  private baseUrl: string = "/assets/json/videos.json";

  constructor(private httpClient: HttpClient,
    private firestore: AngularFirestore) {
  }

  getAllVideos(page, size, search: string) {

    return this.httpClient.get(this.baseUrl)
      .pipe(
        map((response: VideoModel[]) => {
          if (search != null && search !== undefined && search.length > 0) {
            response = response.filter(v => v.preacher === search);
          }
          if (page != null && page !== undefined && size != null && size !== undefined) {
            response = response.slice(page * size, (page * size) + size);
            console.log("page: " + page + " size: " + size);
            console.log(response);
          }
          //this.mapDate(response);
          return response;
        })
      );
  }

  getAllPreachers() {

    return this.httpClient.get(this.baseUrl)
      .pipe(
        map((response: VideoModel[]) => {
          let preachers = response.map(v => v.preacher)
            .filter((value, index, self) => self.indexOf(value) === index);
          return preachers;
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
