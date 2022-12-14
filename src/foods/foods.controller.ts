import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateFoodDto } from './dto/create-food.dto';
import { UpdateFoodDto } from './dto/update-food.dto';
import { FoodsService } from './foods.service';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
@Controller('foods')
export class FoodsController {
  constructor(private readonly foodsService: FoodsService) {}

  //Get All food
  @Get()
  findAll(@Query() paginationQuery: PaginationQueryDto) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { limit, offset } = paginationQuery;
    return this.foodsService.findAll(paginationQuery);
  }

  //Get specefic food
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.foodsService.findOne('' + id);
  }

  @Get('/findwithout/:id')
  findWithoutId(@Param('id') id: string): Promise<any> {
    return this.foodsService.findWithout(id);
  }

  //Create A food
  @Post()
  create(@Body() createFoodDto: CreateFoodDto) {
    return this.foodsService.create(createFoodDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFoodDto: UpdateFoodDto) {
    return this.foodsService.update(id, updateFoodDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.foodsService.remove(id);
  }
}
