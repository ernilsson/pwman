import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmCredentialRemovalComponent } from './confirm-credential-removal.component';

describe('ConfirmCredentialRemovalComponent', () => {
  let component: ConfirmCredentialRemovalComponent;
  let fixture: ComponentFixture<ConfirmCredentialRemovalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmCredentialRemovalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmCredentialRemovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
