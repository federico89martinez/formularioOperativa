import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { UserInterface } from '../../../models/user';
import { DataApiService } from '../../../services/data-api.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  config: any;
  collection = { count :10, data: []}
  email2 : any ;

  constructor(private authService: AuthService, private dataAs : DataApiService) { }

  user: UserInterface ={
    name: '',
    email: '',
    photoUrl: '',
    displayName: '',
    roles: {}
  } ;

  ngOnInit() {
    this.config = {
      itemsPerpage: 5,
      currentPage: 1,
      totalItems: this.collection.count
    }


    this.dataAs.getPersona().subscribe(resp=> {
      this.collection.data = resp.map((e:any) => {
        return{
         dni: e.payload.doc.data().dni,
         nroorden: e.payload.doc.data().nroorden,
         grado: e.payload.doc.data().grado,
         apellido: e.payload.doc.data().apellido,
         nombre: e.payload.doc.data().nombre,
         responsabilidad: e.payload.doc.data().responsabilidad,
         password: e.payload.doc.data().password,
         email: e.payload.doc.data().email,
         idFirebase: e.payload.doc.id
        }
      })
      
      this.buscarResponsabilidad();
   },
   error=>{
     console.error(error)
   });

   this.authService.isAuth().subscribe(user => {
    if (user) {
     // this.user = user
     this.user.displayName = user.displayName;
      this.user.email = user.email;
     this.user.photoUrl = user.photoURL;
      console.log('USER', user);
      }
  })


  }
  
  buscarResponsabilidad(){
    
    this.collection.data.forEach(element => {
      this.email2 = Object.values(element)[7];
    if(this.user.email == this.email2){

      this.user.displayName =  Object.values(element)[5];
    }
  });

  }
 

}
