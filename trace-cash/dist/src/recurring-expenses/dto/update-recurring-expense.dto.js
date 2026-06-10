"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateRecurringExpenseDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_recurring_expense_dto_1 = require("./create-recurring-expense.dto");
class UpdateRecurringExpenseDto extends (0, mapped_types_1.PartialType)(create_recurring_expense_dto_1.CreateRecurringExpenseDto) {
}
exports.UpdateRecurringExpenseDto = UpdateRecurringExpenseDto;
//# sourceMappingURL=update-recurring-expense.dto.js.map