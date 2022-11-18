import { CreateContractDto } from './dto/create-contract.dto';
import { Contract } from './entities/contract.entity';

const oneContract = new Contract();
oneContract.name = 'Bauspar';
oneContract.id = 1;
oneContract.company = 'DKV';
oneContract.details = '';
oneContract.startDate = new Date('2022-11-17');
oneContract.endDate = new Date('2023-12-31');
oneContract.costs = 50;
oneContract.intervall = 'monthly';
oneContract.intervallValue = 1;
oneContract.createdAt = new Date('2022-11-17');
oneContract.updatedAt = new Date('2022-12-18');

const contract2 = oneContract;
contract2.id = 2;

const contractArray: Contract[] = [oneContract, contract2];

const { id, createdAt, updatedAt, ...testDto } = oneContract;

export default {
  oneContract,
  contract2,
  contractArray,
  testDto,
};
