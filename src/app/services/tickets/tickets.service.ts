import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, of, filter, EMPTY } from 'rxjs';
import { StatutTicket } from 'src/app/modele/statut-ticket';
import { ITicket } from 'src/app/modele/ticket';
import {v4 as uuidv4} from 'uuid';
import { GlobalVariables } from 'src/globalVariables';

@Injectable({
  providedIn: 'root'
})
export class TicketsService {

  statutTicketActif = StatutTicket.actif
  statutTicketAttente = StatutTicket.attente
  statutTicketTraite = StatutTicket.traite
  
  constructor(private http:HttpClient, private param: GlobalVariables) { }

  getAllTickets():Observable<ITicket[]>
  {
    return this.http.get<ITicket[]>(this.param.api+ 'tickets').pipe();
  }

  getTicketById(id:string):Observable<ITicket>{
    return this.getAllTickets().pipe(
      map(x=>
        {
          return x.find(p=>p.id==id) as ITicket
        })
    );
  }
  getTicketByIdUnique(uniqueId:string): Observable<ITicket[]> {
   return this.http.get<ITicket[]>(this.param.api+ 'tickets').pipe(
     map(x=>
       {
         return x.filter(t=> t.idUnique.toLowerCase().startsWith(uniqueId))
       })
   );        
 }

  getAllTicketsActifs():Observable<ITicket[]>{
    
    return this.getAllTickets().pipe(
      map(x=>
        {
          return x.filter(p=>p.statut == this.statutTicketActif)
        })
    );    
  }
  getAllTicketsAttente():Observable<ITicket[]>{
    
    return this.getAllTickets().pipe(
      map(x=>
        {
          return x.filter(p=>p.statut == this.statutTicketAttente)
        })
    );    
  }
  
  getNextTicketActif():Observable<ITicket[]>{
     return this.getAllTicketsActifs();
  }
  getMinDate(listTicketsActifs : ITicket[] | undefined): ITicket{
    if(listTicketsActifs == undefined){
        let retour : ITicket ={
            id:"-1",
            idUnique:"",
            date_heure: new Date,
            idFileAttente:  null,
            idPersonne: null,
            statut: this.statutTicketActif
        };
        return retour;
    }
    else{
     let minDate :Date = listTicketsActifs[0].date_heure;
     let indexChercher = 0;
      for (let index = 1; index < listTicketsActifs.length; index++) {
        if (listTicketsActifs[index].date_heure.getTime() < minDate.getTime()) {
          minDate = listTicketsActifs[index].date_heure;
          indexChercher = index;
        }
      }
      return listTicketsActifs[indexChercher];
    }
    
  }

  modifierTicket(ticket:ITicket)
  {
    return this.http.post(this.param.api+ 'tickets',ticket);
  }
  attribuerTicket(id_patient : string | null, id_service : string | null):Observable<ITicket>
  {
    let ticket : ITicket = {
      // id optional; backend will assign unique id
      idUnique: '123456',
      date_heure: new Date,
      idFileAttente: id_service,
      idPersonne: id_patient,
      statut: this.statutTicketActif
    };

    this.http.post(this.param.api+ 'tickets',ticket).subscribe();

    return of(ticket);
  }
  
  modifierOuNouveauTicket(ticketRecent: ITicket):Observable < ITicket>
  {
    this.http.post("api/tickets",ticketRecent).subscribe();
    let ticket : ITicket = {
      // id optional
      idUnique: '123456',
      date_heure: new Date,
      idFileAttente: "ABC",
      idPersonne: "1",
      statut: this.statutTicketActif
    };

    ticketRecent = ticket

    return of (ticketRecent); 
  }
  
}
