import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { auth } from 'firebase/app';
import { AuthService } from '../../../services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public afAuth: AngularFireAuth,private router: Router, private authService: AuthService) 
  { }
  public email: string = '';
  public password: string = '';

  ngOnInit() {
  }
  
  onLogin(): void {

    this.authService.loginEmailUser(this.email, this.password)
    .then( (res)=> {
     this.router.navigate(['admin/list-books']);
    }).catch(err => console.log('err',err.message) );
   
  }

  onLogout(){
    //this.afAuth.auth.signOut();
    this.authService.logoutUser();

  }


  
}
