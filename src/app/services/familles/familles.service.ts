import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IFamille } from 'src/app/modele/famille';
import { TypeUnite } from 'src/app/modele/type-unite';
import { GlobalVariables } from 'src/globalVariables';

@Injectable({
  providedIn: 'root',
})
export class FamillesService {
  constructor(private http: HttpClient, private param: GlobalVariables) {}

  getAllFamilles(): Observable<IFamille[]> {
    return this.http.get<IFamille[]>(this.param.api+ 'familles').pipe(map((x) => x));
  }

  getFamilleById(id: string): Observable<IFamille> {
    return this.http.get<IFamille>(this.param.api+ 'familles/' + id).pipe(map((x) => x));
  }

  getFamillesByLibelle(libelle: string): Observable<IFamille[]> {
    return this.http.get<IFamille[]>(this.param.api+ 'familles').pipe(
      map((x) => {
        return x.filter((p) => p.libelle.toLowerCase().startsWith(libelle));
      })
    );
  }

  ajouterFamille(famille: IFamille) {
    return this.http.post(this.param.api+ 'familles', famille);
  }

  getTypeUnite(): Observable<TypeUnite> {
    return this.http.get<TypeUnite>('api/typeUnite').pipe(map((x) => x));
  }
}
