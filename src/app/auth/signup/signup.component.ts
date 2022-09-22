import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ISignup } from '../auth.model';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-auth-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  @ViewChild('form') form: NgForm;
  loading = false;
  error: string = null;
  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit(): void {}

  onSubmit() {
    if (this.form.invalid) return;
    this.loading = true;
    const value = this.form.value;
    const data: ISignup = {
      name: value.first_name + value.last_name,
      username: value.username,
      email: value.email,
      password: value.password,
    };
    this.auth.signUp(data).subscribe({
      next: () => {
        this.loading = false;
        this.error = null;
        this.router.navigate(['/blogs']);
      },
      error: (error) => {
        this.error = error.message;
        console.log(error);
        this.loading = false;
      },
    });
  }
}
