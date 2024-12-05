import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { provideRouter } from '@angular/router';
import { By } from '@angular/platform-browser';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeComponent],
      providers: [provideRouter([])],
    
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should have a non-empty list of cards', () => {
    expect(component.cards.length).toBeGreaterThan(0);
    expect(component.cards).toContain(jasmine.objectContaining({
      title: 'Delicious Food',
      description: 'Explore a wide variety of cuisines from our amazing food trucks.'
    }));
  });

  it('should initialize the background image with a random value', () => {
    expect(component.backgroundImage).toBeTruthy();
    expect(component.backgroundImage).toMatch(/festival_main_\d\.webp$/);
  });

  it('should load a random background image on initialization', () => {
    const imageSet = new Set(component['images']);
    expect(imageSet.has(component.backgroundImage)).toBeTrue();
  });

  it('should have a defined array of image paths', () => {
    expect(component['images'].length).toBeGreaterThan(0);
    component['images'].forEach((image) => {
      expect(image).toMatch(/^\/home\/festival_main_\d\.webp$/);
    });
  });

  it('should render the correct number of cards in the template', () => {
    const cardElements = fixture.debugElement.queryAll(By.css('[id^="card-"]'));
    
    expect(cardElements.length).toBe(component.cards.length);
  });
});
