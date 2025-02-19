import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { menu_items, PrismaClient } from '@prisma/client';
import { PrismaService } from '../prisma.service';
import { CreateMenuDto} from '../dto/createMenu.dto';
import { UpdateMenuDto } from 'src/dto/updateMenu.dto';

@Injectable()
export class MenuService {
  constructor(private prisma: PrismaService) {}

  async getMenus(): Promise<menu_items[]> {
    return this.prisma.menu_items.findMany({
      orderBy: { menuDepth: 'asc' },
    });
  }

  async getMenuByName(menuName: string | undefined, menuDepth: number): Promise<menu_items> {
    const menu = await this.prisma.menu_items.findFirst({
      where: { menuName, menuDepth },
    });

    if (!menu) throw new NotFoundException(`Menu '${menuName}' at depth ${menuDepth} not found.`);
    return menu;
  }

  async addmenu_items(dto: CreateMenuDto): Promise<menu_items> {
    const { name, parentName, depth } = dto;
    const menuName = name;
    const menuDepth = depth;
    const menuParentName = parentName;
    const existing = await this.prisma.menu_items.findFirst({
      where: { menuName, menuDepth},
    });

    if (existing) throw new BadRequestException(`Menu '${name}' already exists at depth ${depth}.`);

    

    if (menuDepth > 0){
    const parent = await this.getMenuByName(menuParentName, menuDepth - 1)
    if (!parent) throw new BadRequestException(`Parent menu '${menuParentName}' at depth ${menuDepth - 1} not found.`);
    return this.prisma.menu_items.create({
      data: { menuName, menuParentId: parent.menuId, menuDepth },
    });
  }
    
    return this.prisma.menu_items.create({
      data: { menuName, menuParentId: "-1", menuDepth },
    });
  }

  async updateMenuItem(menuId: string, dto: UpdateMenuDto): Promise<menu_items> {
    const menu = await this.prisma.menu_items.findUnique({ where: { menuId } });

    if (!menu) throw new NotFoundException(`Menu with ID '${menuId}' not found.`);

    if (dto.name) {
      const duplicate = await this.prisma.menu_items.findFirst({
        where: { menuName: dto.name, menuDepth: menu.menuDepth, menuId: { not: menuId } },
      });

      if (duplicate) throw new BadRequestException(`Another menu with name '${dto.name}' exists at this depth.`);
    }

    return this.prisma.menu_items.update({
      where: { menuId },
      data: dto,
    });
  }

  async deleteMenuItem(menuId: string): Promise<void> {
    const menu = await this.prisma.menu_items.findUnique({ where: { menuId } });

    if (!menu) throw new NotFoundException(`Menu with ID '${menuId}' not found.`);

    await this.prisma.menu_items.delete({ where: { menuId } });
  }
}
