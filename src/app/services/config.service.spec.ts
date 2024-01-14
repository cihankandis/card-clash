import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { ConfigService } from './config.service';
import { GameConfig } from '../models/config.model';
import { catchError } from 'rxjs';

describe('ConfigService', () => {
  let configService: ConfigService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ConfigService],
    });

    configService = TestBed.inject(ConfigService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(configService).toBeTruthy();
  });

  it('should fetch and cache the game configuration', () => {
    const mockConfig: GameConfig = {
      numberOfPlayers: 4,
      maxCardSlots: 5,
      suits: [],
    };

    configService.getConfig().subscribe((config) => {
      expect(config).toEqual(mockConfig);
    });

    const req = httpTestingController.expectOne(configService['configUrl']);
    expect(req.request.method).toBe('GET');

    req.flush(mockConfig);

    configService.getConfig().subscribe((config) => {
      expect(config).toEqual(mockConfig);
    });

    httpTestingController.expectNone(configService['configUrl']);
  });

  it('should handle HTTP errors', () => {
    const errorMessage = 'HTTP Error';

    configService
      .getConfig()
      .pipe(
        catchError((error) => {
          fail('Expected a successful response, but got an error');
          return error;
        })
      )
      .subscribe(() => {});

    const req = httpTestingController.expectOne(configService['configUrl']);
    expect(req.request.method).toBe('GET');

    req.flush(null, { status: 500, statusText: errorMessage });
  });
});
