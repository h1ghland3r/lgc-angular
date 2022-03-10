import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { BlogService } from './../../shared/services/blog.service';
import { Post } from 'src/app/shared/models/blog.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  posts: Post[] = [];

  constructor(
    private blogService: BlogService
  ) { }

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
          //TODO Handle error
        });
  }

}
