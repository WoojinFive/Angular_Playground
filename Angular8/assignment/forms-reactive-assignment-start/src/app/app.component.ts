import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';

import { CustomValidators } from './custom-validators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  myForm: FormGroup;
  projectStatus = ['Stable', 'Critical', 'Finished'];

  ngOnInit() {
    this.myForm = new FormGroup({
      'projectName': new FormControl(
        null, 
        [Validators.required, CustomValidators.inValidProjectName], 
        CustomValidators.asyncInvalidProjectName
      ),
      'email': new FormControl(null, [Validators.required, Validators.email], this.forbiddenEmails),
      'projectStatus': new FormControl('Critical')
    });
  }

  onSubmit() {
    console.log(this.myForm);
  }

  forbiddenEmails(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        if (control.value === 'test@test.com') {
          resolve({'emailIsForbidden': true});
        } else {
          resolve(null);
        }
      }, 1500);
    });
    return promise;
  }
}
