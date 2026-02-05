import { customType, timestamp } from 'drizzle-orm/pg-core';
import { NotFound } from './exceptions';

export const citext = customType({
    dataType() {
        return 'citext';
    }
});

export const timestamps = {
    createdAt: timestamp('created_at', {
        mode: 'date',
        withTimezone: true
    })
        .notNull()
        .defaultNow(),
    updatedAt: timestamp('updated_at', {
        mode: 'date',
        withTimezone: true
    })
        .notNull()
        .defaultNow()
        .$onUpdateFn(() => new Date())
};

export const takeFirst = <T>(values: T[]): T | null => {
    return values.shift() || null;
};

export const takeFirstOrThrow = <T>(values: T[]): T => {
    const value = values.shift();
    if (!value) throw NotFound('The requested resource was not found.');
    return value;
};
