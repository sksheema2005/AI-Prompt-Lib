import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { PromptService } from '../../services/prompt.service';

@Component({
  selector: 'app-add-prompt',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './add-prompt.html',
  styleUrl: './add-prompt.css'
})
export class AddPromptComponent implements OnInit {
  promptForm: FormGroup;
  complexityLevels = Array.from({length: 10}, (_, i) => i + 1);

  constructor(
    private fb: FormBuilder,
    private promptService: PromptService,
    private router: Router
  ) {
    this.promptForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      content: ['', [Validators.required, Validators.minLength(20)]],
      complexity: [1, [Validators.required, Validators.min(1), Validators.max(10)]],
      tagsString: ['']
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.promptForm.valid) {
      const val = this.promptForm.value;
      const tags = val.tagsString ? val.tagsString.split(',').map((s: string) => s.trim()).filter((s: string) => s !== '') : [];
      
      const payload = {
        title: val.title,
        content: val.content,
        complexity: val.complexity,
        tags: tags
      };

      this.promptService.addPrompt(payload).subscribe({
        next: () => {
          this.router.navigate(['/prompts']);
        },
        error: (err) => {
          console.error('Error adding prompt:', err);
        }
      });
    }
  }
}
