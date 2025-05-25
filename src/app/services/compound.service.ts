import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ApiService } from './api.service';
import { Compound, CompoundResponse, PaginationParams } from '../models/compound.model';

@Injectable({
  providedIn: 'root'
})
export class CompoundService {
  constructor(private apiService: ApiService) {}

  getCompounds(params: PaginationParams): Observable<CompoundResponse> {
    return this.apiService.get<any>('/compounds', params).pipe(
      map(response => {
        
        if (response.compounds) {
          return response;
        } else if (Array.isArray(response)) {
          
          return {
            compounds: response,
            total: response.length > 0 ? 30 : 0, 
            currentPage: params.page,
            totalPages: Math.ceil(30 / 10)
          };
        } else {
          return {
            compounds: response.compounds || [],
            total: response.total || 30,
            currentPage: params.page,
            totalPages: Math.ceil((response.total || 30) / 10)
          };
        }
      })
    );
  }

  getCompoundById(id: number): Observable<Compound> {
    return this.apiService.get<Compound>(`/compounds/${id}`);
  }

  updateCompound(id: number, compound: Partial<Compound>): Observable<Compound> {
    return this.apiService.put<Compound>(`/compounds/${id}`, compound);
  }
}