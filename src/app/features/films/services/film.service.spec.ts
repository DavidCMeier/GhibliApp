import { TestBed } from '@angular/core/testing';

import { FilmService } from './film.service';
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { ApiService } from "../../../core/services/api.service";
import { mocked, MockedObject } from 'ts-jest/dist/utils/testing';
import { of } from "rxjs";
import { film } from "../models/film.fixture";

jest.mock('../../../core/services/api.service');

describe('FilmService', () => {
  let service: FilmService;
  let apiService: MockedObject<typeof ApiService>;

  beforeEach(() => {
    jest.clearAllMocks();
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ApiService]
    });
    service = TestBed.inject(FilmService);
    apiService = mocked(ApiService, true);

  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  describe('when getting all the films', () => {
    it('should call to films endpoint', () => {
      const mockGet = mocked(apiService.mock.instances[0].get);
      mockGet.mockReturnValueOnce(of([film]));

      service.getListFilms();

      expect(mockGet).toHaveBeenCalledWith('films');
    });
  });

  describe('when search films', () => {
    it('should return the film contains the query on the name', (done) => {
      const mockGet = mocked(apiService.mock.instances[0].get);
      mockGet.mockReturnValueOnce(of([film]));

      service.searchFilms('tes').subscribe((data) => {
        expect(data).toEqual([film]);
        done()
      });
    });
    it('should return no return any film', (done) => {
      const mockGet = mocked(apiService.mock.instances[0].get);
      mockGet.mockReturnValueOnce(of([film]));

      service.searchFilms('Star').subscribe((data) => {
        expect(data).toEqual([]);
        done()
      });
    });
  });

  describe('when get one film by id', () => {
    it('should call to films/test endpoint', () => {
      const mockGet = mocked(apiService.mock.instances[0].get);
      mockGet.mockReturnValueOnce(of([film]));

      service.getFilmById('test');

      expect(mockGet).toHaveBeenCalledWith('films/test');
    });
  });
});
