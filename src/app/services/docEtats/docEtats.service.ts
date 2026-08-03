import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { IDocEtats } from 'src/app/modele/doc-etats';
import { GlobalVariables } from 'src/globalVariables';

@Injectable({
  providedIn: 'root'
})
export class DocEtatsService {

  private readonly apiUrl = this.param.api + 'docEtats';
  constructor(private http:HttpClient, private param: GlobalVariables) { }

  getAllDocEtats():Observable<IDocEtats[]>
  {
    return this.http.get<IDocEtats[]>(this.apiUrl).pipe(map(x=>x));
  }

  getDocEtatsById(id:string):Observable<IDocEtats>{
    return this.http.get<IDocEtats>(this.apiUrl+'/'+id).pipe(map(x=>x));
  }

   getDocEtatsByDocument(idDocument:string): Observable<IDocEtats[]> {
    return this.http.get<IDocEtats[]>(this.apiUrl+'document/'+idDocument).pipe(map(x=>x));
  }

  ajouterDocEtats(docEtat:IDocEtats)
  {
    return this.http.post(this.apiUrl,docEtat);
  }
}
