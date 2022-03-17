import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NavigationComponent } from './navigation.component';
import { BlogService } from 'src/app/shared/services/blog.service';


describe('NavigationComponent', () => {
  let component: NavigationComponent;
  let fixture: ComponentFixture<NavigationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavigationComponent ],
      imports: [ HttpClientTestingModule ],
      providers: [ BlogService ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should openFeed() to be called after click', fakeAsync(() => {
    spyOn(component, 'openFeed');

    let button = fixture.debugElement.nativeElement.querySelector('.navigation__button');
    button.click();
    tick();
    expect(component.openFeed).toHaveBeenCalled();
  }));
});
