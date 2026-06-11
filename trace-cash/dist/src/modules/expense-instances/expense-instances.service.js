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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpenseInstancesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../common/prisma/prisma.service");
let ExpenseInstancesService = class ExpenseInstancesService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    findByPeriod(userId, from, to) {
        return this.prisma.expenseInstance.findMany({
            where: {
                dueDate: { gte: new Date(from), lte: new Date(to) },
                recurring: { userId },
            },
            include: { recurring: true },
            orderBy: { dueDate: 'asc' },
        });
    }
    markPaid(id) {
        return this.prisma.expenseInstance.update({
            where: { id },
            data: { status: 'PAID' },
        });
    }
    skip(id) {
        return this.prisma.expenseInstance.update({
            where: { id },
            data: { status: 'SKIPPED' },
        });
    }
};
exports.ExpenseInstancesService = ExpenseInstancesService;
exports.ExpenseInstancesService = ExpenseInstancesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ExpenseInstancesService);
//# sourceMappingURL=expense-instances.service.js.map