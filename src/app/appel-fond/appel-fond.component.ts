import { AppelfondService } from './../../appelfond.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ClientService } from '../../client.service';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';
import { Appelfond } from '../appelfond';

@Component({
  selector: 'app-appel-fond',
  standalone: true,
  imports: [NavbarComponent,CommonModule,ReactiveFormsModule],
  templateUrl: './appel-fond.component.html',
  styleUrls: ['./appel-fond.component.css']
})
export class AppelFondComponent implements OnInit {
  client: any;
  userName: string = '';
  email: string = '';
  code: number = 0;
  appeldufondForm: FormGroup = new FormGroup({});
  constructor(private clientService: ClientService, private formBuilder: FormBuilder, private appelfondService: AppelfondService
  ) { }

  ngOnInit() {
    this.client = history.state.client;
    if (this.client) {
      console.log('Client:', this.client);
      const client = this.clientService.getClient();

      this.userName = client?.adherant || '';
      this.email = client?.email || '';
      this.code = client?.code || 0;
      console.log(this.code);

    } else {
      console.error('No client data found');
    }
    this.appeldufondForm = this.formBuilder.group({
      B50: [0, [Validators.required, Validators.min(0)]],
      B20: [0, [Validators.required, Validators.min(0)]],
      B10: [0, [Validators.required, Validators.min(0)]],
      B5: [0, [Validators.required, Validators.min(0)]],
      monnaie: [0, [Validators.required, Validators.min(0)]],
      total: [{ value: 0, disabled: true }]
    });
    this.appeldufondForm.get('B50')!.valueChanges.subscribe(() => this.calculateTotal());
    this.appeldufondForm.get('B20')!.valueChanges.subscribe(() => this.calculateTotal());
    this.appeldufondForm.get('B10')!.valueChanges.subscribe(() => this.calculateTotal());
    this.appeldufondForm.get('B5')!.valueChanges.subscribe(() => this.calculateTotal());
    this.appeldufondForm.get('monnaie')!.valueChanges.subscribe(() => this.calculateTotal());
  }

  calculateTotal() {
    const B50Control = this.appeldufondForm.get('B50');
    const B20Control = this.appeldufondForm.get('B20');
    const B10Control = this.appeldufondForm.get('B10');
    const B5Control = this.appeldufondForm.get('B5');
    const monnaieControl = this.appeldufondForm.get('monnaie');
    const totalControl = this.appeldufondForm.get('total');

    const B50 = B50Control ? B50Control.value || 0 : 0;
    const B20 = B20Control ? B20Control.value || 0 : 0;
    const B10 = B10Control ? B10Control.value || 0 : 0;
    const B5 = B5Control ? B5Control.value || 0 : 0;
    const monnaie = monnaieControl ? monnaieControl.value || 0 : 0;

    console.log('B50:', B50);
    console.log('B20:', B20);
    console.log('B10:', B10);
    console.log('B5:', B5);
    console.log('monnaie:', monnaie);

    const total = (50 * B50) + (20 * B20) + (10 * B10) + (5 * B5) + monnaie;

    console.log('total:', total);

    if (totalControl) {
      totalControl.enable();
      totalControl.setValue(total);
      totalControl.disable();
    }
  }
  validateInput(event: any, controlName: string) {
    if (event.target.value < 0) {
      event.target.value = 0;
      this.appeldufondForm.get(controlName)?.setValue(0);
    }
  }

  submitAppelFond() {
   const B50 = this.appeldufondForm.get('B50')?.value || 0;
    const B20 = this.appeldufondForm.get('B20')?.value || 0;
    const B10 = this.appeldufondForm.get('B10')?.value || 0;
    const B5 = this.appeldufondForm.get('B5')?.value || 0;
    const monnaie = this.appeldufondForm.get('monnaie')?.value || 0;

    const client = this.clientService.getClient();

    let appelfond = new Appelfond(new Date(), client, B50, B20, B10, B5, monnaie);

    this.appelfondService.addAF(appelfond).subscribe(response => {
      console.log('Response from server:', response);
      alert("demande envoyer avec succees ! !")
    }, error => {
      console.error('Error:', error);
    });
  }


}
