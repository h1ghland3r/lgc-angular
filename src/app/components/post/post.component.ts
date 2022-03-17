import { Component, Input, OnInit } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { FormBuilder, Validators } from "@angular/forms";
import { BlogService } from 'src/app/shared/services/blog.service';
import { Post, Comment } from './../../shared/models/blog.model';
import { Title } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';
import { LoadingService } from 'src/app/shared/services/loading.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  @Input() posts: Post[] = [];
  @Input() comments: Comment[] = [];
  activeRoute!: string;
  loading$ = this.loadingService.isLoading$;
  showContent: boolean = false;
  showFeedFromNavigation: boolean = false;
  showFeed: boolean = true;
  showPost: boolean = false;
  showReply: boolean = false;
  postId: number = 0;
  replyParentId!: number;

  commentsForm = this.fb.group({
    name : [null, Validators.required],
    comment : [null, Validators.required],
  })

  constructor(
    private router: Router,
    private blogService: BlogService,
    private fb: FormBuilder,
    private titleService: Title,
    private loadingService: LoadingService,
    private toastr: ToastrService
  ) {
  }

  ngOnInit(): void {
    // simulate loading
    this.loadingService.show();
    setTimeout(() => {
      this.loadingService.hide();
      this.showContent = true;
    }, 2000);

    // handle navigation routing
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
            this.showReply = false;
            this.resetForm();
          }
        }
      }

      if (event instanceof NavigationStart) {
        if (event.restoredState) {
          this.router.navigate(['/home']);
        }
      }
    });

    this.blogService.currentFeedStatus$.subscribe((value: boolean) => {
      this.showFeedFromNavigation = value;
      this.showPost = false;
    });
  }

  setTitle(title: String): void {
    this.titleService.setTitle(title ? 'LGC Angular - ' + title : 'LGC Angular - Home');
  }

  getCommentsByPost(postId: number) {
    this.blogService.getAllCommentsByPost(postId)
      .subscribe(
        (res: Comment[]) => {
          if (!!res) {
            this.comments = res;
            if (this.activeRoute.includes('#comments')) {
              this.scrollToComments();
            }
          }
        },
        error => {
          this.toastr.error(error, '', {
            positionClass: 'toast-top-right'
          });
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
    this.setTitle(attributeId);
  }

  openReply(id: number): void {
    this.replyParentId = id;
    this.showReply = true;
    this.scrollToReply();
  }

  addComment(): void {
    if (this.commentsForm.invalid) {
      return;
    }

    const comment = {
      parent_id: this.replyParentId,
      date: new Date().toISOString().split('T')[0],
      user: this.commentsForm.get('name')?.value,
      content: this.commentsForm.get('comment')?.value,
    }

    this.blogService.addCommentToPost(this.postId, comment)
      .subscribe(res => {
        if (!!res) {
          this.showReply = false;
          this.getCommentsByPost(this.postId);
          this.resetForm();
          this.toastr.success('Comment added', '', {
            positionClass: 'toast-top-right'
          });
        }
      })
  }

  resetForm(): void {
    this.commentsForm.reset();
    this.replyParentId!;
  }

  isInvalid(field: string) {
    return (
      (!this.commentsForm?.get(field)?.valid && this.commentsForm?.get(field)?.touched) ||
      (this.commentsForm?.get(field)?.untouched)
    );
  }

  scrollToComments() {
    document.querySelector('#commentCard')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  scrollToReply() {
    document.querySelector('#replyForm')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
}
