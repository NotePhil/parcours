import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { IEtats } from 'src/app/modele/etats';
import { GlobalVariables } from 'src/globalVariables';

@Injectable({
  providedIn: 'root'
})
export class EtatService {

  constructor(private http:HttpClient, private param: GlobalVariables) { }

  getAllEtats():Observable<IEtats[]>
  {
    return this.http.get<IEtats[]>(this.param.api+ 'etats').pipe(map(x=>x));
  }

  getEtatById(id:string):Observable<IEtats>{
    return this.getAllEtats().pipe(
      map(x=>
        {
          return x.find(p=>p.id==id) as IEtats
        })
    );
  }

   getEtatByLibelle(libelle:string): Observable<IEtats[]> {
    return this.http.get<IEtats[]>(this.param.api+ 'etats').pipe(
      map(x=>
        {
          return x.filter(e=> e.libelle.toLowerCase().startsWith(libelle))
        })
    );        
  }

  ajouterEtat(etat:IEtats)
  {
    return this.http.post(this.param.api+ 'etats',etat);
  }
}
