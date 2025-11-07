import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Province {
  name: string;
  code: number;
  division_type: string;
  phone_code: number;
  codename: string;
  districts?: District[];
}

export interface District {
  name: string;
  code: number;
  codename: string;
  division_type: string;
  province_code: number;
  wards?: Ward[];
}

export interface Ward {
  name: string;
  code: number;
  codename: string;
  division_type: string;
  district_code: number;
}

@Injectable({ providedIn: 'root' })
export class ProvincesService {
  private baseUrl = 'https://provinces.open-api.vn/api';

  constructor(private http: HttpClient) {}

  getProvinces(): Observable<Province[]> {
    return this.http.get<Province[]>(`${this.baseUrl}/v1/?depth=2`);
  }

  getDistricts(provinceCode: number): Observable<District[]> {
    return this.http.get<District[]>(`${this.baseUrl}/v1/p/${provinceCode}?depth=2`);
  }

  getWards(districtCode: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/v1/d/${districtCode}?depth=2`);
  }

  searchDistricts(query: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/v1/d/search/?q=${encodeURIComponent(query)}`);
  }
}

