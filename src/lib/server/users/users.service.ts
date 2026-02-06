import { inject, injectable } from '@needle-di/core';

import { StorageService } from '../storage/storage.service';

import { UsersRepository } from './users.repository';

import type { UpdateUserDto } from './dto/user.dto';
import type { UserId } from './users.schema';

@injectable()
export class UsersService {
  constructor(
    private usersRepository = inject(UsersRepository),
    private storageService = inject(StorageService)
  ) {}

  async getMe(userId: UserId) {
    return this.usersRepository.findOneByIdOrThrow(userId);
  }

  async update(userId: UserId, updateUserDto: UpdateUserDto) {
    let uploadedAvatar = '';
    const updateData = { ...updateUserDto };

    if (updateUserDto?.avatar) {
      const { key } = await this.storageService.upload({ file: updateUserDto.avatar });
      uploadedAvatar = key;
    }

    return this.usersRepository.update(userId, {
      ...updateData,
      avatar: uploadedAvatar
    });
  }

  async create(email: string) {
    return this.usersRepository.create({ avatar: null, email });
  }
}
