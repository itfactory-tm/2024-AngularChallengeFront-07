import { Edition } from './edition';

export interface Sponsor {
  sponsorId: string;
  sponsorName: string;
  sponsorMail: string;
  amount: number;
  sponsoredItem: string;
  editionId: string;
  editionName: string;
}
