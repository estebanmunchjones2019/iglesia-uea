import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { LandingComponent } from './landing/landing.component';
import { ProfileComponent } from './profile/profile.component';
import { SignupComponent } from './signup/signup.component';
import { MultimediaComponent } from './multimedia/multimedia.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { HeaderComponent } from '../components/custom/header/header.component';
import { ContainerIntroComponent } from '../components/custom/container-intro/container-intro.component';
import { ReunionesComponent } from '../components/custom/reuniones/reuniones.component';
import { ReunionComponent } from '../components/custom/reuniones/reunion/reunion.component';
import { FormComponent } from '../components/custom/form/form.component';
import { NosotrosComponent } from './nosotros/nosotros.component';
import { LoadingComponent } from 'app/components/custom/loading/loading.component';


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
        HeaderComponent,
        ContainerIntroComponent,
        ReunionesComponent,
        ReunionComponent,
        FormComponent,
        NosotrosComponent,
        LoadingComponent
    ]
})
export class PagesModule { }
