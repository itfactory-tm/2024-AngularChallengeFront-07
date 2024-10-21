import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface Card {
  icon: string;
  title: string;
  description: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements AfterViewInit {
  @ViewChild('bgImage') bgImageElement!: ElementRef;

  backgroundImage: string = ''; // Initialized to an empty string

  cards: Card[] = [
    {
      icon: 'fa-utensils',
      title: 'Delicious Food',
      description: 'Explore a wide variety of cuisines from our amazing food trucks.'
    },
    {
      icon: 'fa-music',
      title: 'Live Music',
      description: 'Enjoy fantastic performances from local and international artists.'
    },
    {
      icon: 'fa-users',
      title: 'Family Fun',
      description: 'Bring your loved ones for a day filled with entertainment and activities.'
    },
    {
      icon: 'fa-cocktail',
      title: 'Craft Beverages',
      description: 'Quench your thirst with a selection of unique craft drinks and cocktails.'
    },
    {
      icon: 'fa-shopping-bag',
      title: 'Local Vendors',
      description: 'Shop for handmade crafts and products from talented local artisans.'
    },
    {
      icon: 'fa-star',
      title: 'VIP Experience',
      description: 'Upgrade to VIP for exclusive perks, seating, and special tastings.'
    }
  ];

  private readonly images: string[] = [
    '/home/festival_main_1.webp',
    '/home/festival_main_2.webp',
    '/home/festival_main_3.webp',
    '/home/festival_main_4.webp',
    '/home/festival_main_5.webp',
  ];

  constructor() {
    this.backgroundImage = this.getRandomBackgroundImage();
  }

  private getRandomBackgroundImage(): string {
    return this.images[Math.floor(Math.random() * this.images.length)];
  }

  ngAfterViewInit() {
    const img = new Image();
    img.onload = () => {
      this.bgImageElement.nativeElement.style.opacity = '1';
    };
    img.src = this.backgroundImage;
  }
}
