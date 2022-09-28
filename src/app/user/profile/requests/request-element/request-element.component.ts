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
  decliningComment: boolean = false;
  approved: boolean = false;
  denied: boolean = false;
  constructor(private http: HttpClient) {}

  approveComment(id: string, type: 'approve' | 'deny') {
    if (type === 'approve') {
      this.approvingComment = true;
    } else if (type === 'deny') {
      this.decliningComment = true;
    }
    this.http.put(`blogs/comments/${type}/${id}`, {}).subscribe((res) => {
      if (type === 'approve') {
        this.approvingComment = false;
        this.approved = true;
      } else if (type === 'deny') {
        this.decliningComment = false;
        this.denied = true;
      }
    });
  }
}
