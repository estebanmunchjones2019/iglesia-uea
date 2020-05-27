import { Component, OnInit } from '@angular/core';
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

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  title: string = `Administracion`;
  
  public model = {
    editorData: '<p>Hello, world!</p>'
};

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
  loadingVideos = false;

  // Novedades
  showNews;
  message;
  focusNews;
  loadingNews = false;

  constructor(private firebaseAuthService: FirebaseAuthService,
              private firebaseService: FirebaseService,
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

  signOut() {
    let that = this;
    this.firebaseAuthService.signOut().then(() => {
        that.router.navigate(['']);
    })
  }
  
  getNews() {
    this.firebaseService.getNews()
      .then(response => {
        this.showNews = response.data().show;
        this.message = response.data().message;
      })
      .catch(err => {
        
      });;
    this.firebaseService.isLive()
      .then(response => {
          this.isLive = response.data().isLive;
          this.liveUrl = response.data().url;
          this.liveUrlSat = this.utilService.getVideoIframe(response.data().url);
      })
      .catch(err => {

      });
  }

  saveIsLive(fLive: NgForm) {
   /* Swal.fire({
      title: 'Actualizando',
      allowEscapeKey: false,
      allowOutsideClick: false,
      timer: 20000,
      onOpen: () => {
        Swal.showLoading();
      },
      showClass: {
        popup: 'animated fadeIn faster'
      },
      hideClass: {
        popup: 'animated fadeOut faster'
      },
    })
*/
    this.loadingIsLive = true;
    this.firebaseService.updateIsLive(fLive.value.isLive, fLive.value.liveUrl)
    .then(() => {
      //Swal.close();
      this.loadingIsLive = false;
      console.log("isLive updated");
    })
    .catch(err => {
      this.loadingIsLive = false;
      console.log("isLive NOT updated");
    });;
  }

  addVideo(fAddVideo: NgForm) {
    this.loadingVideos = true;
    let selectedDate = this.date.year + "-" + this.date.month + "-" + this.date.day;
    this.firebaseService.addVideo(this.videoUrl, this.preacher, selectedDate)
    .then((response) => {
      this.loadingVideos = false;
      console.log("Video created");
    })
    .catch(err => {
      this.loadingVideos = false;
      console.log("Video not created");
    });;

  }

    /**
   * Get all preachers in the database.
   */
  getAllPreachers() {
    this.firebaseService.getAllPreachers()
      .subscribe((response) => {
        for (let i = 0; i< response.length; i++) {
          if (response[i].preacher === 'todos') {
            response.splice(i, 1);
          }
        }
        this.preachers = response;
        this.preacher = this.preachers[0];
      })
  }

  saveShowNews(fNews: NgForm) {
    this.loadingNews = true;
    this.firebaseService.updateNews(fNews.value.showNews, fNews.value.message)
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
