import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastrModule } from 'ngx-toastr';
import { ReactiveFormsModule } from '@angular/forms';
import { PostComponent } from './post.component';
import { BlogService } from 'src/app/shared/services/blog.service';
import { of } from 'rxjs';


describe('PostComponent', () => {
  let component: PostComponent;
  let fixture: ComponentFixture<PostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostComponent ],
      imports: [ HttpClientTestingModule, RouterTestingModule, ReactiveFormsModule, ToastrModule.forRoot() ],
      providers: [ BlogService ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("commentsForm should be invalid", () => {
    component.commentsForm.controls['name'].setValue('');
    component.commentsForm.controls['comment'].setValue('');
    expect(component.commentsForm.valid).toBeFalsy();
  });

  it("commentsForm should be valid", () => {
    component.commentsForm.controls['name'].setValue('h1ghland3r');
    component.commentsForm.controls['comment'].setValue('Comment message');
    expect(component.commentsForm.valid).toBeTruthy();
  });
});
