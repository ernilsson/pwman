import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilteredCredentialListComponent } from './filtered-credential-list.component';

describe('FilteredCredentialListComponent', () => {
  let component: FilteredCredentialListComponent;
  let fixture: ComponentFixture<FilteredCredentialListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilteredCredentialListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FilteredCredentialListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
