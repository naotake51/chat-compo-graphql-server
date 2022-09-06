import { Injectable } from '@nestjs/common';
import { Developer } from '@prisma/client';
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

  async update(developer: Partial<Developer>): Promise<Developer | null> {
    const updatedDeveloper = await this.prisma.developer.update({
      where: { id: developer.id },
      data: developer,
    });

    return updatedDeveloper;
  }
}
