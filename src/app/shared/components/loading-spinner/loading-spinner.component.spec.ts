import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { LoadingSpinnerComponent } from './loading-spinner.component';
import { LoadingService } from './../../services/loading.service';


describe('LoadingSpinnerComponent', () => {
  let component: LoadingSpinnerComponent;
  let fixture: ComponentFixture<LoadingSpinnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoadingSpinnerComponent ],
      imports: [ HttpClientTestingModule ],
      providers: [ LoadingService ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadingSpinnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should spinner exists', () => {
    const element = fixture.debugElement.nativeElement.querySelector('mat-progress-spinner');
    expect(element).toBeTruthy();
  });
});
