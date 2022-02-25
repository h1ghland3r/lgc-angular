import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Post, Comment } from '../models/blog.model';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(
    private http: HttpClient
  ) { }

  getAll() {
    return this.http.get<Post[]>(`${environment.apiUrl}/posts`)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  getById(id: number): Observable<Post> {
    return this.http.get<Post>(`${environment.apiUrl}/posts/${id}`)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  getAllCommentsByPost(id: number): Observable<Post[]> {
    return this.http.get<Post[]>(`${environment.apiUrl}/posts/${id}/comments`)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  addCommentToPost(id: number, comment: Comment): Observable<any> {
    return this.http.post<Post>(`${environment.apiUrl}/posts/${id}/comments`, JSON.stringify(comment), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  updateComment(comment: Comment): Observable<Comment> {
    return this.http.put<Comment>(`${environment.apiUrl}/comments/${comment.id}`, JSON.stringify(comment), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  errorHandler(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Server returned code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}