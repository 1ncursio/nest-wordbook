import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import bcrypt from 'bcrypt';
import { User } from 'src/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);

    if (!user) {
      return null;
    }

    const result = await bcrypt.compare(password, user.password);
    if (result) {
      const { password, ...userWithoutPassword } = user;
      return userWithoutPassword;
    }

    return null;
  }

  async login(user: User) {
    const payload = { id: user.id, email: user.email };
    console.log('payload', payload);
    return { access_token: this.jwtService.sign(payload) };
  }

  async googleLogin(user: User) {
    const exUser = await this.usersService.findByEmail(user.email);

    if (exUser) {
      return this.login(exUser);
    }

    const newUser = await this.userRepository.save({
      email: user.email,
      username: user.username,
      image: user.image,
      provider: 'google',
      socialId: user.id,
    });

    return this.login(newUser);
  }
}
