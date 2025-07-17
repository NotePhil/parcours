import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IParours } from 'src/app/modele/parours';
import { IEtape } from 'src/app/modele/etape';
import { GlobalVariables } from 'src/globalVariables';

@Injectable({
  providedIn: 'root',
})
export class ParoursService {
  constructor(private http: HttpClient, private param: GlobalVariables) {}

  getAllParours(): Observable<IParours[]> {
    return this.http.get<IParours[]>(this.param.api+ 'parours').pipe(map((x) => x));
  }

  getParoursById(id: string): Observable<IParours> {
    return this.getAllParours().pipe(
      map((x) => {
        return x.find((p) => p.id == id) as IParours;
      })
    );
  }

  getParoursBylibelle(libelle: string): Observable<IParours[]> {
    return this.http.get<IParours[]>(this.param.api+ 'parours').pipe(
      map((x) => {
        return x.filter((p) => p.libelle.toLowerCase().startsWith(libelle));
      })
    );
  }

  ajouterParours(parours: IParours) {
    return this.http.post(this.param.api+ 'parours', parours);
  }
  getEtapesByParoursId(paroursId: string): Observable<IEtape[]> {
    return this.http
      .get<IEtape[]>(this.param.api+ 'parours/${paroursId}/etapes')
      .pipe(map((x) => x));
  }
}
