  import { Component, OnInit } from '@angular/core';
  import { NavbarComponent } from '../navbar/navbar.component';
  import { ClientService } from '../../client.service';
  import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
  import { CommonModule } from '@angular/common';
  import { Router } from '@angular/router';

  @Component({
    selector: 'app-login',
    standalone: true,
    imports: [NavbarComponent,CommonModule,ReactiveFormsModule],
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
  })
  export class LoginComponent implements OnInit {
    loginForm!: FormGroup;

    constructor(
      private fb: FormBuilder,
      private clientService: ClientService,
      private router: Router
    ) {}

    ngOnInit(): void {
      this.loginForm = this.fb.group({
        code: ['', Validators.required],
        adherant: ['', Validators.required],
        password: ['', Validators.required]
      });
    }

    onSubmit() {
  const { code, adherant, password } = this.loginForm.value;
  this.clientService.authenticate(code, adherant, password).subscribe(
    (response) => {
      console.log('Authentication response:', response);
      this.clientService.setClient(response.user);
      this.router.navigate(['/home']);
    },
    (error) => {
      console.error('Authentication error:', error);
      if (error.status === 401) {
        console.log('User is not authenticated');
      } else {
        console.error('An error occurred:', error);
      }
    }
  );
}
  }
