import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, delay } from 'rxjs';

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
  author_id?: number;
}

@Injectable({
  providedIn: 'root'
})
export class PromptService {
  private mockPrompts: Prompt[] = [
    { id: 1, title: 'Sample Web App Prompt', content: 'Create a beautiful web app using modern design principles.', complexity: 3, view_count: 42, tags: [{name: 'Web Dev'}] },
    { id: 2, title: 'Data Analysis Script', content: 'Write a python script to analyze sales data and generate charts.', complexity: 4, view_count: 15, tags: [{name: 'Data Science'}] }
  ];

  private mockTags: Tag[] = [
    { id: 1, name: 'Web Dev' },
    { id: 2, name: 'Data Science' },
    { id: 3, name: 'Creative Writing' }
  ];

  constructor(private http: HttpClient) { }

  getPrompts(): Observable<Prompt[]> {
    return of(this.mockPrompts).pipe(delay(300));
  }

  getPrompt(id: number): Observable<Prompt> {
    const prompt = this.mockPrompts.find(p => p.id === id) || this.mockPrompts[0];
    return of(prompt).pipe(delay(200));
  }

  addPrompt(prompt: any): Observable<Prompt> {
    const newPrompt = { ...prompt, id: Date.now() };
    this.mockPrompts.push(newPrompt);
    return of(newPrompt).pipe(delay(400));
  }

  updatePrompt(id: number, prompt: any): Observable<Prompt> {
    const index = this.mockPrompts.findIndex(p => p.id === id);
    if (index !== -1) {
      this.mockPrompts[index] = { ...this.mockPrompts[index], ...prompt };
    }
    return of(this.mockPrompts[index]).pipe(delay(400));
  }

  deletePrompt(id: number): Observable<any> {
    this.mockPrompts = this.mockPrompts.filter(p => p.id !== id);
    return of({ success: true }).pipe(delay(300));
  }

  getTags(): Observable<Tag[]> {
    return of(this.mockTags).pipe(delay(200));
  }
}

