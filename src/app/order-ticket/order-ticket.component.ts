import { Component, OnInit } from '@angular/core';
import { Ticket } from '../interfaces/ticket';
import { TicketService } from '../services/ticket.service';
import { FormsModule } from '@angular/forms';
import { DayService } from '../services/day.service';
import { Day } from '../interfaces/day';
import { TicketType } from '../interfaces/ticketType';
import { TicketTypeService } from '../services/ticketType.service';


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

  days: Day[] = [];
  types: TicketType[] = [];

  constructor(private ticketService: TicketService, private daySerivce: DayService, private ticketTypeService: TicketTypeService) {}

  ngOnInit(): void {
    this.selectedticket = this.ticketService.getSelectedTickets();

    this.days = this.daySerivce.getDays();
    this.selectedticket = this.ticketService.getSelectedTickets();
    this.types = this.ticketTypeService.getTicketTypes();

    console.log(this.selectedticket)

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

  getDagForTicket(dayId: number): Day | undefined {
    return this.days.find(dag => dag.dayId === dayId);
  }

  getTypeForTicket(typeId: number): TicketType | undefined {
    var type =  this.types.find(type => type.typeId === typeId);
    console.log(type)
    return type;
  }

}
