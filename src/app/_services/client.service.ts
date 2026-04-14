import {inject, Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  private readonly http: HttpClient = inject(HttpClient);

  login(): Observable<{ token: string, name: string }> {
    return this.http.get< { token: string, name: string } >('https://mocki.io/v1/6f7635cd-da2d-462f-9a64-36d72f3a9de4');
  }
}
