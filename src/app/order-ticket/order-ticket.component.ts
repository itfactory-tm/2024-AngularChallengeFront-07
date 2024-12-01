// order-ticket.component.ts
import { Component, OnInit } from '@angular/core';
import { TicketService } from '../services/ticket.service';
import { DayService } from '../services/day.service';
import { TicketTypeService } from '../services/ticketType.service';
import { ReactiveFormsModule, FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Ticket } from '../interfaces/ticket';
import { Day } from '../interfaces/day';
import { TicketType } from '../interfaces/ticketType';
import { BoughtTicketService } from '../services/bought-ticket.service';

@Component({
  selector: 'app-order-ticket',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './order-ticket.component.html',
  styleUrls: ['./order-ticket.component.css']
})
export class OrderTicketComponent implements OnInit {
  selectedticket: Ticket[] = [];
  holderNames: { [key: number]: string } = {};
  days: Day[] = [];
  types: TicketType[] = [];

  // Reactive form for adding tickets
  addingTicketForm = new FormGroup({
    nameOfBuyer: new FormControl(''),
    emailOfBuyer: new FormControl(''),
    payed: new FormControl(false),
    tickets: new FormArray([])  // This will hold the tickets array
  });


  constructor(
    private ticketService: TicketService,
    private dayService: DayService,
    private ticketTypeService: TicketTypeService,
    private boughtTicketService: BoughtTicketService,
  ) {}

  ngOnInit(): void {
    this.selectedticket = this.ticketService.getSelectedTickets();
    this.days = this.dayService.getDays();
    this.types = this.ticketTypeService.getTicketTypes();

    this.initializeTicketForms();  // Initialize form controls for tickets
  }

  // Getter to access the 'tickets' FormArray
  get tickets(): FormArray {
    return this.addingTicketForm.get('tickets') as FormArray;
  }

  // Initialize FormArray with ticket information
  initializeTicketForms() {
    const ticketForms = this.selectedticket.forEach((ticket) => {
      const ticketGroup = new FormGroup({
        ticketId: new FormControl(ticket.ticketId),
        nameOfHolder: new FormControl(''),
        emailOfHolder: new FormControl('')
      });
      this.tickets.push(ticketGroup);
    });


  }

  // Handle form submission
  onSubmit(): void {
    if (this.addingTicketForm.valid) {
      const formValues = this.addingTicketForm.value;

      // Prepare the JSON structure
      const ticketData = formValues.tickets?.map((ticket: any) => ({
        boughtTicketId: ticket.ticketId,   // Ticket purchase ID
        buyerName: formValues.nameOfBuyer,    // Shared buyer info
        buyerEmail: formValues.emailOfBuyer,  // Shared buyer info
        holderName: ticket.nameOfHolder,      // Ticket holder info
        holderEmail: ticket.emailOfHolder,    // Ticket holder info
        ticketId: ticket.ticketId,          // Specific ticket ID
        payed: formValues.payed                  // Payment status
      }));

      const tickets = ticketData;
    
      tickets?.forEach((ticket: any) => {
        // Each ticket will be added individually to the service
        this.boughtTicketService.addTickets(ticket);
        console.log('Ticket added:', ticket);  // You can log each ticket if needed
      });

      console.log(this.boughtTicketService.getTickets());

    } else {
      console.log('Form is invalid', this.addingTicketForm.value);
    }
  }

  getDagForTicket(dayId: number): Day | undefined {
    return this.days.find(dag => dag.dayId === dayId);
  }

  getTypeForTicket(typeId: number): TicketType | undefined {
    return this.types.find(type => type.typeId === typeId);
  }
}
