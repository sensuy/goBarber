import UserToken from '../infra/typeorm/entities/UserToken';

interface IUserTokensRepository {
  generate(userId: string): Promise<UserToken>
}

export default IUserTokensRepository;
