import { Component } from '@angular/core';
import { AbstractControl, FormControl, NonNullableFormBuilder, ValidatorFn, Validators } from '@angular/forms';

//       TWORZENIE WLASNEGO WALIDATORA
//    schemat głowny
//  const someValidFn: ValidatorFn = (control: AbstractControl) => {          
//      return null                                                                
//            ^ tutaj warunek
//    na koniec dodac do Validatorow
//}

    const someValidFn: ValidatorFn = (control: AbstractControl) =>{
      return control.value.toLowerCase().includes('sth') ? {err: true} : null
    }


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

  

  myGroupForm = this.myFormGroup()   // przypisuje sobie do zmiennej myFormGroup

  constructor(private formBuilder: NonNullableFormBuilder){
    this.myForm.valueChanges.subscribe(console.log) //najwazniejsze dwa observable
    this.myForm.statusChanges.subscribe(console.log)

    this.myForm.enable()
    this.myForm.reset() // po resecie przywroci na initialValue lub null

    this.myGroupForm.valueChanges.subscribe(console.log)
  }

  addFile(event: Event){
    const input = event.target as HTMLInputElement      
    
    if(input.files && input.files[0]){
      const file = input.files[0]

      this.myGroupForm.controls.fileToAddInGroupControl.setValue(file)   // kontrolka nie jest przypisana w template i robimy to recznie stad!
    }    
  }


  sendForm(){
    // przed wyslaniem formularza musimy dotknac wszystkich kontrolek
    this.myGroupForm.markAllAsTouched()
    if(this.myGroupForm.invalid){         
      return
    }
    console.log('Sent')
  }


  private myFormGroup(){
    return this.formBuilder.group({
      firstMadeGroupControl: this.formBuilder.control('',{
        validators: [Validators.required]
      }),
      secondMadeGroupControl: this.formBuilder.control('',{
        validators: [Validators.required, someValidFn ]
      }),
      thirdMadeGroupControl: this.formBuilder.control(''),
      fileToAddInGroupControl: this.formBuilder.control<File | null>(null)
    })
  }

}

