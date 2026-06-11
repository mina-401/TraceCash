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
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const current_user_decorator_1 = require("../../common/decorators/current-user.decorator");
let ExpenseInstancesController = class ExpenseInstancesController {
    service;
    constructor(service) {
        this.service = service;
    }
    findByPeriod(user, from, to) {
        return this.service.findByPeriod(user.userId, from, to);
    }
    markPaid(id) {
        return this.service.markPaid(id);
    }
    skip(id) {
        return this.service.skip(id);
    }
};
exports.ExpenseInstancesController = ExpenseInstancesController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Query)('from')),
    __param(2, (0, common_1.Query)('to')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", void 0)
], ExpenseInstancesController.prototype, "findByPeriod", null);
__decorate([
    (0, common_1.Patch)(':id/pay'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ExpenseInstancesController.prototype, "markPaid", null);
__decorate([
    (0, common_1.Patch)(':id/skip'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ExpenseInstancesController.prototype, "skip", null);
exports.ExpenseInstancesController = ExpenseInstancesController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Controller)('expense-instances'),
    __metadata("design:paramtypes", [expense_instances_service_1.ExpenseInstancesService])
], ExpenseInstancesController);
//# sourceMappingURL=expense-instances.controller.js.map