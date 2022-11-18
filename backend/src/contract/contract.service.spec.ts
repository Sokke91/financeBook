import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ContractService } from './contract.service';
import { Contract } from './entities/contract.entity';
import testData from './contractTestData';
import { Repository } from 'typeorm';

describe('ContractService', () => {
  let service: ContractService;
  let repo: Repository<Contract>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ContractService,
        {
          provide: getRepositoryToken(Contract),
          useValue: {
            find: jest.fn().mockResolvedValue(testData.contractArray),
            findOneOrFail: jest.fn().mockResolvedValue(testData.oneContract),
            create: jest.fn().mockResolvedValue({
              id: 1,
              ...testData.testDto,
            }),
            update: jest.fn().mockResolvedValue(true),
            delete: jest.fn().mockResolvedValue(true),
          },
        },
      ],
    }).compile();
    service = module.get<ContractService>(ContractService);
    repo = module.get<Repository<Contract>>(getRepositoryToken(Contract));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('shoult return all contracts', async () => {
    const contracts = await service.findAll();
    expect(contracts).toEqual(testData.contractArray);
  });

  it('should get one Contract by ID', async () => {
    const contract = await service.findOne(1);
    expect(contract).toEqual(testData.oneContract);
  });

  it('should throw a error if contract not found', async () => {
    const findOneOrFailSpy = jest
      .spyOn(repo, 'findOneOrFail')
      .mockRejectedValueOnce(new Error('blub'));
    await expect(service.findOne(3)).rejects.toThrow('blub');
    expect(findOneOrFailSpy).toHaveBeenCalled();
  });

  it('should create a new contract', async () => {
    const result = await service.create(testData.testDto);
    expect(result).toEqual({
      id: 1,
      ...testData.testDto,
    });
    expect(repo.create).toHaveBeenCalled();
    expect(repo.create).toHaveBeenCalledWith(testData.testDto);
  });

  it('should delete ar contract', async () => {
    const result = await service.remove(1);
    expect(repo.delete).toHaveBeenCalled();
    expect(repo.delete).toHaveBeenCalledWith(1);
    expect(result).toEqual({ deleted: true });
  });

  it('should update a contract', async () => {
    const { details, ...updateDto } = testData.testDto;
    const result = await service.update(1, updateDto);
    expect(result).toEqual({ updated: true });
    expect(repo.update).toHaveBeenCalled();
  });
});
