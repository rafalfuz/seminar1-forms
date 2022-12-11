import { Component } from '@angular/core';
import { FormControl, NonNullableFormBuilder } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  myForm = new FormControl({
    disabled: false,
    value: 'myFirstControl'
  },{
    updateOn: 'change',
    nonNullable: true
  })

  myGroupForm = this.formBuilder.group({
    firstMadeGroupControl: this.formBuilder.control,
    secondMadeGroupControl: this.formBuilder.control,
    thirdMadeGroupControl: this.formBuilder.control,
  })

  constructor(private formBuilder: NonNullableFormBuilder){
    this.myForm.valueChanges.subscribe(console.log) //najwazniejsze dwa observable
    this.myForm.statusChanges.subscribe(console.log)

    this.myForm.enable()
    this.myForm.reset() // po resecie przywroci na initialValue lub null
  }
}

