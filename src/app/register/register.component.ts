import { Component } from '@angular/core';
import { User } from '../entities';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  user:User = {email:'', password:''};
  feedback = '';
  repeat='';
  isLogin=false;
  constructor(private authService:AuthService){}

  onSubmit() {
    if(!this.isLogin) {

      this.authService.addUser(this.user).subscribe({
        complete:() => this.feedback ='Registration complete.',
        error: () => this.feedback = 'User already exists'
      });
    } else {
      this.authService.login(this.user).subscribe({
        complete:() => this.feedback ='Login successful.',
        error: () => this.feedback = 'Credentials error'
      });
    }
  }
}
