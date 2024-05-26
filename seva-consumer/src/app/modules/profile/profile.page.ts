import { Component } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';

import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage {

  profileForm = this.formBuilder.group({
    name: [ null, [Validators.required] ],
    phone: [ null, [Validators.required] ],
    dob: [ null, [Validators.required] ],
    aadhar: [ null, [Validators.required] ],
    pan: [ null ],
    emergencyContactName: [ null ],
    emergencyContactPhone: [ null ],
  });

  constructor(
    public appservice: AppService,
    private formBuilder: UntypedFormBuilder
  ) { }

}
