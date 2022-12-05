import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { Account } from './entities/account.entity';

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(Account)
    private readonly accountRepo: Repository<Account>,
  ) {}

  async create(createAccountDto: CreateAccountDto) {
    return 'This action adds a new account';
  }

  async findAll() {
    return await this.accountRepo.find();
  }

  async findOne(id: number) {
    return await this.accountRepo.findOneOrFail({ where: { id: id } });
  }

  async update(id: number, updateAccountDto: UpdateAccountDto) {
    return `This action updates a #${id} account`;
  }

  async remove(id: number) {
    return `This action removes a #${id} account`;
  }
}
