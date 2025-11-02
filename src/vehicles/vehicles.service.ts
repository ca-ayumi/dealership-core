import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { VehicleStatus } from '@prisma/client';

@Injectable()
export class VehiclesService {
  constructor(private prisma: PrismaService) {}

  list(status?: VehicleStatus) {
    return this.prisma.vehicle.findMany({
      where: status ? { status } : undefined,
      orderBy: {
        price: 'asc',
      },
    });
  }

  create(data: CreateVehicleDto) {
    return this.prisma.vehicle.create({ data });
  }

  findOne(id: string) {
    return this.prisma.vehicle.findUnique({ where: { id } });
  }

  async update(id: string, data: UpdateVehicleDto) {
    await this.ensureExists(id);
    return this.prisma.vehicle.update({
      where: { id },
      data,
    });
  }

  async setStatus(id: string, status: VehicleStatus) {
    await this.ensureExists(id);
    return this.prisma.vehicle.update({
      where: { id },
      data: { status },
    });
  }

  private async ensureExists(id: string) {
    const v = await this.prisma.vehicle.findUnique({ where: { id } });
    if (!v) throw new NotFoundException('Vehicle not found');
  }
}
