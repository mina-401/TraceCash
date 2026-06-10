import { PartialType } from '@nestjs/mapped-types';
import { CreateExpenseInstanceDto } from './create-expense-instance.dto';

export class UpdateExpenseInstanceDto extends PartialType(CreateExpenseInstanceDto) {}
