import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, of, tap } from 'rxjs';
import { GameConfig } from '../models/config.model';
import { environment } from '../../environments/environment';

/**
 * ConfigService
 *
 * This service is responsible for managing game configurations. It fetched
 * the game configuration from the configUrl and caches it. Next time, it returns
 * the cached game configuration.
 */
@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  private configUrl = environment.configUrl;
  private cache: GameConfig | null = null;

  constructor(private http: HttpClient) {}

  // Returns the cached or fetched game configuration.
  getConfig(): Observable<GameConfig> {
    if (this.cache) {
      return of(this.cache);
    }
    return this.http.get<GameConfig>(this.configUrl).pipe(
      tap((config) => {
        this.cache = config;
      }),
      catchError(this.handleError<GameConfig>())
    );
  }

  private handleError<T>() {
    return (error: HttpErrorResponse): Observable<T> => {
      console.error(`Fetching game config failed: ${error.message}`);
      return of(null as T);
    };
  }
}
