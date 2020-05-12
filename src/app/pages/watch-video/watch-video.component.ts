/*!

 =========================================================
 * Paper Kit 2 Angular - v1.3.0
 =========================================================

 * Product Page: https://www.creative-tim.com/product/paper-kit-2-angular
 * Copyright 2017 Creative Tim (https://www.creative-tim.com)
 * Licensed under MIT (https://github.com/timcreative/paper-kit/blob/master/LICENSE.md)

 =========================================================

 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 */

import {
  Component, ElementRef, OnInit, AfterViewInit, ChangeDetectorRef, ViewChild
} from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { VideoService } from '../../service/video/video.service';
import { VideoModel } from '../../model/video.model';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { VideoComponent } from 'app/components/custom/video/video.component';
import { Router, ActivatedRoute } from '@angular/router';
import { PreacherModel } from '../../model/preacher.model';
import { environment } from 'environments/environment';
import { FirebaseService } from 'app/service/firebase/firebase.service';

@Component({
  selector: 'app-watch-video',
  templateUrl: './watch-video.component.html',
  styleUrls: ['./watch-video.component.scss']
})
export class WatchVideoComponent implements OnInit {

  video: VideoModel = new VideoModel();

  public videoUrl;
  public loading = true;

  @ViewChild('videoContainer') videoContainer: ElementRef;

  constructor(private videoService: VideoService,
              private _sanitizer: DomSanitizer,
              private changeDetectorRef: ChangeDetectorRef,
              private modalService: NgbModal,
              private router: Router,
              private route: ActivatedRoute,
              private firebaseService: FirebaseService) {

                this.loading = true;
                this.route.paramMap.subscribe(params => {
                  this.getVideoById(params.get('id'));
                })
            
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {    
  }

  getVideoById(id) {
    this.firebaseService.getVideoById(id)
      .then((response) => {
        debugger;
        this.video.id = response.id;
        this.video.date = response.data().date;
        this.video.url = response.data().url;
        this.video.preacher = response.data().preacher;
        this.videoUrl = this.getVideoIframe(this.video.url);
        this.videoContainer.nativeElement.scrollIntoView({ behavior: "smooth", block: "start" });
        this.loading = false;
      })
  }

  getVideoIframe(url: string) {
    var video, results;

    if (url === null) {
      return '';
    }
    results = url.match('[\\?&]v=([^&#]*)');
    video   = (results === null) ? results = url.substring(url.lastIndexOf('/') + 1, url.length) : results[1];
    return this._sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/' + video);
  }
  
}
