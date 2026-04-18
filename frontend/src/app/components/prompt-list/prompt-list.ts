import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PromptService, Prompt } from '../../services/prompt.service';

@Component({
  selector: 'app-prompt-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './prompt-list.html',
  styleUrl: './prompt-list.css'
})
export class PromptListComponent implements OnInit {
  // Use signals for reliable reactivity
  prompts = signal<Prompt[]>([]);

  constructor(private promptService: PromptService) { }

  ngOnInit(): void {
    this.promptService.getPrompts().subscribe({
      next: (data) => {
        console.log('Prompts received:', data);
        this.prompts.set(data);
      },
      error: (err) => {
        console.error('Error fetching prompts:', err);
      }
    });
  }
}
