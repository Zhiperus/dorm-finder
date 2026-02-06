import { createHono } from '../utils/hono';

export abstract class Controller {
  protected readonly controller: ReturnType<typeof createHono>;
  constructor() {
    this.controller = createHono();
  }
  abstract routes(): ReturnType<typeof createHono>;
}
