import { injectable } from '@needle-di/core';
import { usersTable, type UserId } from './users.schema';
import { eq, type InferInsertModel } from 'drizzle-orm';
import { NotFound } from '../common/utils/exceptions';
import { DrizzleRepository } from '../common/factories/drizzle-repository.factory';
import { takeFirst, takeFirstOrThrow } from '../common/utils/drizzle';

type Create = Omit<InferInsertModel<typeof usersTable>, 'id' | 'created_at' | 'updated_at'>;
type Update = Partial<Create>;

@injectable()
export class UsersRepository extends DrizzleRepository {
    async findOneById(id: UserId, db = this.drizzle.db) {
        return db.select().from(usersTable).where(eq(usersTable.id, id)).then(takeFirst);
    }

    async findOneByEmail(email: string, db = this.drizzle.db) {
        return db.select().from(usersTable).where(eq(usersTable.email, email)).then(takeFirst);
    }

    async findOneByIdOrThrow(id: UserId, db = this.drizzle.db) {
        const user = await this.findOneById(id, db);
        if (!user) throw NotFound('User not found');
        return user;
    }

    async update(id: UserId, data: Update, db = this.drizzle.db) {
        return db
            .update(usersTable)
            .set(data)
            .where(eq(usersTable.id, id))
            .returning()
            .then(takeFirst);
    }

    async create(data: Create, db = this.drizzle.db) {
        return db.insert(usersTable).values(data).returning().then(takeFirstOrThrow);
    }
}
