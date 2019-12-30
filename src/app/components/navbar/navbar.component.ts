import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { AngularFireAuth} from '@angular/fire/auth';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private authService: AuthService, private afsAuth: AngularFireAuth) { }

  public app_name: string = 'Inicio';
  public isLogged: boolean = false; //con esto visilibizamos funcionalidad

  getCurrentUser(){
    this.authService.isAuth().subscribe( auth => {
      if (auth){
        console.log('user logged');
        this.isLogged = true;
      }else{
        console.log('NOT logged');
        this.isLogged = false;
      }
    })
  }
  
  ngOnInit() {
    this.getCurrentUser();
  }

  onLogout(){
    this.afsAuth.auth.signOut();
  }

}
