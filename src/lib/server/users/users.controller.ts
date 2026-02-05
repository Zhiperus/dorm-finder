import { inject, injectable } from '@needle-di/core';
import { UsersService } from './users.service';
import { authState } from '../common/middleware/auth.middleware';
import { zValidator } from '@hono/zod-validator';
import { Controller } from '../common/factories/controller.factory';
import { updateUserDto } from './dto/user.dto';

@injectable()
export class UsersController extends Controller {
    constructor(private usersService = inject(UsersService)) {
        super();
    }

    routes() {
        return this.controller
            .basePath('/users')
            .get('/me', async (c) => {
                const session = c.var.session;
                const user = session ? await this.usersService.getMe(session.userId) : null;
                return c.json(user);
            })
            .patch('/me', authState('session'), zValidator('form', updateUserDto), async (c) => {
                const user = await this.usersService.update(
                    c.var.session.userId,
                    c.req.valid('form')
                );
                return c.json(user);
            });
    }
}
