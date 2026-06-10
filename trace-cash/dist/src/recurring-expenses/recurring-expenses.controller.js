"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecurringExpensesController = void 0;
const common_1 = require("@nestjs/common");
const recurring_expenses_service_1 = require("./recurring-expenses.service");
const create_recurring_expense_dto_1 = require("./dto/create-recurring-expense.dto");
const update_recurring_expense_dto_1 = require("./dto/update-recurring-expense.dto");
let RecurringExpensesController = class RecurringExpensesController {
    recurringExpensesService;
    constructor(recurringExpensesService) {
        this.recurringExpensesService = recurringExpensesService;
    }
    create(createRecurringExpenseDto) {
        return this.recurringExpensesService.create(createRecurringExpenseDto);
    }
    findAll() {
        return this.recurringExpensesService.findAll();
    }
    findOne(id) {
        return this.recurringExpensesService.findOne(id);
    }
    update(id, updateRecurringExpenseDto) {
        return this.recurringExpensesService.update(id, updateRecurringExpenseDto);
    }
    remove(id) {
        return this.recurringExpensesService.remove(id);
    }
};
exports.RecurringExpensesController = RecurringExpensesController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_recurring_expense_dto_1.CreateRecurringExpenseDto]),
    __metadata("design:returntype", void 0)
], RecurringExpensesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], RecurringExpensesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], RecurringExpensesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_recurring_expense_dto_1.UpdateRecurringExpenseDto]),
    __metadata("design:returntype", void 0)
], RecurringExpensesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], RecurringExpensesController.prototype, "remove", null);
exports.RecurringExpensesController = RecurringExpensesController = __decorate([
    (0, common_1.Controller)('recurring-expenses'),
    __metadata("design:paramtypes", [recurring_expenses_service_1.RecurringExpensesService])
], RecurringExpensesController);
//# sourceMappingURL=recurring-expenses.controller.js.map