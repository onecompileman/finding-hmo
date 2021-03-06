import { Component, OnInit, HostListener } from '@angular/core';
import { mainRoutingAnimation } from './main-routing.animation';
import { RouterOutlet } from '@angular/router';
import { LeaderboardService } from '../core/services/leaderboards.service';
import { SoundManagerService } from '../core/services/sound-manager.service';

@Component({
  selector: 'wm-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  animations: [mainRoutingAnimation],
})
export class MainComponent implements OnInit {
  isPortrait: boolean;

  height: number;
  width: number;

  constructor(
    private leaderboardService: LeaderboardService,
    private soundManagerService: SoundManagerService
  ) {}

  ngOnInit() {
    this.isPortrait = innerHeight > innerWidth;
    this.height = innerHeight;
    this.width = innerWidth;
    this.soundManagerService.playBackgroundMusic();
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.isPortrait = innerHeight > innerWidth;
    this.height = innerHeight;
    this.width = innerWidth;
  }

  prepareRoute(outlet: RouterOutlet) {
    return (
      outlet &&
      outlet.activatedRouteData &&
      outlet.activatedRouteData['animation']
    );
  }
}
