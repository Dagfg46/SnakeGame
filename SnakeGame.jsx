import React, { useState, useEffect, useCallback } from 'react';
import './SnakeGame.css';
import { initGame, tick, DIRECTIONS } from './snakeLogic';

export default function SnakeGame() {
  const [state, setState] = useState(initGame());
  const [tickInterval, setTickInterval] = useState(200);

  const handleKey = useCallback((e) => {
    const { direction } = state;
    switch (e.key) {
      case 'ArrowUp':
      case 'w':
        if (direction !== DIRECTIONS.DOWN) setState((s) => ({ ...s, direction: DIRECTIONS.UP }));
        break;
      case 'ArrowDown':
      case 's':
        if (direction !== DIRECTIONS.UP) setState((s) => ({ ...s, direction: DIRECTIONS.DOWN }));
        break;
      case 'ArrowLeft':
      case 'a':
        if (direction !== DIRECTIONS.RIGHT) setState((s) => ({ ...s, direction: DIRECTIONS.LEFT }));
        break;
      case 'ArrowRight':
      case 'd':
        if (direction !== DIRECTIONS.LEFT) setState((s) => ({ ...s, direction: DIRECTIONS.RIGHT }));
        break;
      default:
        break;
    }
  }, [state]);

  useEffect(() => {
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [handleKey]);

  useEffect(() => {
    if (state.gameOver) return;
    const interval = setInterval(() => setState((s) => tick(s)), tickInterval);
    return () => clearInterval(interval);
  }, [state, tickInterval]);

  return (
    <div className="snake-container">
      <h3>Score: {state.score}</h3>
      {state.gameOver && <div className="game-over">Game Over! Press Restart</div>}
      <div className="grid">
        {Array.from({ length: 20 }).map((_, y) =>
          Array.from({ length: 20 }).map((_, x) => {
            const isSnake = state.snake.some((s) => s.x === x && s.y === y);
            const isFood = state.food.x === x && state.food.y === y;
            return (
              <div
                key={`${x}-${y}`}
                className={`cell ${isSnake ? 'snake' : ''} ${isFood ? 'food' : ''}`}
              />
            );
          })
        )}
      </div>
      <button onClick={() => setState(initGame())}>Restart</button>
    </div>
  );
}
