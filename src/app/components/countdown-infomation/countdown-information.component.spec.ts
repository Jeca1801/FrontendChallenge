import { ComponentFixture, TestBed } from '@angular/core/testing';
import {CountdownInformationComponent} from "./countdown-information.component";

describe('CountdownInformationComponent', () => {
  let component: CountdownInformationComponent;
  let fixture: ComponentFixture<CountdownInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CountdownInformationComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(CountdownInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
