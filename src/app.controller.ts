import { Controller, Get, Post, Body } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { randomUUID as uuid } from 'node:crypto';
import { CreateNotificationBody } from './create-notification-body';

@Controller('notifications')
export class AppController {
  constructor(private readonly prismaService: PrismaService) {}

  @Get()
  listNotifications() {
    return this.prismaService.notification.findMany();
  }

  @Post()
  async createNotification(@Body() body: CreateNotificationBody) {
    const { category, content, recipientId } = body;

    await this.prismaService.notification.create({
      data: {
        id: uuid(),
        content,
        category,
        recipientId,
      },
    });
  }
}
