"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateExpenseInstanceDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_expense_instance_dto_1 = require("./create-expense-instance.dto");
class UpdateExpenseInstanceDto extends (0, mapped_types_1.PartialType)(create_expense_instance_dto_1.CreateExpenseInstanceDto) {
}
exports.UpdateExpenseInstanceDto = UpdateExpenseInstanceDto;
//# sourceMappingURL=update-expense-instance.dto.js.map