import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
 selector: 'app-home-details',
  standalone: true,                   // Required for standalone
  imports: [RouterOutlet],            // Required imports
  templateUrl: './home-details.html',
  styleUrls: ['./home-details.css'],  
})
export class HomeDetails {

}
