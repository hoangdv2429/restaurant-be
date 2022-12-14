import {
  Body,
  Controller,
  Param,
  Post,
  Req,
  UseGuards,
  Patch,
  Get,
} from '@nestjs/common';
import { Roles } from 'src/authentication/decorators/role.decorator';
import { Role } from 'src/authentication/enums/role.enum';
import JwtAuthenticationGuard from 'src/authentication/guards/jwt-authentication.guard';
import RequestWithUser from 'src/authentication/requestWithUser.interface';
import ParamsWithId from 'src/utils/paramsWithId';
import { PaymentDTO } from './dto/payment.dto';
import { PaymentsService } from './payments.service';
import { RolesGuard } from 'src/authentication/guards/roles.guard';
import AddressDTO from 'src/users/dto/address.dto';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentService: PaymentsService) {}

  @Get()
  @UseGuards(JwtAuthenticationGuard, RolesGuard)
  @Roles(Role.Admin)
  async getAll() {
    return await this.paymentService.findAll();
  }

  //to be delete API
  // @Get(':id')
  // @UseGuards(JwtAuthenticationGuard)
  // // @Roles(Role.Admin)
  // async getByUserId(@Param() { id }: ParamsWithId) {
  //   return await this.paymentService.findByUserId(id);
  // }

  // make Address object or query from user.id using userService
  @Post('/checkout')
  @UseGuards(JwtAuthenticationGuard)
  async checkout(@Req() req: RequestWithUser, @Body() address: AddressDTO) {
    return await this.paymentService.create(req.user.id, address);
  }

  @Patch(':id')
  @UseGuards(JwtAuthenticationGuard, RolesGuard)
  @Roles(Role.Admin)
  async updateOrder(
    @Param() { id }: ParamsWithId,
    @Body() payment: PaymentDTO,
  ) {
    return this.paymentService.update(id, payment);
  }
}
