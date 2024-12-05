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
import { Observable } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';


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

  days$: Observable<Day[]> = new Observable<Day[]>();
  types$: Observable<TicketType[]> = new Observable<TicketType[]>();

  //MailServer variables

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
    this.days$ = this.dayService.getDays();
    this.types$ = this.ticketTypeService.getTicketTypes();

    console.log(this.selectedticket)

    this.days$.subscribe((days) => {
      this.days = days; // Store days in local variable
    });

    this.types$.subscribe((types) => {
      this.types = types
    });

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
        boughtTicketId: uuidv4(),   // Ticket purchase ID
        buyerName: formValues.nameOfBuyer,    // Shared buyer info
        buyerMail: formValues.emailOfBuyer,  // Shared buyer info
        holderName: ticket.nameOfHolder,      // Ticket holder info
        holderMail: ticket.emailOfHolder,    // Ticket holder info
        ticketId: ticket.ticketId,          // Specific ticket ID
        payed: formValues.payed,                  // Payment status
      }));

      const tickets = ticketData;
      console.log(tickets)
    
      tickets?.forEach((ticket: any) => {
        // Each ticket will be added individually to the service
        console.log(ticket)
        this.boughtTicketService.postTicket(ticket).subscribe(
          response => {
            console.log('Ticket created successfully', response);
          },
          error => {
            console.error('Error creating ticket:', error);
            if (error.status === 400) {
              // Handle bad request errors
              console.log('Bad Request Error:', error.error);
            }
          });        
      });

      // this.mailService.sendEmail(this.mailTemplate).subscribe({
      //   next: () => {
      //     console.log('Email sent successfully!');
      //   },
      //   error: (err) => {
      //     console.log('Failed to send email: ' + err.error?.message || err.message);
      //   },
      // });

    } else {
      console.log('Form is invalid', this.addingTicketForm.value);
    }
  }

  getDagForTicket(dayId: string): Day | undefined {
    return this.days.find(d => d.dayId === dayId);
  }

  getTypeForTicket(typeId: string): TicketType | undefined {
    return this.types.find(t => t.ticketTypeId === typeId);
  }
}
