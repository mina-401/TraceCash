import { CreateExpenseInstanceDto } from './dto/create-expense-instance.dto';
import { UpdateExpenseInstanceDto } from './dto/update-expense-instance.dto';
export declare class ExpenseInstancesService {
    create(createExpenseInstanceDto: CreateExpenseInstanceDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateExpenseInstanceDto: UpdateExpenseInstanceDto): string;
    remove(id: number): string;
}
