import { Component, OnInit } from '@angular/core';
import { BlogService } from './../../shared/services/blog.service';
import { Post } from 'src/app/shared/models/blog.model';
import { Meta, Title } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  posts: Post[] = [];

  constructor(
    private blogService: BlogService,
    private titleService: Title,
    private meta: Meta,
    private toastr: ToastrService
  ) {
    this.titleService.setTitle('LGC Angular - Home');
    this.meta.addTags([
      { name: 'description', content: 'LGC Angular Blog Application' },
      { name: 'author', content: 'h1ghland3r' },
      { name: 'keywords', content: 'Angular, Blog, Post' }
    ]);
  }

  ngOnInit(): void {
    this.getAllPosts();
  }

  getAllPosts() {
    this.blogService.getAll()
      .subscribe(
        res => {
          if (!!res) {
            this.posts = res;
          }
        },
        error => {
          this.toastr.error(error, '', {
            positionClass: 'toast-top-right'
          });
        });
  }
}
