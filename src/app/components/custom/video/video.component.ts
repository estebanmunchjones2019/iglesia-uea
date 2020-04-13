import { Component, OnInit, Input } from '@angular/core';
import { VideoModel } from 'app/model/video.model';
import { DomSanitizer } from '@angular/platform-browser';
import { NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss']
})
export class VideoComponent implements OnInit {
  @Input() video: VideoModel;
  videoUrl;

  constructor( 
    private _sanitizer: DomSanitizer,
    public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
    this.videoUrl = this.getVideoIframe(this.video.url);
  }

  getVideoIframe(url) {
    var video, results;

    if (url === null) {
      return '';
    }
    results = url.match('[\\?&]v=([^&#]*)');
    video   = (results === null) ? url : results[1];

    return this._sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/' + video);
  }

}
