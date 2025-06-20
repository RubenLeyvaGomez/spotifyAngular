import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.css']
})
export class AuthPageComponent implements OnInit {
  errorSession: boolean = false
  formLogin: FormGroup = new FormGroup({});

  constructor(private authService: AuthService, private cookie: CookieService, 
    private router:Router
  ) { }

  ngOnInit(): void {
    this.formLogin = new FormGroup({

      email: new FormControl('',[
        Validators.required,
        Validators.email
      ]),
      password: new FormControl('',[
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(12)
      ])

    })
  }

  sendLogin(): void{
    const {email, password} = this.formLogin.value
    this.authService.sendCredentials(email, password) 
    .subscribe(responseOk =>{
      console.log('sesion iniciada')
      const {tokenSession , data} = responseOk
      this.cookie.set('token', tokenSession, 4, '/') //se guarda la cookie
      this.router.navigate(['/', 'tracks'])
    }, 
      err => {
        this.errorSession = true
      })
  }

}
