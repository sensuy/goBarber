import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import User from '../../infra/typeorm/entities/User';

class UsersRepository implements IUsersRepository {
  private users: User[] = [];

  public async findById(id: string): Promise<User | undefined> {
    return user;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    return user;
  }

  public async create(userData: ICreateUserDTO): Promise<User> {
    return appointment;
  }

  public async save(user: User): Promise<User> {

  }
}

export default UsersRepository;
