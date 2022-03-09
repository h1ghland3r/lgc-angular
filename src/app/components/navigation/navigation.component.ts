import { Component, OnInit } from '@angular/core';
import { BlogService } from 'src/app/shared/services/blog.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  showFeed: boolean = true;

  constructor(
    private blogService: BlogService
  ) { }

  ngOnInit(): void {
  }

  openFeed(): void {
    this.blogService.setFeedStatus(this.showFeed);
  }

}
