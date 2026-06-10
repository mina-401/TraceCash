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
exports.ExpenseInstancesController = void 0;
const common_1 = require("@nestjs/common");
const expense_instances_service_1 = require("./expense-instances.service");
const create_expense_instance_dto_1 = require("./dto/create-expense-instance.dto");
const update_expense_instance_dto_1 = require("./dto/update-expense-instance.dto");
let ExpenseInstancesController = class ExpenseInstancesController {
    expenseInstancesService;
    constructor(expenseInstancesService) {
        this.expenseInstancesService = expenseInstancesService;
    }
    create(createExpenseInstanceDto) {
        return this.expenseInstancesService.create(createExpenseInstanceDto);
    }
    findAll() {
        return this.expenseInstancesService.findAll();
    }
    findOne(id) {
        return this.expenseInstancesService.findOne(+id);
    }
    update(id, updateExpenseInstanceDto) {
        return this.expenseInstancesService.update(+id, updateExpenseInstanceDto);
    }
    remove(id) {
        return this.expenseInstancesService.remove(+id);
    }
};
exports.ExpenseInstancesController = ExpenseInstancesController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_expense_instance_dto_1.CreateExpenseInstanceDto]),
    __metadata("design:returntype", void 0)
], ExpenseInstancesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ExpenseInstancesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ExpenseInstancesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_expense_instance_dto_1.UpdateExpenseInstanceDto]),
    __metadata("design:returntype", void 0)
], ExpenseInstancesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ExpenseInstancesController.prototype, "remove", null);
exports.ExpenseInstancesController = ExpenseInstancesController = __decorate([
    (0, common_1.Controller)('expense-instances'),
    __metadata("design:paramtypes", [expense_instances_service_1.ExpenseInstancesService])
], ExpenseInstancesController);
//# sourceMappingURL=expense-instances.controller.js.map