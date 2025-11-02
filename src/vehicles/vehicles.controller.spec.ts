import { Test, TestingModule } from '@nestjs/testing';
import { VehiclesController } from './vehicles.controller';
import { VehiclesService } from './vehicles.service';
import { VehicleStatus } from '@prisma/client';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';

describe('VehiclesController', () => {
  let controller: VehiclesController;
  let service: VehiclesService;

  const mockService = {
    list: jest.fn(),
    create: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    setStatus: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VehiclesController],
      providers: [{ provide: VehiclesService, useValue: mockService }],
    }).compile();

    controller = module.get<VehiclesController>(VehiclesController);
    service = module.get<VehiclesService>(VehiclesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('list', () => {
    it('should call service.list', () => {
      controller.list(VehicleStatus.AVAILABLE);
      expect(service.list).toHaveBeenCalledWith(VehicleStatus.AVAILABLE);
    });
  });

  describe('create', () => {
    it('should call service.create', () => {
      const dto: CreateVehicleDto = {
        brand: 'Toyota',
        model: 'Corolla',
        year: 2022,
        color: 'White',
        price: 95000,
      };

      controller.create(dto);
      expect(service.create).toHaveBeenCalledWith(dto);
    });
  });

  describe('findOne', () => {
    it('should call service.findOne', () => {
      controller.findOne('123');
      expect(service.findOne).toHaveBeenCalledWith('123');
    });
  });

  describe('update', () => {
    it('should call service.update', () => {
      const dto: UpdateVehicleDto = { price: 100000 };

      controller.update('123', dto);
      expect(service.update).toHaveBeenCalledWith('123', dto);
    });
  });

  describe('setStatus', () => {
    it('should call service.setStatus', () => {
      controller.setStatus('123', VehicleStatus.SOLD);
      expect(service.setStatus).toHaveBeenCalledWith('123', VehicleStatus.SOLD);
    });
  });
});
