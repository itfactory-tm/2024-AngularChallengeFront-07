import { Edition } from './edition';

export interface Sponsor {
  sponsorId: string;
  sponsorName: string;
  sponsorLogo: string;
  sponsorMail: string;
  amount: number;
  sponsoredItem: string;
}
