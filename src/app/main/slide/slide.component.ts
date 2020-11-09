import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'wm-slide',
  templateUrl: './slide.component.html',
  styleUrls: ['./slide.component.scss'],
})
export class SlideComponent implements OnInit {
  nextPage: string;

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.getNextPage();

    setTimeout(() => {
      this.router.navigate(['/' + this.nextPage]);
    }, 5000);
  }

  private getNextPage() {
    this.nextPage = this.route.snapshot.queryParams.nextPage;
  }
}
