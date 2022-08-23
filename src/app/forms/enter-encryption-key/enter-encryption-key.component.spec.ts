import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnterEncryptionKeyComponent } from './enter-encryption-key.component';

describe('EnterEncryptionKeyComponent', () => {
  let component: EnterEncryptionKeyComponent;
  let fixture: ComponentFixture<EnterEncryptionKeyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnterEncryptionKeyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EnterEncryptionKeyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
