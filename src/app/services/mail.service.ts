import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Mail } from '../interfaces/mail';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MailService {

  //private ApiUrl = `${environment.api_url}/boughtTickets`; 
  private ApiUrl = "https://localhost:7005/api/Mail";

  constructor(private httpClient: HttpClient) { }

  sendEmail(mail: Mail): Observable<Mail> {
    const body = { 
      nameReceiver: mail.nameReceiver,
      emailReceiver: mail.emailReceiver,
      subject: mail.subject,
      body: mail.body
     };

    console.log(body)
    return this.httpClient.post<Mail>(`${this.ApiUrl}`, body);
  }

}
