import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { PromptService, Prompt } from '../../services/prompt.service';

@Component({
  selector: 'app-prompt-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './prompt-detail.html',
  styleUrl: './prompt-detail.css'
})
export class PromptDetailComponent implements OnInit {
  // Use signals for reliable reactivity
  prompt = signal<Prompt | null>(null);

  constructor(
    private route: ActivatedRoute,
    private promptService: PromptService
  ) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.promptService.getPrompt(id).subscribe({
        next: (data) => {
          this.prompt.set(data);
        },
        error: (err) => {
          console.error('Error fetching prompt:', err);
        }
      });
    }
  }
}
