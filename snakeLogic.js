export const GRID_SIZE = 20;

export const DIRECTIONS = {
  UP: { x: 0, y: -1 },
  DOWN: { x: 0, y: 1 },
  LEFT: { x: -1, y: 0 },
  RIGHT: { x: 1, y: 0 },
};

// Initialize game state
export function initGame() {
  return {
    snake: [{ x: 10, y: 10 }],
    direction: DIRECTIONS.RIGHT,
    food: spawnFood([{ x: 10, y: 10 }]),
    score: 0,
    gameOver: false,
  };
}

// Move snake, handle collisions and growth
export function tick(state) {
  if (state.gameOver) return state;

  const head = state.snake[state.snake.length - 1];
  const newHead = {
    x: head.x + state.direction.x,
    y: head.y + state.direction.y,
  };

  // Check collisions with walls
  if (
    newHead.x < 0 ||
    newHead.y < 0 ||
    newHead.x >= GRID_SIZE ||
    newHead.y >= GRID_SIZE
  ) {
    return { ...state, gameOver: true };
  }

  // Check collisions with self
  if (state.snake.some((s) => s.x === newHead.x && s.y === newHead.y)) {
    return { ...state, gameOver: true };
  }

  let newSnake = [...state.snake, newHead];
  let newFood = state.food;
  let newScore = state.score;

  // Check if food eaten
  if (newHead.x === state.food.x && newHead.y === state.food.y) {
    newScore += 1;
    newFood = spawnFood(newSnake);
  } else {
    newSnake.shift(); // Move forward
  }

  return { ...state, snake: newSnake, food: newFood, score: newScore };
}

// Spawn food not overlapping snake
export function spawnFood(snake) {
  let position;
  do {
    position = {
      x: Math.floor(Math.random() * GRID_SIZE),
      y: Math.floor(Math.random() * GRID_SIZE),
    };
  } while (snake.some((s) => s.x === position.x && s.y === position.y));
  return position;
}
