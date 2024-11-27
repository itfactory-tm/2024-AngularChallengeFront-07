import { Component, OnInit } from '@angular/core';
import { Ticket } from '../interfaces/ticket';
import { TicketService } from '../services/ticket.service';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-order-ticket',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './order-ticket.component.html',
  styleUrl: './order-ticket.component.css'
})
export class OrderTicketComponent implements OnInit {
  selectedticket: Ticket[] = [];
  holderNames: { [key: number]: string} = {};

  constructor(private ticketService: TicketService) {}

  ngOnInit(): void {
    this.selectedticket = this.ticketService.getSelectedTickets();
  }

  onNameChange(ticketId: number, name: string): void {
    // Update holder name for a ticket
    this.holderNames[ticketId] = name;
  }


  onSubmit(): void {
    // Handle form submission
    console.log('Holder Names:', this.holderNames);
    // Submit data to a service or API
  }

}
