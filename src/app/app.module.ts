// angular modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material';
import { HttpClientModule } from '@angular/common/http';

// ngrx modules
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './state/reducers';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';

// effects
import { MainPageEffects } from './state/effects/main-page.effects';

// reducers
import * as fromMainPage from './state/reducers/main-page.reducer';

// components
import { AppComponent } from './app.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { AppHeaderComponent } from './components/app-header/app-header.component';
import { AddSequenceComponent } from './components/add-sequence/add-sequence.component';

// containers
import { AppHeaderContainerComponent } from './containers/app-header-container/app-header-container.component';
import { MainPageContainerComponent } from './containers/main-page-container/main-page-container.component';
import { AddSequenceContainerComponent } from './containers/add-sequence-container/add-sequence-container.component';

// environments
import { environment } from '../environments/environment';
import { SequenceInspectComponent } from './components/sequence-inspect/sequence-inspect.component';
import { SequenceInspectContainerComponent } from './containers/sequence-inspect-container/sequence-inspect-container.component';

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    AppHeaderComponent,
    AppHeaderContainerComponent,
    MainPageContainerComponent,
    AddSequenceComponent,
    AddSequenceContainerComponent,
    SequenceInspectComponent,
    SequenceInspectContainerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule,
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    StoreRouterConnectingModule.forRoot(),
    EffectsModule.forFeature([
      MainPageEffects,
    ]),
    StoreModule.forFeature(fromMainPage.mainPageFeatureKey, fromMainPage.reducer),
    StoreModule.forRoot(reducers, {
      metaReducers
    }),
    EffectsModule.forRoot([]),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
