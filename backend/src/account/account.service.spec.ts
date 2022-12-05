import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AccountService } from './account.service';
import { Account } from './entities/account.entity';
import accountData from './testData/accountData';

describe('AccountService', () => {
  let service: AccountService;
  let repo: Repository<Account>;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AccountService,
        {
          provide: getRepositoryToken(Account),
          useValue: {
            find: jest.fn().mockResolvedValue(accountData.accounts),
            findOneOrFail: jest.fn().mockResolvedValue(accountData.acc),
          },
        },
      ],
    }).compile();
    service = module.get<AccountService>(AccountService);
    repo = module.get<Repository<Account>>(getRepositoryToken(Account));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return accounts', async () => {
    const result = await service.findAll();
    expect(repo.find).toHaveBeenCalled();
    expect(result).toEqual(accountData.accounts);
  });

  it('should return a account by id', async () => {
    const result = await service.findOne(1);
    expect(repo.findOneOrFail).toHaveBeenCalled();
    expect(result).toEqual(accountData.acc);
  });

  it.skip('should throw a not found error if account not found', async () => {
    const findOneSpy = jest
      .spyOn(repo, 'findOneOrFail')
      .mockRejectedValueOnce(new NotFoundException());
  });
});
