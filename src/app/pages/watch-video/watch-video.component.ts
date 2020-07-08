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

import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { VideoModel } from '../../model/video.model';
import { FirebaseService } from 'app/service/firebase/firebase.service';
import { UtilService } from 'app/service/utils/util.service';

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

  constructor(private route: ActivatedRoute,
              private firebaseService: FirebaseService,
              private utilService: UtilService) {

    this.loading = true;
    this.route.paramMap.subscribe(params => {
      this.getVideoById(params.get('id'));
    })
            
  }

  ngOnInit(): void {
  }

  getVideoById(id) {
    this.firebaseService.getVideoById(id)
      .then((response) => {
        this.video.id = response.id;
        this.video.date = response.data().date;
        this.video.url = response.data().url;
        this.video.preacher = response.data().preacher;
        this.videoUrl = this.utilService.getVideoIframe(this.video.url);
        this.videoContainer.nativeElement.scrollIntoView({ behavior: "smooth", block: "start" });
        this.loading = false;
      })
  }
  
}
