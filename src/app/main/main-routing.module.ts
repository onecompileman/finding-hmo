import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main.component';
import { LandingComponent } from './landing/landing.component';
import { EnterNameComponent } from './enter-name/enter-name.component';
import { HowToPlayComponent } from './how-to-play/how-to-play.component';
import { GameComponent } from './game/game.component';
import { SuccessComponent } from './success/success.component';
import { LeaderboardComponent } from './leaderboard/leaderboard.component';
import { TopScorerComponent } from './top-scorer/top-scorer.component';
import { GameOverComponent } from './game-over/game-over.component';
import { ResetComponent } from './reset/reset.component';
import { HomeComponent } from './home/home.component';
import { SlideComponent } from './slide/slide.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      // {
      //   path: '',
      //   component: HomeComponent,
      //   data: {
      //     animation: 'HomePage',
      //   },
      // },
      {
        path: '',
        component: LandingComponent,
        data: {
          animation: 'LandingPage',
        },
      },
      {
        path: 'enter-name',
        component: EnterNameComponent,
        data: {
          animation: 'EnterNamePage',
        },
      },
      {
        path: 'how-to-play',
        component: HowToPlayComponent,
        data: {
          animation: 'HowToPlayPage',
        },
      },
      {
        path: 'game',
        component: GameComponent,
        data: {
          animation: 'GamePage',
        },
      },
      {
        path: 'slide',
        component: SlideComponent,
        data: {
          animation: 'Slide Page',
        },
      },
      {
        path: 'success',
        component: SuccessComponent,
        data: {
          animation: 'SuccessPage',
        },
      },
      {
        path: 'leaderboard',
        component: LeaderboardComponent,
        data: {
          animation: 'LeaderboardPage',
        },
      },
      {
        path: 'admin',
        component: ResetComponent,
      },
      {
        path: 'top-scorer',
        component: TopScorerComponent,
        data: {
          animation: 'TopScorerPage',
        },
      },
      {
        path: 'game-over',
        component: GameOverComponent,
        data: {
          animation: 'GameOverPage',
        },
      },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainRoutingModule {}
