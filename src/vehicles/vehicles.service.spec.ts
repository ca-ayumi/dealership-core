import { Test, TestingModule } from '@nestjs/testing';
import { VehiclesService } from './vehicles.service';
import { PrismaService } from '../prisma/prisma.service';
import { NotFoundException } from '@nestjs/common';
import { VehicleStatus } from '@prisma/client';

describe('VehiclesService', () => {
  let service: VehiclesService;

  const prismaMock: any = {
    vehicle: {
      findMany: jest.fn(),
      create: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        VehiclesService,
        { provide: PrismaService, useValue: prismaMock },
      ],
    }).compile();

    service = module.get<VehiclesService>(VehiclesService);

    jest.clearAllMocks();
  });

  describe('list', () => {
    it('should list ordered by price', async () => {
      prismaMock.vehicle.findMany.mockResolvedValue([]); // 👈 usar prismaMock

      await service.list();

      expect(prismaMock.vehicle.findMany).toHaveBeenCalledWith({
        where: undefined,
        orderBy: { price: 'asc' },
      });
    });

    it('should filter by status', async () => {
      prismaMock.vehicle.findMany.mockResolvedValue([]);

      await service.list(VehicleStatus.AVAILABLE);

      expect(prismaMock.vehicle.findMany).toHaveBeenCalledWith({
        where: { status: VehicleStatus.AVAILABLE },
        orderBy: { price: 'asc' },
      });
    });
  });

  describe('create', () => {
    it('should create vehicle', async () => {
      const dto = {
        brand: 'Toyota',
        model: 'Corolla',
        year: 2022,
        color: 'White',
        price: 90000,
      };

      prismaMock.vehicle.create.mockResolvedValue(dto);

      const result = await service.create(dto);

      expect(result).toEqual(dto);
      expect(prismaMock.vehicle.create).toHaveBeenCalledWith({ data: dto });
    });
  });

  describe('findOne', () => {
    it('should find vehicle', async () => {
      const id = '1';
      const vehicle = { id };

      prismaMock.vehicle.findUnique.mockResolvedValue(vehicle);

      const result = await service.findOne(id);

      expect(result).toEqual(vehicle);
      expect(prismaMock.vehicle.findUnique).toHaveBeenCalledWith({
        where: { id },
      });
    });
  });

  describe('update', () => {
    it('should update vehicle', async () => {
      prismaMock.vehicle.findUnique.mockResolvedValue({});
      prismaMock.vehicle.update.mockResolvedValue({ updated: true });

      const result = await service.update('1', { model: 'New' });

      expect(result).toEqual({ updated: true });
      expect(prismaMock.vehicle.update).toHaveBeenCalled();
    });

    it('should throw if not found', async () => {
      prismaMock.vehicle.findUnique.mockResolvedValue(null);

      await expect(service.update('1', {})).rejects.toThrow(NotFoundException);
    });
  });

  describe('setStatus', () => {
    it('should update status', async () => {
      prismaMock.vehicle.findUnique.mockResolvedValue({});
      prismaMock.vehicle.update.mockResolvedValue({ status: VehicleStatus.SOLD });

      const result = await service.setStatus('1', VehicleStatus.SOLD);

      expect(result).toEqual({ status: VehicleStatus.SOLD });
      expect(prismaMock.vehicle.update).toHaveBeenCalledWith({
        where: { id: '1' },
        data: { status: VehicleStatus.SOLD },
      });
    });

    it('should throw if not found', async () => {
      prismaMock.vehicle.findUnique.mockResolvedValue(null);

      await expect(
          service.setStatus('1', VehicleStatus.SOLD),
      ).rejects.toThrow(NotFoundException);
    });
  });
});
