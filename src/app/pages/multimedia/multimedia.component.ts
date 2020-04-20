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
  private urlVideosSat: SafeResourceUrl[] = [];
  private loading = false;
  public preacher: string;

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
    this.getAllVideosPaginated(this.config.currentPage - 1, this.config.itemsPerPage, null);
    this.getAllPreachers();
  }

  ngOnDestroy() {
  }

  getAllVideosPaginated(page, size, search) {
    this.firebaseService.getAllVideos(page, size, search)
      .then((response) => {
        this.videos = new Array();
        response.forEach(data => {
          this.videos.push({
            id: data.id,
            data: data.data()
          });
        });

        //for(let v of response) {
        //  this.urlVideosSat.push(this.getVideoIframe(v.url));
        //}
      })
  }

  getAllPreachers() {
    this.firebaseService.getAllPreachers()
      .subscribe((response) => {
        this.preachers = response;
      })
  }

  getCountVideos(search: string) {
    this.videoService.getCount(search)
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

  pageChanged(event) {
    this.config.currentPage = event
    this.getAllVideosPaginated(this.config.currentPage - 1, this.config.itemsPerPage, this.lastSearch);
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
    debugger;
    this.lastSearch.preacher = event.item.preacher;
      //this.preacher = this.lastSearch.preacher;
    
    this.config.currentPage = 1;
    this.getCountVideos(this.lastSearch.preacher);
    this.getAllVideosPaginated(this.config.currentPage - 1, this.config.itemsPerPage, this.lastSearch.preacher);
  
  }

  onChange(event: any) {
    debugger;

    if (event !== null && event !== undefined) {
      if (event == "") {
        this.config.currentPage = 1;
        this.getCountVideos("");
        this.getAllVideosPaginated(this.config.currentPage - 1, this.config.itemsPerPage, "");
      } else if(event.preacher !== null && event.preacher !== undefined && event.preacher.length > 0) {
        this.preacher = event.preacher;
      }
    }

    /*this.preacher = this.lastSearch.preacher;
    // Cuando se borra la busqueda y queda vacía volvemos a cargar todos los predicadores
    if (this.lastSearch !== null && this.lastSearch !== undefined 
      && this.lastSearch.preacher !== null && this.lastSearch.preacher !== undefined 
      && this.lastSearch.preacher.length == 0) {
        this.config.currentPage = 1;
        this.getCountVideos(this.lastSearch.preacher);
        this.getAllVideosPaginated(this.config.currentPage - 1, this.config.itemsPerPage, this.lastSearch.preacher);
    }*/
   
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
