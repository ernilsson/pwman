import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceivedSharedCredentialComponent } from './received-shared-credential.component';

describe('ReceivedSharedCredentialComponent', () => {
  let component: ReceivedSharedCredentialComponent;
  let fixture: ComponentFixture<ReceivedSharedCredentialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReceivedSharedCredentialComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReceivedSharedCredentialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
