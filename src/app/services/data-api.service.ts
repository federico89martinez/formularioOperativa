import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from
'@angular/fire/firestore';
import { Observable } from 'rxjs';
import { MessageI } from '../models/message.interface';
import { PersonaI } from '../models/persona';
import { map } from 'rxjs/operators';
import { SeccionI } from '../models/model.interface';


@Injectable({
  providedIn: 'root'
})
export class DataApiService {

  contactCollection: AngularFirestoreCollection<MessageI>;
  contacts: Observable <MessageI[]>;
  contactsDoc: AngularFirestoreDocument<MessageI>;
  persona: Observable <PersonaI[]>;
  seccion: any;
  private secciones : SeccionI[] = [
    {
      id:1,
      name: 'Pl My'
    },
    {
      id:2,
      name: 'Sec Cdo Ser'
    },
    {
      id:3,
      name: 'CCPr'
    },
    {
      id:4,
      name: 'Enl Int'
    },
    {
      id:5,
      name: 'CC Secund'
    },
    {
      id:6,
      name: 'Telecom Pc'
    }
  ]

  getSecciones(): SeccionI[]{
    return this.secciones;
  }

  constructor(public afs: AngularFirestore) {  }
    //return this.afs.collection("contacts").valueChanges.length;
  
  clasificarColeccion(clasif: string){


    if (clasif == "Pl My"){
    this.contactCollection = this.afs.collection<MessageI>('PlMy');
    //this.contacts = afs.collection('contacts').valueChanges();
    this.contacts = this.contactCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as MessageI;
        const id = a.payload.doc.id;
        return { id, ...data};
      }))
    );
    }
    if(clasif=="Sec Cdo Ser"){
      this.contactCollection = this.afs.collection<MessageI>('SecCdoSer');
    this.contacts = this.contactCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as MessageI;
        const id = a.payload.doc.id;
        return { id, ...data};
      }))
    );
    }
    if(clasif=="CCPr"){
      this.contactCollection = this.afs.collection<MessageI>('CCPr');
    this.contacts = this.contactCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as MessageI;
        const id = a.payload.doc.id;
        return { id, ...data};
      }))
    );
    }
    if(clasif=="Enl Int"){
      this.contactCollection = this.afs.collection<MessageI>('EnlInt');
    this.contacts = this.contactCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as MessageI;
        const id = a.payload.doc.id;
        return { id, ...data};
      }))
    );
    }
    if(clasif=="CC Secund"){
      this.contactCollection = this.afs.collection<MessageI>('CCSecund');
    this.contacts = this.contactCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as MessageI;
        const id = a.payload.doc.id;
        return { id, ...data};
      }))
    );
    }
    if(clasif=="Telecom Pc"){
      this.contactCollection = this.afs.collection<MessageI>('TelecomPc');
    this.contacts = this.contactCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as MessageI;
        const id = a.payload.doc.id;
        return { id, ...data};
      }))
    );
    }

    }

  
  getContactsPlMy(){
    //return this.contacts;
    return  this.afs.collection("PlMy").snapshotChanges();
  }

  getContactsSecCdoSer(){
    return this.afs.collection("SecCdoSer").snapshotChanges();
  }


  getContactsSub(){
    return this.afs.collection("contactsSub").snapshotChanges();
  }


  getContactsSSVV(){
    return this.afs.collection("contactsSSVV").snapshotChanges();
  }

  //metodos para traer formularios?

  saveMessage(newContact: MessageI): void {
    this.contactCollection.add(newContact);
  }

  addForm(contacts: MessageI){
    console.log('new form');
    this.contactCollection.add(contacts);
  }

  deleteForm(contacts: MessageI){
    this.contactsDoc = this.afs.doc(`contacts/${contacts.id}`);
    this.contactsDoc.delete();
  }

  
  updateForm(contact: MessageI){
    this.contactsDoc = this.afs.doc(`contacts/${contact.id}`);
    this.contactsDoc.update(contact);
  }

  /**
   * estos metodos los va a usar el administrador para tener control con todos los usuarios
   */
  getPersona(){
    return  this.afs.collection("persona").snapshotChanges();
  }

  createPersona(persona:any){
     return this.afs.collection("persona").add(persona);
  }

  updatePersona(id:any,persona: any){
    this.afs.collection("persona").doc(id).update(persona);
  }

  deletePersona(id:any){
    this.afs.collection("persona").doc(id).delete();
  }

  
}
