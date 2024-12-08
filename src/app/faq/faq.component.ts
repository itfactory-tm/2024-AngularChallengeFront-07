import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

interface QA {
  question: string;
  answer: string;
  isOpen?: boolean;
}

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './faq.component.html',
  styleUrl: './faq.component.css'
})
export class FaqComponent implements OnInit {
  qaList: QA[] = [
    {
      question: "What is FritFest?",
      answer: "FritFest is a unique 3-day festival celebrating food truck cuisine, with a special focus on fries and other fried delicacies. It's a family-friendly event featuring live music, food competitions, and activities for all ages."
    },
    {
      question: "When and where is FritFest held?",
      answer: "FritFest is held annually on the first weekend of July in Brussels Expo. The exact dates for this year are July 1-3, 2023."
    },
    {
      question: "How much do tickets cost?",
      answer: "For detailed information on ticket types and prices, please visit our tickets page. Please note that all ticket sales are final and non-refundable. There is no limit on the number of tickets you can purchase, so feel free to bring all your friends and family!"
    },
    {
      question: "What are the differences between General Admission, Super, and VIP tickets?",
      answer: "General Admission tickets provide access to all the main festival areas and events. Super tickets offer additional perks such as faster entry and access to exclusive areas. VIP tickets are perfect for those looking for a premium experience, including priority entry, access to a VIP lounge with complimentary drinks, and meet-and-greets with celebrity chefs. General Admission is great for those who want to enjoy the festival at a standard level, Super is ideal for those who want a bit more comfort and exclusivity, and VIP is best for those seeking the ultimate festival experience."
    },
    {
      question: "Is FritFest suitable for children?",
      answer: "Absolutely! FritFest is designed to be fun for all ages. We have dedicated areas with activities for children, including fry-themed games, face painting, and kid-friendly food options."
    },
    {
      question: "Can I bring my own food and drinks?",
      answer: "Outside food and drinks are not permitted, as FritFest is all about experiencing the diverse offerings from our carefully selected food trucks. However, we do allow sealed water bottles and any necessary items for medical dietary requirements."
    },
    {
      question: "Is there parking available?",
      answer: "Yes, there is ample parking available at the Sportpaleis. We also encourage the use of public transportation, with special shuttle buses running from Antwerp Central Station to the festival grounds."
    },
    {
      question: "What should I bring to FritFest?",
      answer: "We recommend bringing sunscreen, comfortable shoes, and cash (although most vendors accept card payments). Don't forget your appetite and a sense of adventure for trying new foods!"
    },
    {
      question: "Are pets allowed at FritFest?",
      answer: "Unfortunately, pets are not allowed at FritFest, with the exception of service animals. We prioritize food safety and the comfort of all attendees."
    },
    {
      question: "What kind of music can we expect?",
      answer: "FritFest features a diverse range of music to complement your culinary journey. Expect everything from local Belgian bands to international DJs, covering genres like rock, pop, electronic, and jazz."
    },
    {
      question: "What types of food trucks can we expect at FritFest?",
      answer: "FritFest features a wide variety of food trucks specializing in fried delicacies. You'll find trucks offering classic Belgian frites, loaded fries with unique toppings, fried chicken, fish and chips, deep-fried desserts, and many more indulgent options."
    },
    {
      question: "Are there any eating competitions at FritFest?",
      answer: "Yes! We host several eating competitions throughout the festival, including our famous 'Friet Frenzy' where contestants compete to eat the most fries in 5 minutes. We also have a 'Spicy Wing Challenge' for those who can handle the heat!"
    },
    {
      question: "Is there a VIP experience available?",
      answer: "Absolutely! Our VIP package includes priority entry, access to a exclusive VIP lounge with complimentary drinks, meet-and-greets with celebrity chefs, and vouchers for free tastings at select food trucks."
    },
    {
      question: "What's the 'Golden Friet' award?",
      answer: "The 'Golden Friet' is our prestigious award given to the food truck voted best in show by festival attendees. The winning truck receives a golden friet trophy and automatic entry to next year's festival."
    },
    {
      question: "Do you offer any discounts for group bookings?",
      answer: "Yes, we offer group discounts for parties of 10 or more. Please contact our ticket office for more information on group rates and packages."
    }
  ];

  ngOnInit() {
    this.qaList = this.qaList.map(qa => ({ ...qa, isOpen: false }));
  }
}
