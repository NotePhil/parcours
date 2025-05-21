import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ICaisses } from 'src/app/modele/caisses';
import { GlobalVariables } from 'src/globalVariables';

@Injectable({
  providedIn: 'root'
})
export class CaissesService {

  constructor(private http: HttpClient, private param: GlobalVariables) { }

  getAllCaisses():Observable<ICaisses[]>
  {
    return this.http.get<ICaisses[]>(this.param.api+'caisses').pipe(map(x=>x));
  }

  getCaisseById(id:string):Observable<ICaisses>{
    return this.getAllCaisses().pipe(
      map(x=>
        {
          return x.find(p=>p.id==id) as ICaisses
        })
    );
  }

  getCaissesByLibelle(libelle:string): Observable<ICaisses[]> {
    return this.http.get<ICaisses[]>(this.param.api+'caisses').pipe(
      map(x=>
        {
          return x.filter(p=> p.libelle.toLowerCase().startsWith(libelle))
        })
    );
   }

  ajouterCaisse(caisse:ICaisses)
  {
    return this.http.post(this.param.api+"caisses",caisse);
  }
}
