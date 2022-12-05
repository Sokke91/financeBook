import { CreateAccountDto } from '../dto/create-account.dto';
import { Account } from '../entities/account.entity';

const acc = new Account();
(acc.id = 1), (acc.type = 'Giro'), (acc.accountName = 'Haupkonto');
acc.createdAt = new Date();
acc.updatedAt = new Date();

const acc2 = { ...acc };
acc.id = 2;

const accounts = [acc, acc2];

const createAccountDto = new CreateAccountDto();
createAccountDto.acountName = 'Haupkonto';
createAccountDto.type = 'Sparen';

export default {
  acc,
  accounts,
  createAccountDto,
};
