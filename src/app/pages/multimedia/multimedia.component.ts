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

@Component({
  selector: 'app-multimedia',
  templateUrl: './multimedia.component.html',
  styleUrls: ['./multimedia.component.scss']
})
export class MultimediaComponent implements OnInit, OnDestroy {

  @ViewChild('multimedia')
  multimedia: ElementRef;

  private showAnimations = false;

  public lastSearch: string;

  private videos : VideoModel[];
  private preachers : string[];
  private urlVideosSat: SafeResourceUrl[] = [];
  private loading = false;

  config = {
    id: 123456,
    itemsPerPage: 6,
    currentPage: 1,
    totalItems: 0
  };

  constructor(private videoService: VideoService,
              private _sanitizer: DomSanitizer,
              private changeDetectorRef: ChangeDetectorRef,
              private modalService: NgbModal,
              private router: Router) {

                this.getCountVideos(null);
  }

  ngOnInit() {
    this.getAllVideosPaginated(this.config.currentPage - 1, this.config.itemsPerPage, null);
    this.getAllPreachers();
  }

  ngOnDestroy() {
  }

  getAllVideosPaginated(page, size, search) {
    this.videoService.getAllVideos(page, size, search)
      .subscribe((response) => {
        this.videos = response;
        for(let v of response) {
          this.urlVideosSat.push(this.getVideoIframe(v.url));
        }
      })
  }

  getAllPreachers() {
    this.videoService.getAllPreachers()
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

  pageChanged(event, p) {
    this.config.currentPage = event
    this.getAllVideosPaginated(this.config.currentPage - 1, this.config.itemsPerPage, this.lastSearch);
    this.changeDetectorRef.detectChanges();
  }

  search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term => term.length === 0 ? this.preachers
        : this.preachers.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1)
          .slice(0, 10))
    )

  selectedItem(event: any) {
    this.lastSearch = event.item;
    this.config.currentPage = 1;
    this.getCountVideos(this.lastSearch);
    this.getAllVideosPaginated(this.config.currentPage - 1, this.config.itemsPerPage, this.lastSearch);
  }

  onChange(event: any) {
    console.log("onchange input");
    if (this.lastSearch !== null && this.lastSearch !== undefined && this.lastSearch.length == 0) {
      this.config.currentPage = 1;
      this.getCountVideos(this.lastSearch);
      this.getAllVideosPaginated(this.config.currentPage - 1, this.config.itemsPerPage, this.lastSearch);
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
    debugger;
    let results = video.url.match('[\\?&]v=([^&#]*)');
    let show = 'https://www.youtube.com/' + results[1];
    this.router.navigate([show]);
  }

  onClick(url: string) {
    window.location.href= url; 
  }
}
