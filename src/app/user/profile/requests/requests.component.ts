import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

export interface Request {
  _id: string;
  user: {
    profile: {
      url: string;
      public_id: string;
    };
    _id: string;
    name: string;
    username: string;
  };
  blog: {
    cover_image: {
      url: string;
      public_id: string;
    };
    _id: string;
    title: string;
    user: string;
    category: string;
    createdAt: string;
    slug: string;
  };
  body: string;
  createdAt: string;
  updatedAt: string;
}

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.scss'],
})
export class RequestsComponent implements OnInit {
  requests: Request[] = [];
  loading: boolean = false;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchRequests();
  }

  private fetchRequests() {
    this.loading = true;
    this.http
      .get<{ data: Request[]; status: number }>('users/comments/requests')
      .subscribe({
        next: (data) => {
          this.requests = data.data;
          this.loading = false;
        },
        error: (error) => {
          this.loading = false;
          console.log(error);
        },
      });
  }
}
