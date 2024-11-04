import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-privacy',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './privacy.component.html',
  styleUrls: ['./privacy.component.css']
})
export class PrivacyComponent {
  sections = [
    {
      title: '1. Information We Collect',
      content: 'We collect information you provide directly to us, such as when you create an account, make a purchase, or contact us for support. This may include:<ul class="list-disc list-inside ml-4"><li>Name and contact information</li><li>Payment information</li><li>Device and usage information</li></ul>'
    },
    {
      title: '2. How We Use Your Information',
      content: 'We use the information we collect to:<ul class="list-disc list-inside ml-4"><li>Provide and maintain our services</li><li>Process transactions and send related information</li><li>Respond to your comments and questions</li><li>Send you technical notices and security alerts</li></ul>'
    },
    {
      title: '3. Information Sharing and Disclosure',
      content: 'We may share your information in the following situations:<ul class="list-disc list-inside ml-4"><li>With your consent</li><li>To comply with legal obligations</li><li>To protect our rights and prevent fraud</li></ul>'
    },
    {
      title: '4. Data Security',
      content: 'We implement appropriate technical and organizational measures to protect your personal information against unauthorized or unlawful processing, accidental loss, destruction, or damage.'
    },
    {
      title: '5. Your Rights',
      content: 'You have the right to access, correct, or delete your personal information. To exercise these rights, please contact us at privacy@fritfest.com.'
    }
  ];
}
