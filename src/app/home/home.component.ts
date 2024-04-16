
import { Router } from '@angular/router';
import { ClientService } from './../../client.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',


  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  userName = String

  constructor(private Clientservice: ClientService,  private router: Router) { }


  ngOnInit() {
    const client = this.Clientservice.getClient();
    console.log("code:", client.code)
    console.log("nom:", client.adherant)
    console.log("email:", client.email)
    console.log('Client:', client);
    this.userName = client.adherant

  }



    clearLocalStorage(): void {
      localStorage.clear();
      console.log('Local storage cleared');
      this.router.navigate(['login']);

    }
    nav1(){
      const client = this.Clientservice.getClient();

      this.router.navigate(['appeldufond'], { state: { client } });
    }

  }


