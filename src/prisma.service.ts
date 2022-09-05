import {
  INestApplication,
  Injectable,
  Logger,
  OnModuleInit,
} from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient<Prisma.PrismaClientOptions, Prisma.LogLevel>
  implements OnModuleInit
{
  private readonly logger = new Logger(PrismaService.name);
  constructor() {
    super({ log: ['query', 'info', 'warn', 'error'] });
  }

  async onModuleInit() {
    this.$on('query', (event) => {
      this.logger.log(
        `params: ${event.params}`,
        `duration: ${event.duration} ms`,
      );
    });
    await this.$connect();
  }

  async enableShutdownHooks(app: INestApplication) {
    this.$on('beforeExit', async () => {
      await app.close();
    });
  }
}
