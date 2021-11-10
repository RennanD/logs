import { Schema } from 'mongoose';
import { ICreateUsersDTO } from '../../../dtos/ICreateUsersDTO';
import {
  IFindParams,
  IUsersRepository,
} from '../../../repositories/IUsersRepository';
import User, { IUserSchema } from '../schemas/User';

export class UsersRepositoryMongoose implements IUsersRepository {
  async findAll(params: IFindParams): Promise<IUserSchema[]> {
    return User.find({
      $or: [
        { name: { $regex: params?.search || '', $options: 'i' } },
        {
          email: {
            $regex: params?.search || '',
            $options: 'i',
          },
        },
      ],
    })
      .select('name email avatar')
      .skip(Number(params?.offset) || 0)
      .limit(Number(params?.limit) || 10);
  }

  async findById(id: string): Promise<IUserSchema | null> {
    return User.findById(id);
  }

  async findByEmail(email: string): Promise<IUserSchema | null> {
    return User.findOne({ email });
  }

  async countAll(search: string): Promise<number> {
    return User.find({
      $or: [
        { name: { $regex: search || '', $options: 'i' } },
        {
          email: {
            $regex: search || '',
            $options: 'i',
          },
        },
      ],
    }).count();
  }

  async create(userData: ICreateUsersDTO): Promise<void> {
    await User.create(userData);
  }

  save(user: IUserSchema): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
