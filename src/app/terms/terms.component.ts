import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-terms',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './terms.component.html',
  styleUrls: ['./terms.component.css']
})
export class TermsComponent {
  sections = [
    {
      title: '1. Acceptance of Terms',
      content: 'By accessing or using FritFest\'s services, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any part of these terms, you may not use our services.'
    },
    {
      title: '2. Use of Services',
      content: 'You agree to use our services only for lawful purposes and in accordance with these Terms. You are prohibited from:<ul class="list-disc list-inside ml-4"><li>Violating any applicable laws or regulations</li><li>Infringing on the intellectual property rights of others</li><li>Transmitting any harmful or malicious code</li><li>Attempting to gain unauthorized access to our systems</li></ul>'
    },
    {
      title: '3. User Accounts',
      content: 'You are responsible for maintaining the confidentiality of your account and password. You agree to notify us immediately of any unauthorized use of your account.'
    },
    {
      title: '4. Intellectual Property',
      content: 'All content, features, and functionality of our services are owned by FritFest and are protected by international copyright, trademark, and other intellectual property laws.'
    },
    {
      title: '5. Limitation of Liability',
      content: 'FritFest shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of or inability to use our services.'
    },
    {
      title: '6. Changes to Terms',
      content: 'We reserve the right to modify these Terms at any time. We will notify you of any changes by posting the new Terms on this page. For any questions, please contact us at terms@fritfest.com.'
    }
  ];
}
