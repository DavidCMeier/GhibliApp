import { TestBed } from '@angular/core/testing';

import { ApiService } from './api.service';
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { API_BASE_URL } from "../../root/tokens/tokens";
import { ParamsUrl } from "../models/params-url.model";

describe('ApiService', () => {
  let service: ApiService;
  let httpTestingController: HttpTestingController;
  const apiBaseUrl = 'http://localhost:3000';
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [{ provide: API_BASE_URL, useValue: apiBaseUrl }]
    });

    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(ApiService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('get', () => {

    it('should call with the url test and method GET', () => {
      const url = 'test';

      service.get(url).subscribe();

      const req = httpTestingController.expectOne(`${apiBaseUrl}/${url}`);

      expect(req.request.method).toEqual('GET');

      req.flush({});
    });
    it('should call with the url test with the param test and the value 1', () => {
      const url = 'test';
      const params: ParamsUrl = {test: '1'};
      service.get(url, params).subscribe();

      const req = httpTestingController.expectOne(`${apiBaseUrl}/${url}?test=1`);
      req.flush({});
    });
  });
  describe('post', () => {
    it('should call with the url test and method POST', () => {
      const url = 'test';

      service.post(url, {}).subscribe();

      const req = httpTestingController.expectOne(`${apiBaseUrl}/${url}`);

      expect(req.request.method).toEqual('POST');

      req.flush({});
    });
    it('should call with the url test with the param test and the value 1', () => {
      const url = 'test';
      const params: ParamsUrl = {test: '1'};
      service.post(url, {}, params).subscribe();

      const req = httpTestingController.expectOne(`${apiBaseUrl}/${url}?test=1`);

      req.flush({});
    });

    it('should call with the body content', () => {
      const url = 'test';
      const body = {test: false};
      service.post(url, body).subscribe();

      const req = httpTestingController.expectOne(`${apiBaseUrl}/${url}`);

      expect(req.request.body).toEqual(body);

      req.flush({});
    });
  });
});
