import { Component } from '@angular/core';

/**
 * Main Container for TicTacToe Classic Game.
 * Provides two-player functionality, win/draw detection, and game reset.
 * UI: Centered 3x3 grid, displays current turn, game status, and a reset button.
 */
@Component({
  selector: 'app-tic-tac-toe-classic',
  templateUrl: './tic-tac-toe-classic.component.html',
  styleUrls: ['./tic-tac-toe-classic.component.css'],
  standalone: true,
})
export class TicTacToeClassicComponent {
  // The board is a 3x3 array of 'X', 'O', or null
  board: (string | null)[][] = [];
  // Current player: 'X' or 'O'
  currentPlayer: 'X' | 'O' = 'X';
  // Game status: 'playing', 'win', 'draw'
  gameStatus: 'playing' | 'win' | 'draw' = 'playing';
  // Who is the winner? ('X' or 'O'), null if not yet won, 'Draw' if draw
  winner: 'X' | 'O' | null = null;

  /**
   * PUBLIC_INTERFACE
   * Initializes a new game.
   */
  constructor() {
    this.newGame();
  }

  /**
   * PUBLIC_INTERFACE
   * Start or restart a new game.
   */
  newGame(): void {
    this.board = Array.from({ length: 3 }, () => Array(3).fill(null));
    this.currentPlayer = 'X';
    this.gameStatus = 'playing';
    this.winner = null;
  }

  /**
   * PUBLIC_INTERFACE
   * Handle click on a cell.
   * @param row Row index
   * @param col Column index
   */
  handleCellClick(row: number, col: number): void {
    // Ignore if game is not playing or cell is not empty
    if (this.gameStatus !== 'playing' || this.board[row][col]) return;

    this.board[row][col] = this.currentPlayer;

    if (this.checkWin(this.currentPlayer)) {
      this.gameStatus = 'win';
      this.winner = this.currentPlayer;
    } else if (this.checkDraw()) {
      this.gameStatus = 'draw';
      this.winner = null;
    } else {
      this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
    }
  }

  /**
   * PUBLIC_INTERFACE
   * Check if the current player has won the game.
   * @param player 'X' or 'O'
   */
  checkWin(player: 'X' | 'O'): boolean {
    const b = this.board;

    // Check rows and columns
    for (let i = 0; i < 3; i++) {
      if (b[i][0] === player && b[i][1] === player && b[i][2] === player) return true;
      if (b[0][i] === player && b[1][i] === player && b[2][i] === player) return true;
    }
    // Check diagonals
    if (b[0][0] === player && b[1][1] === player && b[2][2] === player) return true;
    if (b[0][2] === player && b[1][1] === player && b[2][0] === player) return true;

    return false;
  }

  /**
   * PUBLIC_INTERFACE
   * Check if the game is a draw.
   */
  checkDraw(): boolean {
    return this.board.flat().every(cell => cell) && !this.checkWin('X') && !this.checkWin('O');
  }

  /**
   * PUBLIC_INTERFACE
   * Get the user-friendly status message for display.
   */
  get statusMessage(): string {
    if (this.gameStatus === 'win') {
      return `Player ${this.winner} wins!`;
    }
    if (this.gameStatus === 'draw') {
      return `It's a draw!`;
    }
    return `Player ${this.currentPlayer}'s turn`;
  }
}
