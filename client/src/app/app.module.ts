import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {RouterModule} from '@angular/router'
import {FormsModule} from '@angular/forms'
import {NgToastModule} from 'ng-angular-popup';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { LandingComponent } from './components/landing/landing.component';
import { PlayerComponent } from './components/player/player.component';
import { GuessAreaComponent } from './components/guess-area/guess-area.component';
import { SuccessComponent } from './components/success/success.component';
import { ScoresComponent } from './components/scores/scores.component';

const appRoutes =[
  {
    path:'',
    component: LandingComponent
  },
  {
    path: 'player',
    component: PlayerComponent
  },
  {
    path:'main-game/:player-name',
    component: GuessAreaComponent
  },
  {
    path:'success/:player-name/:result/:complete-time/:guesses',
    component: SuccessComponent
  },
  {
    path:'scores',
    component: ScoresComponent
  }
]

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LandingComponent,
    PlayerComponent,
    GuessAreaComponent,
    SuccessComponent,
    ScoresComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    NgToastModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes,{enableTracing:true}),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
