import { ComponentFixture, TestBed } from '@angular/core/testing';
import {ContainTextComponent} from "./contain-text.component";

describe('ContainTextComponent', () => {
  let component: ContainTextComponent;
  let fixture: ComponentFixture<ContainTextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContainTextComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ContainTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
