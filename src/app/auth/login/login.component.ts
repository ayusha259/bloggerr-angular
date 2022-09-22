import { Component, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ILogin } from '../auth.model';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-auth-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  togglePasswordShow: boolean = false;
  loading = false;
  error: string = null;
  redirect: boolean = null;

  @ViewChild('form') form: NgForm;

  constructor(
    private auth: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void {
    const params = this.route.snapshot.queryParams;
    if (params.redirect) {
      this.redirect = true;
    }
  }

  onSubmit() {
    if (this.form.invalid) return;
    this.loading = true;
    const data: ILogin = {
      username: this.form.value.username,
      password: this.form.value.password,
    };
    this.auth.login(data).subscribe({
      next: () => {
        this.loading = false;
        this.error = null;
        if (this.redirect) {
          this.location.back();
        } else {
          this.router.navigate(['/blogs']);
        }
      },
      error: (error) => {
        this.error = error.message;
        console.log(error);
        this.loading = false;
      },
    });
  }
}
