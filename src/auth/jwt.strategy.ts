import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { JwtPayload } from 'jsonwebtoken';
import { UserRepository } from './user.repository';
import { User } from './user.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private userRepository: UserRepository) {
    super({
      secretOrKey: 'qQj4HDaL+i3Dl0hxIlp01RxSdBK7ZwAMLGAVRFQ/oHY=',
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload: JwtPayload): Promise<User> {
    const { username } = payload;
    const user: User | undefined =
      await this.userRepository.findOneByUsername(username);

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
