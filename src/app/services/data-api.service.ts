import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from
'@angular/fire/firestore';
import { Observable } from 'rxjs';
import { MessageI } from '../models/message.interface';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataApiService {

  contactCollection: AngularFirestoreCollection<MessageI>;
  contacts: Observable <MessageI[]>;
  contactsDoc: AngularFirestoreDocument<MessageI>;

  

  constructor(public afs: AngularFirestore) { 
    
    this.contactCollection = afs.collection<MessageI>('contacts');
    //this.contacts = afs.collection('contacts').valueChanges();
    this.contacts = this.contactCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as MessageI;
        const id = a.payload.doc.id;
        return { id, ...data};
      }))
    );
    
  }

  getContacts(){
    return this.contacts;
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



}
