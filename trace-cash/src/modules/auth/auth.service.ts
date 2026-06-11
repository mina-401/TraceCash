import { Injectable, ConflictException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../../common/prisma/prisma.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';


@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwt: JwtService) {}

  async register(dto: RegisterDto) {
    // 1. 이메일 중복 확인
    const existing = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });
    if (existing) {
      throw new ConflictException('이미 가입된 이메일입니다');
    }

    // 2. 비밀번호 해싱
    const passwordHash = await bcrypt.hash(dto.password, 10);

    // 3. user 생성
    const user = await this.prisma.user.create({
      data: { email: dto.email, passwordHash },
    });

    // 4. 비밀번호 해시는 빼고 응답
    return { id: user.id, email: user.email, createdAt: user.createdAt };
  }

  async login(dto: LoginDto) {
    // 1. 이메일로 user 찾기
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });
    if (!user) {
      throw new UnauthorizedException('이메일 또는 비밀번호가 올바르지 않습니다');
    }

    // 2. 비밀번호 확인
    const valid = await bcrypt.compare(dto.password, user.passwordHash);
    if (!valid) {
      throw new UnauthorizedException('이메일 또는 비밀번호가 올바르지 않습니다');
    }

    // 3. JWT 토큰 발급
    const token = await this.jwt.signAsync({ sub: user.id, email: user.email });
    return { accessToken: token };
  }
}