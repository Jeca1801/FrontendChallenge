import { ComponentFixture, TestBed } from '@angular/core/testing';
import {CountdownTitleInputComponent} from "./countdown-title-input.component";

describe('CountdownTitleInputComponent', () => {
  let component: CountdownTitleInputComponent;
  let fixture: ComponentFixture<CountdownTitleInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CountdownTitleInputComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(CountdownTitleInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
