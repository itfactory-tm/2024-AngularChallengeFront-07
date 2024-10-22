import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

interface QA {
  question: string;
  answer: string;
  isOpen?: boolean;
}

@Component({
  selector: 'app-q-and-a',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './q-and-a.component.html',
  styleUrl: './q-and-a.component.css'
})
export class QAndAComponent implements OnInit {
  qaList: QA[] = [
    {
      question: "What is FritFest?",
      answer: "FritFest is a unique 3-day festival celebrating food truck cuisine, with a special focus on fries and other fried delicacies. It's a family-friendly event featuring live music, food competitions, and activities for all ages."
    },
    {
      question: "When and where is FritFest held?",
      answer: "FritFest is held annually on the first weekend of July in Antwerp's Sportpaleis. The exact dates for this year are July 1-3, 2023."
    },
    {
      question: "Is FritFest suitable for children?",
      answer: "Absolutely! FritFest is designed to be fun for all ages. We have dedicated areas with activities for children, including fry-themed games, face painting, and kid-friendly food options."
    },
    {
      question: "How much do tickets cost?",
      answer: "Ticket prices vary depending on the type and duration. Single-day tickets start at €25 for adults and €15 for children (ages 5-12). Weekend passes and VIP options are also available. Children under 5 enter for free."
    },
    {
      question: "Are there vegetarian and vegan options available?",
      answer: "Yes! While we celebrate fried foods, we ensure there are plenty of options for all dietary preferences. Many food trucks offer vegetarian and vegan dishes, including plant-based fries and creative meat-free alternatives."
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
    }
  ];

  ngOnInit() {
    this.qaList = this.qaList.map(qa => ({ ...qa, isOpen: false }));
  }
}
