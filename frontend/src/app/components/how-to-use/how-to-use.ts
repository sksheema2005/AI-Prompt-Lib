import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-how-to-use',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './how-to-use.html',
  styleUrls: ['./how-to-use.css']
})
export class HowToUseComponent {
}
