import { Routes } from '@angular/router';
import { OpenTicket } from './open-ticket/open-ticket';
import { HomeDetails } from './home-details/home-details';
import { CreateUser } from './create-user/create-user';
import { CheckTicket } from './check-ticket/check-ticket';
import { ViewTicket } from './view-ticket/view-ticket';
import { UserTicketStatus } from './user-ticket-status/user-ticket-status';
import { CreateTicket } from './create-ticket/create-ticket';
import { UpdateTicket } from './update-ticket/update-ticket';
export const routes: Routes = [ 
  { path: '', component: HomeDetails },
  { path: 'home', component: HomeDetails }, 
  { path: 'open-ticket', component: OpenTicket },
   { path: 'create-user', component: CreateUser },
   { path: 'check-ticket', component: CheckTicket },
   { path: 'view-ticket', component: ViewTicket },
    { path: 'status-ticket', component: UserTicketStatus },
     { path: 'create-ticket', component: CreateTicket },
      { path: 'update-ticket', component: UpdateTicket }
];

