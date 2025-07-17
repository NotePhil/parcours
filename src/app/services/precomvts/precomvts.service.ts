import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IPrecoMvt } from 'src/app/modele/precomvt';
import { GlobalVariables } from 'src/globalVariables';

@Injectable({
  providedIn: 'root',
})
export class PrecoMvtsService {
  constructor(private http: HttpClient, private param: GlobalVariables) {}

  getAllPrecomvts(): Observable<IPrecoMvt[]> {
    return this.http.get<IPrecoMvt[]>(this.param.api+ 'precomvt').pipe(map((x) => x));
  }

  getPrecomvtById(id: string): Observable<IPrecoMvt> {
    return this.getAllPrecomvts().pipe(
      map((x) => {
        return x.find((p) => p.id == id) as IPrecoMvt;
      })
    );
  }

  getPrecomvtsByLibelle(libelle: string): Observable<IPrecoMvt[]> {
    return this.http.get<IPrecoMvt[]>(this.param.api+ 'precomvt').pipe(
      map((x) => {
        return x.filter((p) => p.libelle.toLowerCase().startsWith(libelle));
      })
    );
  }

  ajouterPrecomvt(precomvt: IPrecoMvt) {
    return this.http.post(this.param.api+ 'precomvt', precomvt);
  }
}
