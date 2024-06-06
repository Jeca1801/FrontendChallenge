import { ComponentFixture, TestBed } from '@angular/core/testing';
import {CountdownFormComponent} from "./countdown-form.component";

describe('CountdownFormComponent', () => {
  let component: CountdownFormComponent;
  let fixture: ComponentFixture<CountdownFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CountdownFormComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(CountdownFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
