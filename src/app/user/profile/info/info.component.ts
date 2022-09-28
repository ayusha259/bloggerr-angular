import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from 'src/app/auth/auth.model';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss'],
})
export class InfoComponent implements OnInit {
  loading: boolean = false;
  user: User;
  saving: boolean = false;
  savedPromt: boolean = false;

  @ViewChild('form') form: NgForm;

  currentImage: string;

  constructor(private auth: AuthService, private http: HttpClient) {}

  ngOnInit(): void {
    if (!this.auth.user) return;
    this.user = this.auth.user;
    this.currentImage = this.user.profile;
  }

  onSave(): void {
    if (this.form.invalid) return;
    this.saving = true;
    this.http.put('users/update', this.form.value).subscribe((res) => {
      console.log(res);
      this.saving = false;
      this.savedPromt = true;
      this.updateLoacalStorage(this.form.value);
      setTimeout(() => {
        this.savedPromt = false;
      }, 1500);
    });
  }

  private updateLoacalStorage(data: any): void {
    let oldData = JSON.parse(localStorage.getItem('userData'));
    oldData = { ...oldData, ...data, profile: data.image_url };
    localStorage.setItem('userData', JSON.stringify(oldData));
  }
}
