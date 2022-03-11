import { Component, Input, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { FormBuilder,Validators } from "@angular/forms";
import { BlogService } from 'src/app/shared/services/blog.service';
import { Post, Comment } from './../../shared/models/blog.model';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  @Input() posts: Post[] = [];
  @Input() comments: Comment[] = [];
  activeRoute!: string;
  showFeedFromNavigation: boolean = false;
  showFeed: boolean = true;
  showPost: boolean = false;
  postId: number = 0;

  commentsForm = this.fb.group({
    name : [null, Validators.required],
    comment : [null, Validators.required],
  })

  constructor(
    private router: Router,
    private blogService: BlogService,
    private fb: FormBuilder
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

  getCommentsByPost(postId: number) {
    this.blogService.getAllCommentsByPost(postId)
      .subscribe(
        res => {
          if (!!res) {
            // let sorted = res.sort((a: any, b: any[]) => new Date(a.date) > new Date(b.date));
            this.comments = res;
          }
        },
        error => {
          //TODO Handle error
        });
  }

  openPost(event: MouseEvent): void {
    this.showFeed = false;
    this.showFeedFromNavigation = false;
    this.showPost = true;

    let attributeId = (event.target as HTMLInputElement)?.id;
    this.postId = parseInt(attributeId.replace('blog-post-', ''));
    this.getCommentsByPost(this.postId);

  }

  addComment() {
    if (this.commentsForm.invalid) {
      return;
    }
  }

  isInvalid(field: string) {
    return (
      (!this.commentsForm?.get(field)?.valid && this.commentsForm?.get(field)?.touched) ||
      (this.commentsForm?.get(field)?.untouched)
    );
  }

}
