
import { Router } from '@angular/router';
import { ClientService } from './../../client.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  userName = String

  constructor(private Clientservice: ClientService,  private router: Router) { }


  ngOnInit() {
    const client = this.Clientservice.getClient();
    console.log('Client:', client);
    this.userName = client.adherant

  }



    clearLocalStorage(): void {
      localStorage.clear();
      console.log('Local storage cleared');
      this.router.navigate(['login']);

    }
  }


