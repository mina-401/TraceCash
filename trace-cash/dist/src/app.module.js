"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const categories_module_1 = require("./modules/categories/categories.module");
const common_module_1 = require("./common/common.module");
const recurring_expenses_module_1 = require("./modules/recurring-expenses/recurring-expenses.module");
const scheduler_module_1 = require("./modules/scheduler/scheduler.module");
const schedule_1 = require("@nestjs/schedule");
const expense_instances_module_1 = require("./modules/expense-instances/expense-instances.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            schedule_1.ScheduleModule.forRoot(),
            common_module_1.CommonModule, categories_module_1.CategoriesModule, recurring_expenses_module_1.RecurringExpensesModule, scheduler_module_1.SchedulerModule, expense_instances_module_1.ExpenseInstancesModule
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map