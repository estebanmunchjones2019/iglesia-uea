import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { LandingComponent } from './landing/landing.component';
import { ProfileComponent } from './profile/profile.component';
import { SignupComponent } from './signup/signup.component';
import { MultimediaComponent } from './multimedia/multimedia.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormComponent } from '../components/custom/form/form.component';
import { NosotrosComponent } from './nosotros/nosotros.component';
import { LoadingComponent } from 'app/components/custom/loading/loading.component';
import { VideoComponent } from 'app/components/custom/video/video.component';
import { SpinnerComponent } from 'app/components/custom/spinner/spinner.component';
import { WatchVideoComponent } from './watch-video/watch-video.component';



@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        NgbModule,
        NgxPaginationModule
    ],
    declarations: [
        LandingComponent,
        SignupComponent,
        ProfileComponent,
        MultimediaComponent,
        FormComponent,
        NosotrosComponent,
        LoadingComponent,
        VideoComponent,
        SpinnerComponent,
        WatchVideoComponent
    ]
})
export class PagesModule { }
