import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root',
  })
export class GlobalVariables {
    api: string = "http://localhost:8684/documentparcours/";
}