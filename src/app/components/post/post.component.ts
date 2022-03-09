import { Component, Input, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { BlogService } from 'src/app/shared/services/blog.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  @Input() posts: any;
  activeRoute!: string;
  showFeedFromNavigation: boolean = false;
  showFeed: boolean = true;
  showPost: boolean = false;

  constructor(
    private router: Router,
    private blogService: BlogService
  ) {
  }

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        if (event.url) {
          this.activeRoute = event.url.replace('/post/', '');
        }
      }
    });

    this.blogService.currentFeedStatus$.subscribe((value: boolean) => {
      this.showFeedFromNavigation = value;
      this.showPost = false;
    });
  }

  openPost(event: MouseEvent): void {
    this.showFeed = false;
    this.showFeedFromNavigation = false;
    this.showPost = true;
    console.log((event.target as HTMLInputElement).id);
    console.log('Feed: ' + this.showFeed);
    console.log('Post: ' + this.showPost);
  }

}
