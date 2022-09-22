import { HttpClient } from '@angular/common/http';
import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-comment-form',
  templateUrl: './comment-form.component.html',
  styleUrls: ['./comment-form.component.scss'],
})
export class CommentFormComponent implements OnInit, OnDestroy {
  isAllowed: boolean = false;
  private isAllowedSub: Subscription;
  postingComment: boolean = false;
  @Input('blogSlug') blog: string;
  showApprove: boolean = false;

  @ViewChild('form') from: NgForm;

  constructor(
    private auth: AuthService,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.isAllowedSub = this.auth.isAuth.subscribe((state) => {
      this.isAllowed = state;
    });
  }

  handleClick() {
    this.router.navigate(['/auth/login'], {
      queryParams: { redirect: '1' },
    });
  }

  onSubmit() {
    if (this.from.invalid) return;
    this.postingComment = true;
    this.http
      .post<{ status: number }>(`blogs/comments/${this.blog}`, {
        body: this.from.value.body,
      })
      .subscribe({
        next: (data) => {
          this.postingComment = false;
          this.from.reset();
          this.showApprove = true;
          setTimeout(() => {
            this.showApprove = false;
          }, 5000);
          console.log(data.status);
        },
        error: (error) => {
          this.postingComment = false;
          console.log(error);
        },
      });
  }

  ngOnDestroy(): void {
    this.isAllowedSub.unsubscribe();
  }
}
