import { createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';
import { usersTable } from '../users.schema';

const MAX_UPLOAD_SIZE = 1024 * 1024 * 3; // 3MB
const ACCEPTED_FILE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

const userDto = createSelectSchema(usersTable, {
    avatar: () =>
        z
            .instanceof(File)
            .refine((file) => file.size <= MAX_UPLOAD_SIZE, {
                message: 'File size must be less than 3MB'
            })
            .refine((file) => ACCEPTED_FILE_TYPES.includes(file.type), {
                message: 'File must be a supported image type (JPEG, PNG, WebP)'
            })
            .optional()
});

export const updateUserDto = userDto
    .pick({
        avatar: true,
        email: true
    })
    .optional();

export type UpdateUserDto = z.infer<typeof updateUserDto>;
export type UserDto = z.infer<typeof userDto>;
