import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StageAdminListComponent } from './stageAdmin-list.component';

describe('StageListComponent', () => {
  let component: StageAdminListComponent;
  let fixture: ComponentFixture<StageAdminListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StageAdminListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StageAdminListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
