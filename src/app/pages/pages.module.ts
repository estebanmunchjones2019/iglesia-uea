import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { LandingComponent } from './landing/landing.component';
import { ProfileComponent } from '../components/profile/profile.component';
import { SignupComponent } from '../components/signup/signup.component';
import { MultimediaComponent } from './multimedia/multimedia.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormComponent } from '../components/custom/form/form.component';
import { NosotrosComponent } from './nosotros/nosotros.component';
import { SpinnerComponent } from 'app/components/custom/spinner/spinner.component';
import { WatchVideoComponent } from './watch-video/watch-video.component';
import { AdminComponent } from './admin/admin.component';
import { LoginComponent } from './login/login.component';
import { CreerComponent } from './creer/creer.component';



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
        SpinnerComponent,
        WatchVideoComponent,
        AdminComponent,
        LoginComponent,
        CreerComponent
    ]
})
export class PagesModule { }
