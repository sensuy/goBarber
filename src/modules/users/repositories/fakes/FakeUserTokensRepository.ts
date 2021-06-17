import { v4 as uuidv4 } from 'uuid';

import UserToken from '@modules/users/infra/typeorm/entities/UserToken';
import IUserTokensRepository from '../IUserTokensRepository';

class FakeUserTokensRepository implements IUserTokensRepository {
  private userTokens: UserToken[] = [];

  public async generate(userId: string): Promise<UserToken> {
    const userToken = new UserToken();

    Object.assign(userToken, {
      id: uuidv4(),
      token: uuidv4(),
      userId,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    this.userTokens.push(userToken);
    return userToken;
  }

  public async findByToken(token: string): Promise<UserToken | undefined> {
    const userToken = this.userTokens.find(
      (findToken) => findToken.token === token,
    );

    return userToken;
  }
}

export default FakeUserTokensRepository;
