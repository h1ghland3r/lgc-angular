import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { BlogService } from 'src/app/shared/services/blog.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  navTitle: string = 'LGC Angular';
  showFeed: boolean = true;

  constructor(
    private blogService: BlogService,
    private titleService: Title
  ) { }

  ngOnInit(): void {
  }

  openFeed(): void {
    this.blogService.setFeedStatus(this.showFeed);
    this.setTitle();
  }

  setTitle(): void {
    this.titleService.setTitle('LGC Angular - Home');
  }

}
