import { Component, OnInit } from '@angular/core';
import { AuthCorreo } from "../auth/auth";
import { RouterModule, Routes, Router } from '@angular/router';
import { AuthService } from "../auth/auth.service";
import { AngularFire } from "angularfire2";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmailService } from '../email-service/email.service';
import { AtletasService } from "../atletas/atletas.service";

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})

export class LoginFormComponent {

  public error: string = null;
  private emptyField: boolean = false;

  private rForm: FormGroup;
  private email: string = '';
  private password: string = '';

  emailPattern = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  constructor(
    private af: AngularFire,
    private router: Router,
    private authService: AuthService,
    private fb: FormBuilder,
    private atletasService: AtletasService,
    private emailService: EmailService
  ) {
    this.af.auth.subscribe(data => {
      this.email = data.auth.email;
    })

    this.rForm = fb.group({
      'password': [null, Validators.compose([Validators.required, Validators.minLength(6)])]
    });

  }

  login_correo() {
    let formValues = this.rForm.value;
    
    this.authService.login_correo(this.email, formValues.password)
      .then(promise => { this.router.navigate(['/reset-password']) },
      (error: any) => {
        if (error.code == "auth/user-not-found") this.error = "Email no registrado";
        if (error.code == "auth/wrong-password") this.error = "Contraseña incorrecta";
      }
    );
  }

  validarCampo(campo) {
    if (!this.rForm.controls[campo].valid && this.rForm.controls[campo].touched) return true;
    if (campo != "password" && this.emptyField) return true;
    return false;
  }

  validarFallo(campo) {
    if (campo == "email" && this.error == "Email no registrado") return true;
    if (campo == "password" && this.error == "Contraseña incorrecta") return true;
    return false;
  }

}

