import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root',
  })
export class GlobalVariables {
    // URL de base de l'API principale (backend documentparcours)
    api: string = "http://localhost:8684/documentparcours/";
    // api: string = "http://localhost:4200/parcours/";

    // URL de base de l'API Python de lecture de codes-barres et QR codes (pythonCodeBarReader)
    apiPythonCodeBarReader: string = "http://localhost:8000/";
}