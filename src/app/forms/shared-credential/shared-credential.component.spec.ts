import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedCredentialComponent } from './shared-credential.component';

describe('SharedCredentialComponent', () => {
  let component: SharedCredentialComponent;
  let fixture: ComponentFixture<SharedCredentialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SharedCredentialComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SharedCredentialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
