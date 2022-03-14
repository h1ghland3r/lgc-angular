import { Component, Input, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, Validators } from "@angular/forms";
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
          if (this.postId) {
            this.getCommentsByPost(this.postId);
          }

          if (this.activeRoute === '/home') {
            this.showFeedFromNavigation = true;
            this.showPost = false;
          }
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
        (res: Comment[]) => {
          if (!!res) {
            this.comments = res;
            console.log(this.comments);
            if (this.activeRoute.includes('#comments')) {
              this.scrollToComments();
            }
          }
        },
        error => {
          //TODO Handle error
        });
  }

  getCommentsWithoutReplies(): Comment[] {
    return this.comments.filter((comment) => !comment.parent_id);
  }

  getRepliesByComment(commentId: number) {
    return this.comments
      .filter(comment => commentId === comment.parent_id)
      .sort((a: Comment, b: Comment) => (new Date(b.date)).getTime() - (new Date(a.date)).getTime());
  };

  openPost(event: MouseEvent): void {
    this.showFeed = false;
    this.showFeedFromNavigation = false;
    this.showPost = true;

    let attributeId = (event.target as HTMLInputElement)?.id;
    this.postId = parseInt(attributeId.replace('blog-post-', ''));
    this.getCommentsByPost(this.postId);
  }

  scrollToComments() {
    document.querySelector('#commentCard')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
 }

  addComment() {
    if (this.commentsForm.invalid) {
      return;
    }

    const comment = {
      parent_id: null,
      date: new Date().toISOString().split('T')[0],
      user: this.commentsForm.get('name')?.value,
      content: this.commentsForm.get('comment')?.value,
    }

    this.blogService.addCommentToPost(this.postId, comment)
      .subscribe(res => {
        if (!!res) {
          this.getCommentsByPost(this.postId);
        }
      })
  }

  isInvalid(field: string) {
    return (
      (!this.commentsForm?.get(field)?.valid && this.commentsForm?.get(field)?.touched) ||
      (this.commentsForm?.get(field)?.untouched)
    );
  }

}
