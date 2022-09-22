import { HttpClient } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { Request } from '../requests.component';

@Component({
  selector: 'app-request-element',
  templateUrl: './request-element.component.html',
  styleUrls: ['./request-element.component.scss'],
})
export class RequestElementComponent {
  @Input('request') request: Request;
  approvingComment: boolean = false;
  approved: boolean = false;
  constructor(private http: HttpClient) {}

  approveComment(id: string) {
    this.approvingComment = true;
    this.http.put(`blogs/comments/approve/${id}`, {}).subscribe((res) => {
      this.approvingComment = false;
      this.approved = true;
      console.log(res);
    });
  }
}
