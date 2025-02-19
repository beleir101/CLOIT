import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, Query } from '@nestjs/common';
import { query } from 'express';
import { CreateMenuDto } from 'src/dto/createMenu.dto';
import { GetMenuDto } from 'src/dto/getMenu.dto';
import { UpdateMenuDto } from 'src/dto/updateMenu.dto';
import { MenuService } from 'src/menu-service/menu-service.service';

@Controller()
export class MenuController {

    constructor(private readonly menuService: MenuService) {}

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() createMenuDto: CreateMenuDto){
        try {
            return await this.menuService.addmenu_items(createMenuDto);
        } catch (error) {
            throw new Error(`Error creating menu: ${error.message}`);
        }
    }
    @Get('/menu')
    async findAll(){
        try {
            return await this.menuService.getMenus();
        } catch (error) {
            throw new Error(`Error fetching menus: ${error.message}`);
        }
    }
    /*
    @Get(':id')
    findOne(@Param('id') id: string){
        return 'this should return menu wiht id'
    }
        */
    @Put(':id')
    @HttpCode(HttpStatus.OK)
    async update(@Param('id') id: string, @Body() updateMenuDto: UpdateMenuDto) {
        try {
            return await this.menuService.updateMenuItem(id, updateMenuDto);
        } catch (error) {
            throw new Error(`Error updating menu with ID ${id}: ${error.message}`);
        }
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async remove(@Param('id') id: string) {
        try {
            await this.menuService.deleteMenuItem(id);
            return { message: `Menu with ID ${id} deleted successfully.` };
        } catch (error) {
            throw new Error(`Error deleting menu with ID ${id}: ${error.message}`);
        }
    }
}
