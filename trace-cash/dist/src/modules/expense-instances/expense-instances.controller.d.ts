import { ExpenseInstancesService } from './expense-instances.service';
import { CreateExpenseInstanceDto } from './dto/create-expense-instance.dto';
import { UpdateExpenseInstanceDto } from './dto/update-expense-instance.dto';
export declare class ExpenseInstancesController {
    private readonly expenseInstancesService;
    constructor(expenseInstancesService: ExpenseInstancesService);
    create(createExpenseInstanceDto: CreateExpenseInstanceDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateExpenseInstanceDto: UpdateExpenseInstanceDto): string;
    remove(id: string): string;
}
