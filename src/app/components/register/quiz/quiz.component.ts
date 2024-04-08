import { Component,inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { confirmPasswordValidator } from 'src/app/validator/confirm-password.validator';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class RegisterComponent {

  formValues: FormGroup;
  router = inject(Router);

  constructor(){
    this.formValues = new FormGroup({
      id: new FormControl('', []),
      username: new FormControl('', [Validators.required]),
      email: new FormControl('',[Validators.required]),
      password: new FormControl('',[Validators.required]),
      repeat: new FormControl('',[Validators.required]),
      telephone: new FormControl('',[Validators.required])
    }, {validators: [confirmPasswordValidator]});
  }

  async onSubmit() {
    const user = this.formValues.value;
    delete user.repeat;
    
    //Lanzamos mensaje de que todo ha ido bien
    Swal.fire(
      'Enhorabuena!',
      'Se ha registrado correctamente ' + user.username + ', procede a logearse.',
      'success'
    )
    this.router.navigate(['/login']);
  }

    // Control de errores en formulario
    controlError(nombreCampo: string, tipoError: string): boolean {
      if (this.formValues.get(nombreCampo)?.hasError(tipoError) && 
          this.formValues.get(nombreCampo)?.touched) 
      {
        return true
      }
      return false
    }
}
