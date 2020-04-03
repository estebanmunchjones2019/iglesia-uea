import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {VideoModel} from "../../model/video.model";
import * as moment from "moment";
import {map} from "rxjs/internal/operators";

@Injectable()
export class VideoService {
  private baseUrl: string = "https://localhost:8095/api"

  constructor(private httpClient: HttpClient) {
  }

  getAllVideos(page, size) {
    //let url = this.baseUrl + '/videos';
    let url = "/assets/json/multimedia-example.json"

    if ((page !== null && page !== undefined) && (size !== null && size !== undefined))
    {
      url = url.concat('?page=' + page.toString() + '&size=' + size.toString());
    }

    let headers = new HttpHeaders();
    //headers = headers.set('Authorization', 'Bearer ' + localStorage.getItem('access_token'));

    return this.httpClient.get(url, { headers: headers})
      .pipe(
      map((response: VideoModel[]) => {
        this.mapDate(response);
        return response;
      })
      );
  }

  getCount() {
    const url = this.baseUrl + '/videos/count';

    let headers = new HttpHeaders();
    //headers = headers.set('Authorization', 'Bearer ' + localStorage.getItem('access_token'));

    return this.httpClient.get(url, { headers: headers});
  }

  mapDate(videos: VideoModel[]) {
    for (let v of videos) {
      v.date = moment(v.date);
    }
  }
}
