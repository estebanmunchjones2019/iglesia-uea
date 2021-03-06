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
  Component, ElementRef, OnInit, OnDestroy, ViewChild, ChangeDetectorRef
} from '@angular/core';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { Router } from '@angular/router';

import { VideoModel } from '../../model/video.model';
import { PreacherModel } from '../../model/preacher.model';
import { VideoService } from '../../service/video/video.service';
import { FirebaseService } from 'app/service/firebase/firebase.service';
import { FirebaseV2Service } from 'app/service/firebase/firebase.v2.service';

@Component({
  selector: 'app-multimedia',
  templateUrl: './multimedia.component.html',
  styleUrls: ['./multimedia.component.scss']
})
export class MultimediaComponent implements OnInit, OnDestroy {

  @ViewChild("preacherInput") preacherInput: ElementRef;

  @ViewChild('videoContainer') videoContainer: ElementRef;

  public lastSearch: PreacherModel = new PreacherModel;

  public videos : any[];
  private preachers : PreacherModel[];
  public loading = true;
  public preacher: string;
  public nextDisabled = false;
  public prevDisabled = true;

  config = {
    id: 123456,
    itemsPerPage: 6,
    currentPage: 1,
    totalItems: 0
  };

  formatter = (result: PreacherModel) => result.preacher.toUpperCase();

  constructor(private videoService: VideoService,
              private firebaseService: FirebaseService,
              private firebaseV2Service: FirebaseV2Service,
              private changeDetectorRef: ChangeDetectorRef,
              private router: Router) {

              this.getCountVideos(null);
              //this.importVideos();
  }

  ngOnInit() {
    this.getAllVideosPaginated(null, null, this.config.itemsPerPage, null);
    this.getAllPreachers();
  }

  ngAfterViewInit() {
    this.videoContainer.nativeElement.scrollIntoView({ behavior: "smooth", block: "start" });
  }
  ngOnDestroy() {
  }

  /**
   * Get all videos paginated and filterd.
   * @param video 
   * @param page 
   * @param size 
   * @param search 
   */
  getAllVideosPaginated(video, action, size, search) {
    this.firebaseV2Service.getAllVideos(video, action, size, search)
      .then((response) => {
        this.videos = new Array();
        response.forEach(data => {
          this.videos.push({
            id: data.id,
            data: data.data()
          });
        });
        this.loading = false;

        if (this.config.currentPage === 1) {
          this.prevDisabled = true;
        } else {
          this.prevDisabled = false;
        }
        if (this.config.currentPage * this.config.itemsPerPage  >= this.config.totalItems) {
          this.nextDisabled = true;
        } else {
          this.nextDisabled = false;
        }
      })
  }

  /**
   * Get all preachers in the database.
   */
  getAllPreachers() {
    this.firebaseV2Service.getAllPreachers()
      .subscribe((response) => {
        this.preachers = response;
      })
  }

  /**
   * Get total count of videos.
   * @param search 
   */
  getCountVideos(search: string) {
    let count = 0;
    this.firebaseV2Service.getCount(search)
    .then(response => {
      response.forEach(resp => {
        count += 1;
      })
      this.config.totalItems = count;
      if (this.config.itemsPerPage < count) {
        this.nextDisabled = false;
      } else {
        this.nextDisabled = true;
      }
      this.prevDisabled = true;
    });
  }

  /**
   * If count of videos is 0 then import videos from json.
   */
  importVideos() {
    this.firebaseV2Service.getCount(null)
      .then(response => {
        let count = 0;
        response.forEach(resp => {
          count += 1;
        });
        console.log("Count of videos: " + count);
        if (count === 0) {
          //console.log("Importing videos");
          this.videoService.getAllVideos(null, null, null)
            .subscribe((response: VideoModel[]) => {
              //response.forEach(video => this.firebaseService.addVideo(video).then((v)=>console.log(v)));
            });
        } else {
          console.log("Not importing");
        }
      })
  }

  /**
   * Method to move pagination forward and backward.
   * @param event 
   */
  pageChanged(event) {
  
    this.loading = true;
    if (event === 0 || (event * this.config.itemsPerPage - this.config.itemsPerPage >= this.config.totalItems) ) {
      return;
    }

    this.prevDisabled = true;
    this.nextDisabled = true;

    let lastVideo;
    let action;
    if ( event > this.config.currentPage) {
      lastVideo = this.videos[this.videos.length - 1];
      action = "next";
    } else {
      lastVideo = this.videos[0];
      action = "previous";
    }
    this.config.currentPage = event;
    this.getAllVideosPaginated(lastVideo, action , this.config.itemsPerPage, this.lastSearch.preacher);
    this.changeDetectorRef.detectChanges();
  }

  /**
   * Type ahead of preacher search.
   */
  search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term => term.length === 0 ? this.preachers
        : this.preachers.filter(v => v.preacher.toLowerCase().indexOf(term.toLowerCase()) > -1)
          .slice(0, 10))
    )

    /**
     * 
     * @param event Event trigger when a preacher is selected.
     */
  selectedItem(event: any) {
    this.preacherInput.nativeElement.blur();

    event.preventDefault();
    this.lastSearch.preacher = event.item.preacher;
    this.preacher = this.lastSearch.preacher;
    this.config.currentPage = 1;
    this.getCountVideos(this.lastSearch.preacher);
    this.getAllVideosPaginated(null, null, this.config.itemsPerPage, this.lastSearch.preacher);
  }

  /**
   * Format when item selected on search
   * @param value 
   */
  resultFormatBandListValue(value: any) {
    return value.preacher;
  }

  /**
   * Event trigger when touch input search.
   * @param e 
   */
  public onFocus(e: Event): void {
    e.stopPropagation();
    setTimeout(() => {
      const inputEvent: Event = new Event('input');
      e.target.dispatchEvent(inputEvent);
    }, 0);
  }

  public onClick(video: VideoModel) {
    this.router.navigate(['/video', video.id]);
  }

  /**
   * Open link in a different tab.
   * @param url 
   */
  
}
