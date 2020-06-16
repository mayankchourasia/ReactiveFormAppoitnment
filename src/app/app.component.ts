import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { setTimeout } from 'timers';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
 
  genders= ['male', 'female'];
  signupForm : FormGroup;
  forbiddenUsernames = ['Harsh', 'Omkar'];

  ngOnInit(){
    this.signupForm = new FormGroup({
      'userData': new FormGroup({
        'username': new FormControl(null, [Validators.required, this.forbiddenNames.bind(this)]),
        'email': new FormControl(null, [ Validators.required, Validators.email ], this.forbiddenEmails)
      }),
      'gender': new FormControl('male'),
      'hobbies': new FormArray([])
    });

    this.signupForm.patchValue({
      'userData': {
        'username': 'harsh',
        'email': 'chourasiaharsh051@gmail.com'
      }
    });
  }

  onSubmit(){    console.log(this.signupForm);
    this.signupForm.reset({
      'gender': 'male'
    });
  }

  onAddHobies(){
    const control = new FormControl(null, Validators.required);
    (<FormArray>this.signupForm.get('hobbies')).push(control);
  }

  forbiddenNames(control: FormControl): {[s: string]: boolean}{
    if(this.forbiddenUsernames.indexOf(control.value) !== -1){
        return {'nameForbidden': true};
    }
    return null;
  }

  forbiddenEmails(control: FormControl): Promise<any> | Observable<any>{
    const promise = new Promise<any>((resolve, reject)=>{
      setTimeout(() =>{
        if(control.value === 'test@test.com'){
          resolve({'emailIsForbidden': true});
        }else{
          resolve(null);
        }
      },1500);
    });
    return promise;
  }
}
