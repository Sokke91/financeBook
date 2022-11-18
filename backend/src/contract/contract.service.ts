import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateContractDto } from './dto/create-contract.dto';
import { UpdateContractDto } from './dto/update-contract.dto';
import { Contract } from './entities/contract.entity';

@Injectable()
export class ContractService {
  constructor(
    @InjectRepository(Contract)
    private readonly contractRepo: Repository<Contract>,
  ) {}

  async create(createContractDto: CreateContractDto) {
    return await this.contractRepo.create(createContractDto);
  }

  async findAll(): Promise<Contract[]> {
    try {
      return await this.contractRepo.find();
    } catch (error) {
      throw new NotFoundException();
    }
  }

  async findOne(id: number) {
    try {
      return await this.contractRepo.findOneOrFail({ where: { id: id } });
    } catch (error) {
      throw error;
    }
  }

  async update(id: number, updateContractDto: UpdateContractDto) {
    try {
      await this.contractRepo.update(id, updateContractDto);
      return { updated: true };
    } catch (error) {
      throw error;
    }
  }

  async remove(id: number) {
    try {
      await this.contractRepo.delete(id);
      return { deleted: true };
    } catch (error) {
      throw error;
    }
  }
}
