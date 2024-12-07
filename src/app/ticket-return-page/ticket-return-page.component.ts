import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';

@Component({
  selector: 'app-ticket-return-page',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,],
  templateUrl: './ticket-return-page.component.html',
  styleUrl: './ticket-return-page.component.css'
})
export class TicketReturnPageComponent implements OnInit{

  isSuccesful: boolean = false;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    // Prevent scrolling when the confirmation page is shown
    document.body.style.overflow = 'hidden';

    this.route.queryParams.subscribe(params => {
      console.log(params['isConfirmed'])

      this.isSuccesful = params['isConfirmed'] === 'true';
    });
  }

}
