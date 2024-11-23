import { Component, Input, OnInit } from '@angular/core';
import { Ticket } from '../interfaces/ticket';
import { TicketService } from '../services/ticket.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TicketType } from '../ticketType';
import { TicketTypeService } from '../ticketType.service';



@Component({
  selector: 'app-ticket',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tickets.component.html',
  styleUrl: './tickets.component.css'
})
export class TicketsComponent implements OnInit{
  @Input() ticket!: Ticket;

  ticketType: TicketType | undefined;

  constructor(private ticketTypeService: TicketTypeService) {}

  ngOnInit(): void{
    this.ticketType = this.ticketTypeService.getTicketTypeById(this.ticket.typeId)

    if (this.ticket.dagId === 4){
      const OldPrice = this.ticketType?.prijs
      if (OldPrice !== undefined) {
        // Apply the calculation (multiply by 1.8)
        const newPrice = OldPrice * 1.8;
  
        // Update the ticket type's price with the new price
        if (this.ticketType) {
          this.ticketType.prijs = newPrice;
        }
  
    }
  }
}
}
