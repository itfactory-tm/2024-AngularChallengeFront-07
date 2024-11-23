import { Component, Input, OnInit } from '@angular/core';
import { Ticket } from '../ticket';
import { TicketService } from '../ticket.service';
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
  }

}
