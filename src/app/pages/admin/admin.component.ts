import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import * as firebase from 'firebase';
import { FirebaseApp } from '@angular/fire';
import { FirebaseAuthService } from 'app/service/firebase/firebase.auth.service';
import { Router } from '@angular/router';
import { FirebaseService } from 'app/service/firebase/firebase.service';
import { UtilService } from 'app/service/utils/util.service';
import { VideoModel } from 'app/model/video.model';

import Swal from 'sweetalert2'
import { NavbarService } from 'app/service/navbar/navbar.service';
import { FirebaseV2Service } from 'app/service/firebase/firebase.v2.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  title: string = `Administracion`;
  
  @ViewChild('main') main : ElementRef;

  // En vivo
  focusUrl;
  liveUrl;
  liveUrlSat;
  isLive;
  loadingIsLive = false;

  // Videos
  videoUrl
  date;
  preacher;
  preachers;
  focusPreacher;
  focusVideoUrl;
  focusDate;
  loadingAddVideos = false;

  // Novedades
  showNews;
  message;
  focusNews;
  loadingNews = false;

  constructor(private firebaseAuthService: FirebaseAuthService,
              private firebaseService: FirebaseService,
              private firebaseV2Service: FirebaseV2Service,
              private router: Router,
              private utilService: UtilService,
              private navbarService: NavbarService) { } 

  ngOnInit(): void {
    if (sessionStorage.getItem('user') !== null && sessionStorage.getItem('user').length > 0) {
      this.navbarService.signIn();
    }
    this.getNews();
    this.getAllPreachers();
  }

  ngAfterViewInit() {
    this.main.nativeElement.scrollIntoView({ behavior: "smooth", block: "start" });
  }
  
  getNews() {
    this.firebaseV2Service.getNews()
      .then(response => {
        this.showNews = response.data().show;
        this.message = response.data().message;
      })
      .catch(err => {
        
      });;
    this.firebaseV2Service.isLive()
      .then(response => {
          this.isLive = response.data().isLive;
          this.liveUrl = response.data().url;
          this.liveUrlSat = this.utilService.getVideoIframe(response.data().url);
      })
      .catch(err => {

      });
  }

  saveIsLive(fLive: NgForm) {
    this.loadingIsLive = true;
    this.firebaseV2Service.updateIsLive(fLive.value.isLive, fLive.value.liveUrl)
    .then(() => {
      this.loadingIsLive = false;
      console.log("isLive updated");
    })
    .catch(err => {
      this.loadingIsLive = false;
      console.log("isLive NOT updated");
    });;
  }

  addVideo(fAddVideo: NgForm) {
    debugger;
    this.loadingAddVideos = true;
    let selectedDate = this.date.year + "-" + this.fill(this.date.month) + "-" + this.fill(this.date.day);
    this.firebaseV2Service.addVideo(this.videoUrl, this.preacher.preacher, selectedDate)
    .then((response) => {
      this.loadingAddVideos = false;
      console.log("Video created");
    })
    .catch(err => {
      this.loadingAddVideos = false;
      console.log("Video not created");
    });;

  }

  fill(date) {
    if (date !== null && date < 10 ){
      date = `0${date}`;
    }
    return date;
  }

    /**
   * Get all preachers in the database.
   */
  getAllPreachers() {
    this.firebaseV2Service.getAllPreachers()
      .subscribe((response) => {
        debugger;
        for (let i = 0; i< response.length; i++) {
          if (response[i].preacher === 'todos') {
            response.splice(i, 1);
          }
        }
        this.preachers = response;
        this.preacher = response[0];
      })
  }

  saveShowNews(fNews: NgForm) {
    this.loadingNews = true;
    this.firebaseV2Service.updateNews(fNews.value.showNews, fNews.value.message)
    .then(() => {
      this.loadingNews = false;
      console.log("News updated");
    })
    .catch(err => {
      this.loadingNews = false;
      console.log("News NOT updated");
    });;
  }
}
