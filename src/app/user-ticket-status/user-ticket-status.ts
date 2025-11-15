import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiCallService } from '../api-call-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-ticket-status',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-ticket-status.html',
  styleUrls: ['./user-ticket-status.css'],
})
export class UserTicketStatus {
  ticketList: any;
  allTicketsList: any[] = [];
  adminTickets: any[] = [];
  role: string | null = null;

  constructor(private apiCallService: ApiCallService, private router: Router) {}

  ngOnInit() {
    this.role = localStorage.getItem("role");
    if (this.role === "Admin") {
      this.getalltickets();
    }
    this.apiCallService.allTickets.subscribe(tickets => {
      this.allTicketsList = tickets;
    });
  }

normalizeTicket(ticket: any) {
  if (ticket.getAllTickets) return ticket;
  return {
    getAllTickets: {
      tic_UniqueNum: ticket.tic_UniqueNum,
      tic_StatusDes: ticket.tic_StatusDes,
      tic_StatusId: ticket.tic_StatusId,
      subject: ticket.subject,
      description: ticket.description,
      tic_Name: ticket.tic_Name
    },
    cli_Name: ticket.cli_Name,
    cli_EmailId: ticket.cli_EmailId,
    cli_MobileNumber: ticket.cli_MobileNumber,
    cli_Address: ticket.cli_Address,
    cli_Description: ticket.cli_Description,
    cli_Id: ticket.cli_Id,
    cli_EntityDetails: ticket.cli_EntityDetails,
    cli_HelpTopic: ticket.cli_HelpTopic
  };
}
  viewTicket(ticket: any) {
    const normalized = this.normalizeTicket(ticket);  
    this.apiCallService.setSelectedTicket(normalized);
    this.router.navigate(['/view-ticket']);
  }

  editTicket(ticket: any) {
    this.apiCallService.setSelectedTicket(ticket);
    this.router.navigate(['/update-ticket']);
  }
  getalltickets() {
    this.apiCallService.getalltickets().subscribe({
      next: (res) => {
        if (res.success) {
          this.adminTickets = res.data;
        }
      },
      error: (err) => console.error("Error loading tickets:", err)
    });
  }
}
