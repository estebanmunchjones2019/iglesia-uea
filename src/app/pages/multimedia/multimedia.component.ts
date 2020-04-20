import {
  Component, ElementRef, OnInit, OnDestroy, ViewChild, ChangeDetectorRef
} from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { VideoService } from '../../service/video/video.service';
import { VideoModel } from '../../model/video.model';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { VideoComponent } from 'app/components/custom/video/video.component';
import { Router } from '@angular/router';
import { PreacherModel } from '../../model/preacher.model';
import { environment } from 'environments/environment';
import { FirebaseService } from 'app/service/firebase/firebase.service';

@Component({
  selector: 'app-multimedia',
  templateUrl: './multimedia.component.html',
  styleUrls: ['./multimedia.component.scss']
})
export class MultimediaComponent implements OnInit, OnDestroy {

  private showAnimations = false;

  public lastSearch: PreacherModel = new PreacherModel;

  public videos : any[];
  private preachers : PreacherModel[];
  private loading = true;
  public preacher: string;
  public localCurrentPage = 1;

  config = {
    id: 123456,
    itemsPerPage: 6,
    currentPage: 1,
    totalItems: 0
  };

  formatter = (result: PreacherModel) => result.preacher.toUpperCase();

  constructor(private videoService: VideoService,
              private firebaseService: FirebaseService,
              private _sanitizer: DomSanitizer,
              private changeDetectorRef: ChangeDetectorRef,
              private modalService: NgbModal,
              private router: Router) {

              this.getCountVideos(null);
              /*this.videoService.getAllVideos(null, null, null)
              .subscribe((response: VideoModel[]) => {
                response.forEach(video => this.firebaseService.addVideo(video).then((v)=>console.log(v)));
              });*/
  }

  ngOnInit() {
    this.getAllVideosPaginated(null, null, this.config.itemsPerPage, null);
    this.getAllPreachers();
  }

  ngOnDestroy() {
  }

  getAllVideosPaginated(video, page, size, search) {
    this.firebaseService.getAllVideos(video, page, size, search)
      .then((response) => {
        this.videos = new Array();
        response.forEach(data => {
          this.videos.push({
            id: data.id,
            data: data.data()
          });
        });
        this.loading = false;
      })
  }

  getAllPreachers() {
    this.firebaseService.getAllPreachers()
      .subscribe((response) => {
        this.preachers = response;
      })
  }

  getCountVideos(search: string) {
    let count = 0;
    this.config.totalItems = this.firebaseService.getCount(search)
    .then(response => {
      response.forEach(resp => {
        count += 1;
      })
      this.config.totalItems = count;
    });
  }

  pageChanged(event) {
    if (event === 0 || (event * this.config.itemsPerPage - event > this.config.totalItems) ) {
      return;
    }
    let lastVideo;
    let p;
    if ( event > this.localCurrentPage) {
      lastVideo = this.videos[this.videos.length - 1];
      p = "next"
    } else {
      lastVideo = this.videos[0];
      p = "previous";
    }
    this.config.currentPage = event
    this.localCurrentPage = event;
    this.getAllVideosPaginated(lastVideo, p , this.config.itemsPerPage, this.lastSearch);
    this.changeDetectorRef.detectChanges();
  }

  search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term => term.length === 0 ? this.preachers
        : this.preachers.filter(v => v.preacher.toLowerCase().indexOf(term.toLowerCase()) > -1)
          .slice(0, 10))
    )

  selectedItem(event: any) {
    this.lastSearch.preacher = event.item.preacher;
    this.config.currentPage = 1;
    this.getCountVideos(this.lastSearch.preacher);
    this.getAllVideosPaginated(null, null, this.config.itemsPerPage, this.lastSearch.preacher);
  }

  onChange(event: any) {
    if (event !== null && event !== undefined) {
      if (event == "") {
        this.config.currentPage = 1;
        this.getCountVideos("");
        this.getAllVideosPaginated(null, null, this.config.itemsPerPage, "");
      } else if(event.preacher !== null && event.preacher !== undefined && event.preacher.length > 0) {
        this.preacher = event.preacher;
      }
    }
  }

  public onFocus(e: Event): void {
    e.stopPropagation();
    setTimeout(() => {
      const inputEvent: Event = new Event('input');
      e.target.dispatchEvent(inputEvent);
    }, 0);
  }

  public openModal(video: VideoModel) {
    const modalRef = this.modalService.open(VideoComponent, { windowClass: 'my-class'});
    modalRef.componentInstance.video = video;
  }

  public openOnYoutube(video: VideoModel) {
    let results = video.url.match('[\\?&]v=([^&#]*)');
    let show = 'https://www.youtube.com/' + results[1];
    this.router.navigate([show]);
  }

  onClick(url: string) {
    window.open(url, '_blank'); 
  }
}
