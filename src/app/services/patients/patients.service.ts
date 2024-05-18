import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IPatient } from 'src/app/modele/Patient';
import { forkJoin, of } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class PatientsService {
  constructor(private http: HttpClient) {}

  // Récupérer tous les patients
  getAllPatients(): Observable<IPatient[]> {
    return this.http.get<IPatient[]>('api/patients').pipe(map((x) => x));
  }

  // Récupérer un patient par son ID
  getPatientById(id: string): Observable<IPatient> {
    return this.getAllPatients().pipe(
      map((x) => {
        return x.find((p) => p.id == id) as IPatient;
      })
    );
  }

  // Récupérer des patients par leur nom
  getPatientsByName(nom: string): Observable<IPatient[]> {
    return this.http.get<IPatient[]>('api/patients').pipe(
      map((x) => {
        return x.filter((p) => p.nom.toLowerCase().startsWith(nom));
      })
    );
  }

  // Récupérer des patients par leur nom ou leur ID
  getPatientsByNameOrId(query: string): Observable<IPatient[]> {
    return this.http.get<IPatient[]>('api/patients').pipe(
      map((patients) => {
        const lowerCaseQuery = query.toLowerCase();

        // Filtrer par ID ou nom
        return patients.filter(
          (p) =>
            p.id.toString().startsWith(query) ||
            p.nom.toLowerCase().startsWith(lowerCaseQuery)
        );
      })
    );
  }

  // Ajouter un patient
  ajouterPatient(patient: IPatient) {
    return this.http.post('api/patients', patient);
  }

  // Récupérer un patient avec ses associés
  getPatientWithAssociates(id: string): Observable<IPatient> {
    return this.http.get<IPatient>(`api/patients/${id}`).pipe(
      map((patient) => {
        // Récupérer les personnes associées si disponibles
        if (
          patient.personnesRatachees &&
          patient.personnesRatachees.length > 0
        ) {
          // Récupérer les détails des personnes associées
          const associatesRequests = patient.personnesRatachees.map((person) =>
            this.getPatientById(person.id).pipe(filter(Boolean)).toPromise()
          );
          return forkJoin([of(patient), ...associatesRequests]).pipe(
            map(([mainPatient, ...associates]) => {
              if (associates.every(Boolean)) {
                mainPatient.personnesRatachees = associates as IPatient[];
              }
              return mainPatient;
            })
          );
        } else {
          return of(patient);
        }
      }),
      switchMap((result) => result)
    );
  }
}
