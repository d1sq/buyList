import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { BuyListComponent } from './buy-list.component';

describe('BuyListComponent', () => {
  let component: BuyListComponent;
  let fixture: ComponentFixture<BuyListComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BuyListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuyListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
