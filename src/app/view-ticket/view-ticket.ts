import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiCallService } from '../api-call-service';

@Component({
  selector: 'app-view-ticket',
   imports: [CommonModule],
  templateUrl: './view-ticket.html',
  styleUrl: './view-ticket.css',
})
export class ViewTicket {
  ticket: any = null;

  constructor(private route: ActivatedRoute,private apiCallService: ApiCallService,private router: Router) {}
 ngOnInit() {
  debugger
    this.apiCallService.selectedTicket.subscribe(selected => {
      if (selected) {
        console.log("Dynamic ticket selection:", selected);
        this.ticket = selected;
      }
    });

    this.apiCallService.currentTicket.subscribe(state => {
      if (state && state.data && !this.ticket) {
       
        const ticketNo = Number(state.ticketNo);
        this.ticket = state.data.find(
          (x: any) => x.getAllTickets.tic_UniqueNum === ticketNo
        );
        console.log("Initial form submission ticket:", this.ticket);
      }
    });
  }


onCheckstatus() {
  
  this.apiCallService.currentTicket.subscribe(state => {
    if (state && state.data) {
      debugger
      this.apiCallService.setAllTickets(state.data); 
      this.router.navigate(['/status-ticket']);
    } else {
      console.warn("No ticket data available to send");
    }
  }).unsubscribe(); 
}


}
