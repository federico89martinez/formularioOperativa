import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from
'@angular/fire/firestore';
import { Observable } from 'rxjs';
import { MessageI } from '../models/message.interface';
import { PersonaI } from '../models/persona';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataApiService {

  contactCollection: AngularFirestoreCollection<MessageI>;
  contacts: Observable <MessageI[]>;
  contactsDoc: AngularFirestoreDocument<MessageI>;
  persona: Observable <PersonaI[]>;

  

  constructor(public afs: AngularFirestore) { 

    
    
  }
    //return this.afs.collection("contacts").valueChanges.length;
  
  clasificarColeccion(clasif: string){


    if (clasif == "Cap"){
    this.contactCollection = this.afs.collection<MessageI>('contacts');
    //this.contacts = afs.collection('contacts').valueChanges();
    this.contacts = this.contactCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as MessageI;
        const id = a.payload.doc.id;
        return { id, ...data};
      }))
    );
    }
    if(clasif=="Sub"){
      this.contactCollection = this.afs.collection<MessageI>('contactsSub');
    this.contacts = this.contactCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as MessageI;
        const id = a.payload.doc.id;
        return { id, ...data};
      }))
    );
    }

    }

  getContactsSub(){
    return this.afs.collection("contactsSub").snapshotChanges();
  }

  getContacts(){
    //return this.contacts;
    return  this.afs.collection("contacts").snapshotChanges();
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
