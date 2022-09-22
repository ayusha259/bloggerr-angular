import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, tap, throwError } from 'rxjs';
import { Blog } from '../blogs/blog.model';
import { BlogStorageService } from '../blogs/blogs-storage.service';
import { ILogin, ISignup, User } from './auth.model';

interface ILoginResponse {
  data: {
    user_id: string;
    name: string;
    username: string;
    email: string;
    profile: string;
    token: string;
    expiresIn: number;
  };
  state: number;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  user: User = null;
  isAuth = new BehaviorSubject<boolean>(false);

  private userSavedBlogs: string[] = [];

  constructor(
    private http: HttpClient,
    private router: Router,
    private blogStorage: BlogStorageService
  ) {}

  handleError(error: any) {
    let newError = 'Oops! Something went wrong';
    if (!error.error || !error.error.name) {
      return throwError(() => {
        return new Error(newError);
      });
    }
    if (error.error.name === 'ValidationError') {
      newError = 'Email or Password is incorrect';
    }
    return throwError(() => {
      return new Error(newError);
    });
  }

  logout() {
    this.user = null;
    this.isAuth.next(false);
    this.blogStorage.clearStorage();
    this.userSavedBlogs = [];
    localStorage.removeItem('userData');
    this.router.navigate(['/auth/login']);
  }

  handleSaveUser(res: ILoginResponse) {
    const data = res.data;
    const expiresIn = new Date(data.expiresIn * 1000);
    const newUser = new User(
      data.name,
      data.username,
      data.profile,
      data.token,
      expiresIn
    );
    this.user = newUser;
    this.isAuth.next(true);
    this.getSavedBlogs();
    localStorage.setItem('userData', JSON.stringify(newUser));
  }

  autoLogin() {
    let existsUser: {
      name: string;
      username: string;
      profile: string;
      _token: string;
      _expiresIn: string;
    } = JSON.parse(localStorage.getItem('userData'));
    if (!existsUser) {
      return;
    }
    const loggedUser = new User(
      existsUser.name,
      existsUser.username,
      existsUser.profile,
      existsUser._token,
      new Date(existsUser._expiresIn)
    );

    if (loggedUser.token) {
      this.user = loggedUser;
      this.isAuth.next(true);
      this.getSavedBlogs();
    }
  }

  login(data: ILogin) {
    return this.http
      .post<ILoginResponse>('users/login', data)
      .pipe(catchError(this.handleError), tap(this.handleSaveUser.bind(this)));
  }

  signUp(data: ISignup) {
    return this.http
      .post<ILoginResponse>('users/signup', data)
      .pipe(catchError(this.handleError), tap(this.handleSaveUser.bind(this)));
  }

  private getSavedBlogs() {
    this.http
      .get<{ data: Blog[]; status: number }>('users/savedblogs')
      .subscribe((blogs) => {
        const newBlogs = blogs.data.map((blog) => blog._id);
        this.userSavedBlogs = newBlogs;
      });
  }

  get savedBlogs() {
    return this.userSavedBlogs.slice();
  }
}
