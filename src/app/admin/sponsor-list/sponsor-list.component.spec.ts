import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SponsorListComponent } from './sponsor-list.component';

describe('SponsorListComponent', () => {
  let component: SponsorListComponent;
  let fixture: ComponentFixture<SponsorListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SponsorListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SponsorListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
