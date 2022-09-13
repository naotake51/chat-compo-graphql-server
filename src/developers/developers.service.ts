import { Injectable, NotAcceptableException } from '@nestjs/common';
import { Developer } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { DeveloperCreateInput } from '@/developers/dto/developer-create.input';
import { DeveloperUpdateInput } from '@/developers/dto/developer-update.input';
import { PrismaService } from '@/prisma.service';

@Injectable()
export class DevelopersService {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string): Promise<Developer | null> {
    const developer = await this.prisma.developer.findUnique({ where: { id } });

    return developer;
  }

  async findByEmail(email: string): Promise<Developer | null> {
    const developer = await this.prisma.developer.findUnique({
      where: { email },
    });

    return developer;
  }

  async create(developer: DeveloperCreateInput): Promise<Developer | null> {
    const salt = bcrypt.genSaltSync();
    const encryptedPassword = bcrypt.hashSync(developer.password, salt);

    if (
      await this.prisma.developer.findUnique({
        where: { email: developer.email },
      })
    ) {
      throw new NotAcceptableException('already registered email.');
    }

    const createdDeveloper = await this.prisma.developer.create({
      data: {
        email: developer.email,
        encryptedPassword,
      },
    });

    return createdDeveloper;
  }

  async update(developer: DeveloperUpdateInput): Promise<Developer | null> {
    const updatedDeveloper = await this.prisma.developer.update({
      where: { id: developer.id },
      data: developer,
    });

    return updatedDeveloper;
  }
}
