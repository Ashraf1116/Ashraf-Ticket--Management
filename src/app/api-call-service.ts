import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiCallService {
  private apiUrl = 'https://localhost:7092/api/Home';
   private tapiUrl = 'https://localhost:7092/api/Ticket';

  constructor(private http: HttpClient) {}

  getEntityTypes(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/EntityType`);
  }
getalltickets(): Observable<any> {
    return this.http.get<any>(`${this.tapiUrl}/GetAllTickets`);
  }
  registerUser(data: any) {
    return this.http.post<any>(`${this.apiUrl}/register`, data);
  }

  registerTicket(payload: any) {
    return this.http.post<any>(`${this.tapiUrl}/RegisterTicket`, payload);
  }

updateTicket(payload: any) {
    return this.http.put<any>(`${this.tapiUrl}/UpdateTicket`, payload);
  }

  private ticketSource = new BehaviorSubject<any>(null);
  currentTicket = this.ticketSource.asObservable();

  setTicket(data: any) {
    this.ticketSource.next(data);
  }

  private selectedTicketSource = new BehaviorSubject<any>(null);
  selectedTicket = this.selectedTicketSource.asObservable();

  setSelectedTicket(ticket: any) {
    this.selectedTicketSource.next(ticket);
  }

  private allTicketsSource = new BehaviorSubject<any[]>([]);
  allTickets = this.allTicketsSource.asObservable();

  setAllTickets(tickets: any[]) {
    this.allTicketsSource.next(tickets);
  }
}
