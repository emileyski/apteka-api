import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateSaleDto } from './dto/create-sale.dto';
import { UpdateSaleDto } from './dto/update-sale.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Sale } from './entities/sale.entity';
import { OrderItem } from './entities/order-item.entity';
import { Repository } from 'typeorm';
import { SupplyService } from 'src/supply/supply.service';
import { ReportsService } from 'src/reports/reports.service';

@Injectable()
export class SaleService {
  constructor(
    @InjectRepository(Sale)
    private saleRepository: Repository<Sale>,
    @InjectRepository(OrderItem)
    private orderItemRepository: Repository<OrderItem>,
    private supplyService: SupplyService,
    private reportsService: ReportsService,
  ) {}

  async sendSalesReport(email: string) {
    await this.reportsService.sendSalesReportByEmail(email);

    return { message: `Sales report sent to ${email}` };
  }

  async create(createSaleDto: CreateSaleDto, userId: number) {
    const supplies = await this.supplyService.findByIds(
      createSaleDto.OrderItems.map((orderItem) => orderItem.SupplyID),
    );

    const canBeCreated = supplies.every((supply) => {
      const orderItem = createSaleDto.OrderItems.find(
        (orderItem) => orderItem.SupplyID === supply.SupplyID,
      );
      const supplyExpiryDate = new Date(supply.ExpiryDate);

      return (
        supply.CurrentQuantity >= orderItem.Quantity &&
        supplyExpiryDate >= new Date()
      );
    });

    if (!canBeCreated) {
      throw new BadRequestException(`Not enough supplies`);
    }

    const TotalPrice = supplies.reduce(
      (totalPrice, supply) =>
        totalPrice +
        supply.UnitPrice *
          createSaleDto.OrderItems.find(
            (orderItem) => orderItem.SupplyID === supply.SupplyID,
          ).Quantity,
      0,
    );

    const sale = this.saleRepository.create({
      //TODO: fix this (add employee)
      // Employee: { EmployeeID: createSaleDto.EmployeeID },
      OrderItems: createSaleDto.OrderItems.map((orderItem) => ({
        Supply: { SupplyID: orderItem.SupplyID },
        Quantity: orderItem.Quantity,
      })),
      TotalPrice,
      Employee: { EmployeeID: userId },
    });

    await this.saleRepository.save(sale);
    const orderItems = await this.orderItemRepository.save(
      sale.OrderItems.map((orderItem) => ({ ...orderItem, Sale: sale })),
    );

    supplies.forEach((supply) => {
      supply.CurrentQuantity -= createSaleDto.OrderItems.find(
        (orderItem) => orderItem.SupplyID === supply.SupplyID,
      ).Quantity;
    });

    await this.supplyService.saveMany(supplies);

    const saleInfo = {
      ...sale,
      OrderItems: orderItems.map((orderItem) => {
        delete orderItem.Sale;
        return orderItem;
      }),
    };

    if (createSaleDto.CustomerEmail && createSaleDto.CustomerEmail !== '') {
      const orderWithFullInformation = await this.findOne(saleInfo.SaleID);
      await this.reportsService.sendSaleReceiptByEmail(
        orderWithFullInformation,
        createSaleDto.CustomerEmail,
      );
    }

    return saleInfo;
  }

  async findAll() {
    const findResult = await this.saleRepository.find({
      relations: [
        // 'Employee',
        'OrderItems',
        'OrderItems.Supply',
        'OrderItems.Supply.Medication',
      ],
    });

    return findResult.map((sale) => {
      //TODO: fix this (add employee)
      // delete sale.Employee.Login;
      // delete sale.Employee.Password;
      // delete sale.Employee.ResidenceAddress;
      // delete sale.Employee.PhoneNumber;
      // delete sale.Employee.BirthDate;

      return sale;
    });
  }

  async findOne(id: number) {
    const findResult = await this.saleRepository.findOne({
      where: { SaleID: id },
      relations: [
        // 'Employee',
        'OrderItems',
        'OrderItems.Supply',
        'OrderItems.Supply.Medication',
      ],
    });

    if (!findResult) {
      throw new NotFoundException(`Sale #${id} not found`);
    }

    //TODO: fix this
    // delete findResult.Employee.Login;
    // delete findResult.Employee.Password;
    // delete findResult.Employee.ResidenceAddress;
    // delete findResult.Employee.PhoneNumber;
    // delete findResult.Employee.BirthDate;

    return findResult;
  }

  update(id: number, updateSaleDto: UpdateSaleDto) {
    throw new NotFoundException();
  }

  async remove(id: number) {
    const removeResult = await this.saleRepository.delete(id);

    if (removeResult.affected === 0) {
      throw new NotFoundException(`Sale #${id} not found`);
    }

    return { message: `Sale #${id} deleted` };
  }
}
