import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {  map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { IEtape } from 'src/app/modele/etape';

@Injectable({
  providedIn: 'root'
})
export class EtapesService {

  constructor(private http:HttpClient) { }

  getAllEtapes():Observable<IEtape[]>
  {
    return this.http.get<IEtape[]>('api/etape').pipe(map(x=>x));
  }

  getEtapeById(id:string):Observable<IEtape>{
    return this.getAllEtapes().pipe(
      map(x=>
        {
          return x.find(p=>p.id==id) as IEtape
        })
    );
  }

   getEtapesBylibelle(libelle:string): Observable<IEtape[]> {
    return this.http.get<IEtape[]>('api/etape').pipe(
      map(x=>
        {
          return x.filter(p=> p.libelle.toLowerCase().startsWith(libelle))
        })
    );
  }

  ajouterEtape(etape:IEtape)
  {
    return this.http.post("api/etape",etape);
  }
}
