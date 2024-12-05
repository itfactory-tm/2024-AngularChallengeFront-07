import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { provideRouter } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { of } from 'rxjs';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  const mockAuthService = {
    isAuthenticated$: of(false),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderComponent],
      providers: [
        { provide: AuthService, useValue: mockAuthService },
        provideRouter([]),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize `isMenuOpen` to false', () => {
    expect(component.isMenuOpen).toBeFalse();
  });

  it('should toggle `isMenuOpen` when `toggleMenu` is called', () => {
    component.toggleMenu();
    expect(component.isMenuOpen).toBeTrue();

    component.toggleMenu();
    expect(component.isMenuOpen).toBeFalse();
  });

  it('should initialize `adminDropdownOpen` to false', () => {
    expect(component.adminDropdownOpen).toBeFalse();
  });

  it('should toggle `adminDropdownOpen` when `onAdminDropDownClick` is called', () => {
    component.onAdminDropDownClick();
    expect(component.adminDropdownOpen).toBeTrue();

    component.onAdminDropDownClick();
    expect(component.adminDropdownOpen).toBeFalse();
  });

  it('should close `adminDropdownOpen` when `closeAdminDropDown` is called', () => {
    component.adminDropdownOpen = true;
    component.closeAdminDropDown();
    expect(component.adminDropdownOpen).toBeFalse();
  });

  it('should navigate and close menus when `navigateTo` is called', () => {
    const navigateSpy = spyOn(component['router'], 'navigate');
    component.isMenuOpen = true;
    component.adminDropdownOpen = true;

    component.navigateTo('/tickets');

    expect(navigateSpy).toHaveBeenCalledWith(['/tickets']);
    expect(component.isMenuOpen).toBeFalse();
    expect(component.adminDropdownOpen).toBeFalse();
  });

  it('should have a defined list of left pages', () => {
    expect(component.leftPages.length).toBeGreaterThan(0);
    expect(component.leftPages).toContain(jasmine.objectContaining({ name: 'Home', path: '/' }));
  });

  it('should have a defined list of right pages', () => {
    expect(component.rightPages.length).toBeGreaterThan(0);
    expect(component.rightPages).toContain(jasmine.objectContaining({ name: 'Tickets', path: '/tickets' }));
  });
});
