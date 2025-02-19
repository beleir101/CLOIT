import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MenuController } from './menu-controller/menu-controller.controller';
import { MenuService } from './menu-service/menu-service.service';
import { PrismaService } from './prisma.service';

@Module({
  imports: [],
  controllers: [AppController, MenuController],
  providers: [AppService, MenuService, PrismaService],
})
export class AppModule {}
