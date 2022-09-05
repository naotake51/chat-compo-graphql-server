import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/prisma.service';
import { Developer } from '@prisma/client';

@Injectable()
export class DevelopersService {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string): Promise<Developer | null> {
    const developer = await this.prisma.developer.findUnique({ where: { id } });

    return developer;
  }
}
