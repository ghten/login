import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';

import swal from 'sweetalert2';

import { emailValidator } from '../../utils/app-validators';

import { User } from '../../models/user';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;

  constructor(private authservice: AuthService, public router: Router, public fb: FormBuilder) {
    this.loginForm = this.fb.group({
      email: [null, Validators.compose([Validators.required, emailValidator])],
      password: [null, Validators.compose([Validators.required, Validators.minLength(8)])]
    });

   }

  ngOnInit(): void {
    if (this.authservice.isAuthenticated()) {
      this.router.navigate(['/home']);
    }
  }

  public onSubmit(values: User): void {
    if (this.loginForm.valid) {
      const user = new User();
      user.email = values.email;
      user.password = values.password;

      this.authservice.login(user).subscribe(response => {
        this.authservice.saveToken(response.access_token);
        this.authservice.getUser().subscribe(data => {
          // Your code
          this.router.navigate(['/home']);
        });
      },
      error => {
        if (error.status === 400) {
          swal.fire('Error login', 'Incorrect email or password.', 'error');
        }
      });
    }
  }
}
