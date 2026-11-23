import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { GlobalVariables } from 'src/globalVariables';

/**
 * Représente un code-barre ou QR code individuel retourné par l'API pythonCodeBarReader.
 */
export interface DecodedCodeItem {
  text: string;
  format: string;
  engine: string;
}

/**
 * État global du scanner retourné par les endpoints de cycle de vie
 * (/createMediaStream, /stopScanner, /closeScanner, /toggleScanner).
 */
export interface ScannerStateResponse {
  isCameraOpen: boolean;
  isScanning: boolean;
  autoCloseOnScan: boolean;
  multipleScan: boolean;
  mediaStreamActive: boolean;
  code?: string | null;
  scannedData?: string | null;
  scannedDataList: string[];
  message: string;
}

/**
 * Réponse retournée par les endpoints de lecture (/scanCode, /scanMultipleCodes, /scanFile).
 */
export interface ScanResultResponse extends ScannerStateResponse {
  detected: boolean;
  format?: string | null;
  codes: DecodedCodeItem[];
}

/**
 * Réponse retournée par les endpoints /getCode, /setCode et /clearCode.
 */
export interface CodeResponse {
  code?: string | null;
  scannedData?: string | null;
  scannedDataList: string[];
  isCameraOpen: boolean;
  isScanning: boolean;
}

/**
 * Service Angular centralisant :
 *  1. Le flux réactif local (`code`, `setCode`, `getCode`, `clearCode`) utilisé par tous
 *     les composants consommateurs (`list-patients`, `list-personnels`, `list-ressources`,
 *     `new-exemplaire`, `new-ressource`, `modal-choix-personne`).
 *  2. La communication HTTP vers le nouveau service Python `pythonCodeBarReader`
 *     dont l'URL est configurée dans `GlobalVariables.apiPythonCodeBarReader`.
 */
@Injectable({
  providedIn: 'root',
})
export class ModalCodebarreService {
  // Sujet RxJS conservé à l'identique pour diffuser le code lu vers les composants Angular abonnés
  private code: Subject<string | undefined> = new Subject<string | undefined>();

  constructor(private http: HttpClient, private param: GlobalVariables) {}

  // =========================================================================
  // Diffusion locale du code scanné (compatibilité complète avec l'existant)
  // =========================================================================

  /**
   * Diffuse un nouveau code scanné à tous les composants abonnés à `getCode()`.
   * @param data Valeur textuelle du code-barre ou QR code lu.
   */
  setCode(data: string): void {
    this.code.next(data);
  }

  /**
   * Retourne un Observable permettant de recevoir chaque code-barre / QR code lu.
   */
  getCode(): Observable<string | undefined> {
    return this.code.asObservable();
  }

  /**
   * Réinitialise le code diffusé à une chaîne vide.
   */
  clearCode(): void {
    this.code.next('');
  }

  // =========================================================================
  // Redirection vers le service Python `pythonCodeBarReader`
  // =========================================================================

  /**
   * Initialise une session de scan côté serveur `pythonCodeBarReader`.
   * Appelle `POST {apiPythonCodeBarReader}createMediaStream`.
   */
  createMediaStream(
    autoCloseOnScan: boolean = false,
    multipleScan: boolean = true,
    useLocalCamera: boolean = false,
    cameraIndex: number = 0
  ): Observable<ScannerStateResponse> {
    return this.http.post<ScannerStateResponse>(
      this.param.apiPythonCodeBarReader + 'createMediaStream',
      {
        autoCloseOnScan,
        multipleScan,
        useLocalCamera,
        cameraIndex,
      }
    );
  }

  /**
   * Envoie une image (frame vidéo en Base64) au service `pythonCodeBarReader`
   * pour décoder un code unique (code-barre ou QR code).
   * Appelle `POST {apiPythonCodeBarReader}scanCode`.
   */
  scanCode(imageBase64: string): Observable<ScanResultResponse> {
    return this.http.post<ScanResultResponse>(
      this.param.apiPythonCodeBarReader + 'scanCode',
      {
        imageBase64,
        multipleScan: false,
      }
    );
  }

  /**
   * Envoie une image (frame vidéo en Base64) au service `pythonCodeBarReader`
   * en mode scan continu / multiple.
   * Appelle `POST {apiPythonCodeBarReader}scanMultipleCodes`.
   */
  scanMultipleCodes(
    imageBase64: string,
    autoCloseOnScan: boolean = false
  ): Observable<ScanResultResponse> {
    return this.http.post<ScanResultResponse>(
      this.param.apiPythonCodeBarReader + 'scanMultipleCodes',
      {
        imageBase64,
        autoCloseOnScan,
        multipleScan: true,
      }
    );
  }

  /**
   * Envoie directement un fichier image (PNG, JPEG...) au service `pythonCodeBarReader`.
   * Appelle `POST {apiPythonCodeBarReader}scanFile`.
   */
  scanFile(
    file: File,
    multipleScan: boolean = true,
    autoCloseOnScan: boolean = false
  ): Observable<ScanResultResponse> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('multipleScan', String(multipleScan));
    formData.append('autoCloseOnScan', String(autoCloseOnScan));

    return this.http.post<ScanResultResponse>(
      this.param.apiPythonCodeBarReader + 'scanFile',
      formData
    );
  }

  /**
   * Bascule l'état actif/inactif du scanner sur `pythonCodeBarReader`.
   * Appelle `POST {apiPythonCodeBarReader}toggleScanner`.
   */
  toggleScanner(
    multipleScan?: boolean,
    useLocalCamera: boolean = false
  ): Observable<ScannerStateResponse> {
    return this.http.post<ScannerStateResponse>(
      this.param.apiPythonCodeBarReader + 'toggleScanner',
      {
        multipleScan,
        useLocalCamera,
      }
    );
  }

  /**
   * Arrête la session de scan sur le service `pythonCodeBarReader`.
   * Appelle `POST {apiPythonCodeBarReader}stopScanner`.
   */
  stopScanner(): Observable<ScannerStateResponse> {
    return this.http.post<ScannerStateResponse>(
      this.param.apiPythonCodeBarReader + 'stopScanner',
      {}
    );
  }

  /**
   * Ferme le scanner sur le service `pythonCodeBarReader`.
   * Appelle `POST {apiPythonCodeBarReader}closeScanner`.
   */
  closeScanner(): Observable<ScannerStateResponse> {
    return this.http.post<ScannerStateResponse>(
      this.param.apiPythonCodeBarReader + 'closeScanner',
      {}
    );
  }

  /**
   * Récupère le dernier code stocké sur le service `pythonCodeBarReader`.
   * Appelle `GET {apiPythonCodeBarReader}getCode`.
   */
  getRemoteCode(): Observable<CodeResponse> {
    return this.http.get<CodeResponse>(
      this.param.apiPythonCodeBarReader + 'getCode'
    );
  }

  /**
   * Enregistre manuellement un code sur le service `pythonCodeBarReader`.
   * Appelle `POST {apiPythonCodeBarReader}setCode`.
   */
  setRemoteCode(data: string): Observable<CodeResponse> {
    return this.http.post<CodeResponse>(
      this.param.apiPythonCodeBarReader + 'setCode',
      { data }
    );
  }

  /**
   * Réinitialise le code stocké sur le service `pythonCodeBarReader`.
   * Appelle `DELETE {apiPythonCodeBarReader}clearCode`.
   */
  clearRemoteCode(): Observable<CodeResponse> {
    return this.http.delete<CodeResponse>(
      this.param.apiPythonCodeBarReader + 'clearCode'
    );
  }
}
