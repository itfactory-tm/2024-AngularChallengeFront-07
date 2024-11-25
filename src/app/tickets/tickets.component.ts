import { Component, Input, OnInit } from '@angular/core';
import { Ticket } from '../interfaces/ticket';
import { TicketService } from '../services/ticket.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TicketType } from '../interfaces/ticketType';
import { TicketTypeService } from '../services/ticketType.service';



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
    this.ticketType = this.ticketTypeService.getTicketTypeById(this.ticket.typeId);

    // if (this.ticketType && this.ticket.dagId === 4) {
    //   const oldPrice = this.ticketType.prijs;
    //   if (oldPrice !== undefined) {
    //     const newPrice = oldPrice * 1.8;
    //     this.ticketType.prijs = newPrice;
    //   }
    // }
  
  }
}
