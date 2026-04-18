import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { PromptService, Prompt } from '../../services/prompt.service';
import { AuthService } from '../../services/auth.service';

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
    private router: Router,
    private promptService: PromptService,
    public authService: AuthService
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

  deletePrompt(): void {
    const p = this.prompt();
    if (p?.id && confirm('Are you sure you want to delete this prompt?')) {
      this.promptService.deletePrompt(p.id).subscribe({
        next: () => this.router.navigate(['/prompts']),
        error: (err) => console.error(err)
      });
    }
  }
}
