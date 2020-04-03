import {
  Component, ElementRef, OnInit, OnDestroy, ViewChild, ChangeDetectorRef
} from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { VideoService } from '../../service/video/video.service';
import { VideoModel } from '../../model/video.model';

@Component({
  selector: 'app-multimedia',
  templateUrl: './multimedia.component.html',
  styleUrls: ['./multimedia.component.scss']
})
export class MultimediaComponent implements OnInit, OnDestroy {

  @ViewChild('multimedia')
  multimedia: ElementRef;

  private showAnimations = false;

  private videos : VideoModel[];
  private urlVideosSat: SafeResourceUrl[] = [];
  private loading = false;

  config = {
    id: 123456,
    itemsPerPage: 4,
    currentPage: 1,
    totalItems: 11
  };

  constructor(private videoService: VideoService,
              private _sanitizer: DomSanitizer,
              private changeDetectorRef: ChangeDetectorRef) {

  }

  ngOnInit() {
    //this.getCountVideos();
    this.getAllVideos(this.config.currentPage - 1, this.config.itemsPerPage);
  }

  ngOnDestroy() {
    
  }

  getAllVideos(page, size) {
    this.videoService.getAllVideos(page, size)
      .subscribe((response) => {
        this.videos = response;
        for(let v of response) {
          this.urlVideosSat.push(this.getVideoIframe(v.url));
        }
        this.loading = false;
      })
  }

  getCountVideos() {
    this.videoService.getCount()
      .subscribe((response: number) => {
        this.config.totalItems = response;
      })
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

  pageChanged(event, p) {
    this.config.currentPage = event
    this.getAllVideos(this.config.currentPage - 1, this.config.itemsPerPage);
    this.changeDetectorRef.detectChanges();
  }
}
