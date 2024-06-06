import { TestBed } from '@angular/core/testing'
import {CountdownFormService} from "./countdown-form.service";

describe('CountdownFormService', () => {
  let service: CountdownFormService

  beforeEach(() => {
    TestBed.configureTestingModule({})
    service = TestBed.inject(CountdownFormService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })
})
