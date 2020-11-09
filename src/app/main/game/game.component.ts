import { Component, OnInit, AfterViewInit, HostListener } from '@angular/core';
import { Tile } from 'src/app/shared/models/tile.model';

import { cloneDeep } from 'lodash';
import { shuffle } from 'src/app/core/utils/shuffle.util';
import { interval } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Router } from '@angular/router';

import { Howl, Howler } from 'howler';
import { LeaderboardService } from 'src/app/core/services/leaderboards.service';
import { Leaderboard } from 'src/app/shared/models/leaderboard.model';
import { DocumentReference } from '@angular/fire/firestore';
import Panzoom from '@panzoom/panzoom';
import { SoundManagerService } from 'src/app/core/services/sound-manager.service';

@Component({
  selector: 'wm-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})
export class GameComponent implements OnInit, AfterViewInit {
  time: number = 0;

  showPinch = true;

  score: number = 0;
  iconsTiles: any = [
    {
      left: '13.9%',
      top: '20%',
      opened: false,
    },
    {
      left: '5.5%',
      top: '9%',
      opened: false,
    },
    {
      left: '0.9%',
      top: '34.2%',
      opened: false,
    },
    {
      left: '19%',
      top: '32.7%',
      opened: false,
    },
    {
      left: '6%',
      top: '43.7%',
      opened: false,
    },
    {
      left: '34%',
      top: '27.7%',
      opened: false,
    },
    {
      left: '38.8%',
      top: '32.2%',
      opened: false,
    },
    {
      left: '65%',
      top: '28.2%',
      opened: false,
    },
    {
      left: '43.5%',
      top: '2.5%',
      opened: false,
    },
    {
      left: '93.2%',
      top: '14.5%',
      opened: false,
    },
    {
      left: '47.7%',
      top: '16.7%',
      opened: false,
    },
    {
      left: '41.2%',
      top: '18.7%',
      opened: false,
    },
    {
      left: '69.5%',
      top: '14.8%',
      opened: false,
    },
    {
      left: '84.2%',
      top: '21.8%',
      opened: false,
    },
    {
      left: '90.2%',
      top: '32.8%',
      opened: false,
    },
  ];

  leaderboards: Leaderboard[] = [];

  constructor(
    private router: Router,
    private leaderboardService: LeaderboardService,
    private soundManagerService: SoundManagerService
  ) {}

  ngOnInit() {
    if (!localStorage.getItem('name')) {
      this.router.navigate(['/']);
    }
    this.time = 0;
    this.getLeaderboards();
    this.score = 0;
    setTimeout(() => {
      this.initZoom();

      this.startTimeInterval();
    }, 2500);
  }

  ngAfterViewInit() {}

  foundIcon(icon) {
    if (!icon.opened) {
      this.score++;
      icon.opened = true;
      this.soundManagerService.playSoundByPath('correct');

      if (this.score >= 15) {
        this.saveScore();
      }
    }
  }

  private async saveScore() {
    if (this.score >= 15) {
      this.leaderboards.sort((a, b) => a.time - b.time);
      let rank;

      if (this.leaderboards.length === 0) {
        rank = 1;
      } else {
        const id = 'bee';
        this.leaderboards.push({
          time: this.time,
          score: this.score,
          id,
        });
        this.leaderboards.sort((a, b) => a.time - b.time);
        console.log(this.leaderboards);

        rank = this.leaderboards.findIndex((l) => l.id === id) + 1;
      }

      console.log(this.leaderboards, rank);

      if (rank <= 5) {
        const leaderboard = await this.leaderboardService.create({
          name: localStorage.getItem('name'),
          time: this.time,
          score: this.score,

          rank,
        });

        console.log(leaderboard);
        localStorage.setItem('time', this.time.toString());
        localStorage.setItem('score', this.score.toString());
        localStorage.setItem('rank', rank.toString());
        localStorage.setItem('leaderboard-id', leaderboard.id);
        setTimeout(() => {
          this.router.navigate(['/top-scorer']);
        }, 2000);
      } else {
        const leaderboard = await this.leaderboardService.create({
          name: localStorage.getItem('name'),
          score: this.score,

          time: this.time,
          rank,
        });
        localStorage.setItem('time', this.time.toString());
        localStorage.setItem('leaderboard-id', leaderboard.id);
        localStorage.setItem('score', this.score.toString());
        setTimeout(() => {
          this.router.navigate(['/success']);
        }, 2000);
      }
    } else {
      const leaderboard = await this.leaderboardService.create({
        name: localStorage.getItem('name'),
        score: this.score,
        time: 80,
      });
      localStorage.setItem('time', this.time.toString());
      localStorage.setItem('leaderboard-id', leaderboard.id);
      localStorage.setItem('score', this.score.toString());
      setTimeout(() => {
        console.log('here');
        this.router.navigate(['/game-over']);
      }, 2000);
    }
    // this.sketch.clear();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    // event.target.innerWidth;
    this.initZoom();
  }

  addClassDelay(element, classes: string[], delay: number) {
    setTimeout(() => {
      element.classList.add(classes);
    }, delay);
  }

  private initZoom(): void {
    const elem = document.querySelector('#gameBg');
    const panzoom = Panzoom(elem as HTMLElement, {
      maxScale: 5,
      contain: 'outside',
      // disableYAxis: true,
    });
    elem.parentElement.addEventListener('wheel', panzoom.zoomWithWheel);

    setTimeout(() => {
      const elem = document.querySelector('#gameBg');
      const panzoom = Panzoom(elem as HTMLElement, {
        maxScale: 5,
        contain: 'outside',
        // disableYAxis: true,
      });
      elem.parentElement.addEventListener('wheel', panzoom.zoomWithWheel);
      setTimeout(() => panzoom.zoom(1, { force: true }), 10);
      setTimeout(() => panzoom.zoom(0, { force: true }), 10);
    }, 20);
  }

  private getLeaderboards() {
    this.leaderboardService.leaderboards$
      .pipe(
        map((leaderboards) =>
          leaderboards.filter((leaderboard) => Boolean(leaderboard.time))
        )
      )
      .subscribe((leaderboards) => (this.leaderboards = leaderboards));
  }

  private startTimeInterval() {
    setTimeout(() => (this.showPinch = false), 5000);
    interval(8)
      .pipe(filter(() => this.time < 80 && this.score < 15))
      .subscribe(async () => {
        this.time += 0.01;
        this.time = this.time > 80 ? 80 : this.time;

        if (this.time >= 80) {
          this.soundManagerService.playSoundByPath('timesUp');

          this.saveScore();
        }
      });
  }
}
