import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TicTacToeClassicComponent } from './tic-tac-toe-classic.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TicTacToeClassicComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {}
