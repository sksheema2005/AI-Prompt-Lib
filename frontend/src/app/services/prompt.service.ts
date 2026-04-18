import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Tag {
  id?: number;
  name: string;
  color?: string;
}

export interface Prompt {
  id?: number;
  title: string;
  content: string;
  complexity: number;
  created_at?: string;
  view_count?: number;
  tags?: Tag[];
}

@Injectable({
  providedIn: 'root'
})
export class PromptService {
  private apiUrl = '/api/prompts/';
  private tagsUrl = '/api/tags/';

  constructor(private http: HttpClient) { }

  getPrompts(): Observable<Prompt[]> {
    return this.http.get<Prompt[]>(this.apiUrl);
  }

  getPrompt(id: number): Observable<Prompt> {
    return this.http.get<Prompt>(`${this.apiUrl}${id}/`);
  }

  addPrompt(prompt: any): Observable<Prompt> {
    return this.http.post<Prompt>(this.apiUrl, prompt);
  }

  getTags(): Observable<Tag[]> {
    return this.http.get<Tag[]>(this.tagsUrl);
  }
}
