import { initGame, tick, DIRECTIONS, GRID_SIZE } from './snakeLogic';

test('snake moves forward', () => {
  let state = initGame();
  const head = state.snake[state.snake.length - 1];
  state = tick(state);
  expect(state.snake[state.snake.length - 1]).toEqual({
    x: head.x + 1,
    y: head.y,
  });
});

test('snake eats food and grows', () => {
  let state = initGame();
  state.food = { x: state.snake[0].x + 1, y: state.snake[0].y };
  const lengthBefore = state.snake.length;
  state = tick(state);
  expect(state.snake.length).toBe(lengthBefore + 1);
  expect(state.score).toBe(1);
});

test('snake dies on wall collision', () => {
  let state = initGame();
  state.snake = [{ x: GRID_SIZE - 1, y: 0 }];
  state.direction = DIRECTIONS.RIGHT;
  state = tick(state);
  expect(state.gameOver).toBe(true);
});
