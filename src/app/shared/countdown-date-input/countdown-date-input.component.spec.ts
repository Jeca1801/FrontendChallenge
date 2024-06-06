import { ComponentFixture, TestBed } from '@angular/core/testing';
import {CountdownDateInputComponent} from "./countdown-date-input.component";

describe('CountdownDateInputComponent', () => {
  let component: CountdownDateInputComponent;
  let fixture: ComponentFixture<CountdownDateInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CountdownDateInputComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(CountdownDateInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
