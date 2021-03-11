import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from
'@angular/fire/firestore';
import { Observable } from 'rxjs';
import { MessageI } from '../models/message.interface';
import { PersonaI } from '../models/persona';
import { map } from 'rxjs/operators';
import { CausaI, GradoI, SeccionI } from '../models/model.interface';


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
      name: 'Telecom PC'
    }
  ]

  private grados : GradoI[] = [
    {
      id:1,
      name: 'CR'
    },
    {
      id:2,
      name: 'TC'
    },
    {
      id:3,
      name: 'MY'
    },
    {
      id:4,
      name: 'CT'
    },
    {
      id:5,
      name: 'TP'
    },
    {
      id:6,
      name: 'TT'
    },
    {
      id:7,
      name: 'ST'
    },
    {
      id:8,
      name: 'SM'
    },
    {
      id:9,
      name: 'SP'
    },
    {
      id:10,
      name: 'SA'
    },
    {
      id:11,
      name: 'SI'
    },
    {
      id:12,
      name: 'SG'
    },
    {
      id:13,
      name: 'CI'
    },
    {
      id:14,
      name: 'CB'
    },
    {
      id:15,
      name: 'CB Art 11'
    },
    {
      id:16,
      name: 'VP'
    },
    {
      id:17,
      name: 'VS'
    },
    {
      id:18,
      name: 'VS "EC"'
    },
    {
      id:19,
      name: 'AC'
    }
  ]

  private causas : CausaI[] = [
    {
      id:1,
      name: 'Autorizado'
    },
    {
      id:2,
      name: 'Parte de Enfermo'
    },
    {
      id:3,
      name: 'Licencia Especial'
    },
    {
      id:4,
      name: 'Licencia por Maternidad'
    },
    {
      id:5,
      name: 'Licencia por Retiro'
    },
    {
      id:6,
      name: 'Guardia Entrante'
    },
    {
      id:7,
      name: 'Guardia Saliente'
    },
    {
      id:8,
      name: 'FEI Entrante'
    },
    {
      id:9,
      name: 'FEI Saliente'
    },
    {
      id:10,
      name: 'Comisión Cas Of'
    },
    {
      id:11,
      name: 'Comisión Cas Subof'
    },
    {
      id:12,
      name: 'Comisión Rancho de Tropas'
    },
    {
      id:13,
      name: 'Comisión Casa 17'
    },
    {
      id:14,
      name: 'Comisión Hípica'
    },
    {
      id:15,
      name: 'Comisión Cdo Br Bl I'
    },
    {
      id:16,
      name: 'Comisión BAL Tandil'
    },
    {
      id:17,
      name: 'Comisión Ca San 1'
    },
    {
      id:18,
      name: 'Comisión Exterior'
    },
    {
      id:19,
      name: 'Comisión Panadería'
    },
    {
      id:20,
      name: 'Otra'
    }
  ]

  getSecciones(): SeccionI[]{
    return this.secciones;
  }

  getGrados(): GradoI[]{
    return this.grados;
  }

  getCausas(): CausaI[]{
    return this.causas;
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
    if(clasif=="Telecom PC"){
      this.contactCollection = this.afs.collection<MessageI>('TelecomPC');
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

  getContactsCCPr(){
    return this.afs.collection("CCPr").snapshotChanges();
  }

  getContactsEnlInt(){
    return this.afs.collection("EnlInt").snapshotChanges();
  }

  getContactsCCSecund(){
    return this.afs.collection("CCSecund").snapshotChanges();
  }

  getContactsTelecomPC(){
    return this.afs.collection("TelecomPC").snapshotChanges();
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
