import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CredentialComponent } from './credential/credential.component';
import { SearchComponent } from './form/search/search.component';
import {FormsModule} from "@angular/forms";
import {ReactiveFormsModule} from "@angular/forms";
import { CtaButtonComponent } from './form/button/cta-button/cta-button.component';
import { CredentialsComponent } from './pages/credentials/credentials.component';
import { SuccessButtonComponent } from './form/button/success-button/success-button.component';
import { FloatingButtonComponent } from './form/button/floating-button/floating-button.component';
import { CreateCredentialComponent } from './forms/create-credential/create-credential.component';
import { ModalComponent } from './modal/modal.component';
import { IconComponent } from './icon/icon.component';
import { FilteredCredentialListComponent } from './forms/filtered-credential-list/filtered-credential-list.component';
import { EnterEncryptionKeyComponent } from './forms/enter-encryption-key/enter-encryption-key.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { IconButtonComponent } from './form/button/icon-button/icon-button.component';
import { ConfirmCredentialRemovalComponent } from './forms/confirm-credential-removal/confirm-credential-removal.component';
import { LoaderComponent } from './loader/loader.component';
import { ReceivedSharedCredentialComponent } from './forms/received-shared-credential/received-shared-credential.component';
import { SharedCredentialComponent } from './forms/shared-credential/shared-credential.component';

@NgModule({
  declarations: [
    AppComponent,
    CredentialComponent,
    SearchComponent,
    CtaButtonComponent,
    CredentialsComponent,
    SuccessButtonComponent,
    FloatingButtonComponent,
    CreateCredentialComponent,
    ModalComponent,
    IconComponent,
    FilteredCredentialListComponent,
    EnterEncryptionKeyComponent,
    IconButtonComponent,
    ConfirmCredentialRemovalComponent,
    LoaderComponent,
    ReceivedSharedCredentialComponent,
    SharedCredentialComponent,
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        BrowserAnimationsModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
