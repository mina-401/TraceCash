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
var SchedulerService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SchedulerService = void 0;
const common_1 = require("@nestjs/common");
const schedule_1 = require("@nestjs/schedule");
const date_fns_1 = require("date-fns");
const prisma_service_1 = require("../../common/prisma/prisma.service");
let SchedulerService = SchedulerService_1 = class SchedulerService {
    prisma;
    logger = new common_1.Logger(SchedulerService_1.name);
    constructor(prisma) {
        this.prisma = prisma;
    }
    getNextDueDate(rule, after) {
        let due = new Date(rule.startDate);
        if (rule.frequency === 'MONTHLY' && rule.dayOfMonth) {
            due = (0, date_fns_1.setDate)(due, rule.dayOfMonth);
        }
        while (due <= after) {
            if (rule.frequency === 'MONTHLY')
                due = (0, date_fns_1.addMonths)(due, rule.interval);
            else if (rule.frequency === 'YEARLY')
                due = (0, date_fns_1.addYears)(due, rule.interval);
            else
                due = (0, date_fns_1.addWeeks)(due, rule.interval);
        }
        return due;
    }
    async generateInstances() {
        const now = new Date();
        const rules = await this.prisma.recurringExpense.findMany({
            where: { isActive: true },
        });
        for (const rule of rules) {
            const dueDate = this.getNextDueDate(rule, now);
            if (rule.endDate && dueDate > rule.endDate)
                continue;
            await this.prisma.expenseInstance.upsert({
                where: {
                    recurringId_dueDate: { recurringId: rule.id, dueDate },
                },
                update: {},
                create: {
                    recurringId: rule.id,
                    amount: rule.amount,
                    dueDate,
                    status: 'PENDING',
                },
            });
        }
        this.logger.log(`인스턴스 생성 완료: 규칙 ${rules.length}개 체크`);
    }
};
exports.SchedulerService = SchedulerService;
__decorate([
    (0, schedule_1.Interval)(10000),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SchedulerService.prototype, "generateInstances", null);
exports.SchedulerService = SchedulerService = SchedulerService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], SchedulerService);
//# sourceMappingURL=scheduler.service.js.map