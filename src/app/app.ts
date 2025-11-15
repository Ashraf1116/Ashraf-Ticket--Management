import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomeDetails } from './home-details/home-details';
import { OpenTicket } from './open-ticket/open-ticket';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  // protected readonly title = 'Ticket_Management';
}