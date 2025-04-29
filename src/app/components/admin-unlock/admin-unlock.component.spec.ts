import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminUnlockComponent } from './admin-unlock.component';

describe('AdminUnlockComponent', () => {
  let component: AdminUnlockComponent;
  let fixture: ComponentFixture<AdminUnlockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminUnlockComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminUnlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
