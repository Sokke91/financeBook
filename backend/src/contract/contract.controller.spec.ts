import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { ContractController } from './contract.controller';
import { ContractService } from './contract.service';
import contractTestData from './contractTestData';
import { UpdateContractDto } from './dto/update-contract.dto';

describe('ContractController', () => {
  let controller: ContractController;
  let service: ContractService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ContractController],
      providers: [
        {
          provide: ContractService,
          useValue: {
            findAll: jest
              .fn()
              .mockResolvedValue(contractTestData.contractArray),
            findOne: jest.fn().mockResolvedValue(contractTestData.oneContract),
            create: jest.fn().mockResolvedValue(contractTestData.oneContract),
            remove: jest.fn().mockResolvedValue({ deleted: true }),
            update: jest.fn().mockResolvedValue({ updated: true }),
          },
        },
      ],
    }).compile();
    controller = module.get<ContractController>(ContractController);
    service = module.get<ContractService>(ContractService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should GET contracts', async () => {
    const result = await controller.findAll();
    expect(service.findAll).toHaveBeenCalled();
    expect(result).toEqual(contractTestData.contractArray);
  });

  it('should getOne Contract by id', async () => {
    const result = await controller.findOne('1');
    expect(service.findOne).toHaveBeenCalled();
    expect(result).toEqual(contractTestData.oneContract);
  });

  it('should throw a error if not found', async () => {
    const findOneSpy = jest
      .spyOn(service, 'findOne')
      .mockRejectedValueOnce(new NotFoundException());
    await expect(controller.findOne('bad uid')).rejects.toThrow(
      NotFoundException,
    );
    expect(findOneSpy).toHaveBeenCalled();
  });

  it('should create a contract', async () => {
    const result = await controller.create(contractTestData.testDto);
    expect(service.create).toHaveBeenCalled();
    expect(result).toEqual(contractTestData.oneContract);
  });

  it('should update a contract', async () => {
    const updateDto: UpdateContractDto = contractTestData.testDto;
    const result = await controller.update('1', updateDto);
    expect(service.update).toHaveBeenCalled();
    expect(result).toEqual({ updated: true });
  });

  it.todo('should throw a error if updated contract not found');

  it('should delete a contract', async () => {
    const result = await controller.remove('1');
    expect(service.remove).toHaveBeenCalled();
    expect(result).toEqual({ deleted: true });
  });
});
