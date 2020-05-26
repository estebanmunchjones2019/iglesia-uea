import { Injectable } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";

@Injectable()
export class UtilService {

  constructor(private _sanitizer: DomSanitizer) {}

  getVideoIframe(url: string) {
    var video, results;

    if (url === null) {
      return '';
    }
    results = url.match('[\\?&]v=([^&#]*)');
    video   = (results === null) ? results = url.substring(url.lastIndexOf('/') + 1, url.length) : results[1];
    video = (video === null) ? video : video.replace('?t=', '?start=')
    return this._sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/' + video);
  }
}