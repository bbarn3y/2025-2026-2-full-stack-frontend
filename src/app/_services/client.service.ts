import {inject, Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  private readonly http: HttpClient = inject(HttpClient);

  login(): Observable<{ token: string, name: string }> {
    return this.http.get< { token: string, name: string } >('https://mocki.io/v1/6c22c774-cd16-472f-be1a-899658cb7e30');
  }
}
