import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { IPersonnel } from 'src/app/modele/personnel';
import { GlobalVariables } from 'src/globalVariables';

@Injectable({
  providedIn: 'root',
})
export class PersonnelsService {
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  constructor(private http: HttpClient, private param: GlobalVariables) {}

  getAllPersonnels(): Observable<IPersonnel[]> {
    return this.http.get<IPersonnel[]>(this.param.api+ 'personnels').pipe(map((x) => x));
  }

  getPersonnelById(id: string): Observable<IPersonnel> {
    return this.getAllPersonnels().pipe(
      map((x) => {
        return x.find((p) => p.id == id) as IPersonnel;
      })
    );
  }

  getPersonnelsByName(nom: string): Observable<IPersonnel[]> {
    return this.http.get<IPersonnel[]>(this.param.api+ 'personnels').pipe(
      map((x) => {
        return x.filter((p) => p.nom.toLowerCase().startsWith(nom));
      })
    );
  }

  getPersonnelsById(id: string): Observable<IPersonnel[]> {
    return this.http.get<IPersonnel[]>(this.param.api+ 'personnels').pipe(
      map((x) => {
        return x.filter((p) => p.id.toLowerCase().startsWith(id));
      })
    );
  }
  
  getPersonelsByNameOrId(query: string): Observable<IPersonnel[]> {
    return this.http.get<IPersonnel[]>(this.param.api+ 'personnels').pipe(
      map((patients) => {
        const lowerCaseQuery = query.toLowerCase();

        // Filter by ID or name
        return patients.filter(
          (p) =>
            p.id.toString().startsWith(query) ||
            p.nom.toLowerCase().startsWith(lowerCaseQuery)
        );
      })
    );
  }

  ajouterPersonnel(personnel: IPersonnel) {
    return this.http.post(this.param.api+ 'personnels', personnel);
  }
  
  getPersonnelByRole(idRole:string): Observable<IPersonnel[]> {
    return this.http.get<IPersonnel[]>(this.param.api+ 'personnels').pipe(
      map(x=>
        {
          return x.filter(e=> e.roles?.some(r=> r.role.id.includes(idRole.toLowerCase())))
        })
    );        
  }

  updatePersonnel(personnel: IPersonnel) {
    return this.http.put('api/personnels', personnel, this.httpOptions).pipe(
      catchError(this.handleError<any>('updateUser'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console instead
      return of(result as T);
    };
  }
}
