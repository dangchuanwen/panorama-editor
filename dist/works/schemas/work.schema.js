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
exports.WorksSchema = exports.Work = exports.WorkTheme = void 0;
const mongoose = require("mongoose");
const mongoose_1 = require("@nestjs/mongoose");
const user_schema_1 = require("../../users/schemas/user.schema");
var ToolNames;
(function (ToolNames) {
    ToolNames["Tip"] = "Tip";
    ToolNames["Link"] = "Link";
    ToolNames["Font"] = "Font";
})(ToolNames || (ToolNames = {}));
var WorkTheme;
(function (WorkTheme) {
    WorkTheme["Food"] = "Food";
    WorkTheme["Festival"] = "Festival";
})(WorkTheme = exports.WorkTheme || (exports.WorkTheme = {}));
let Work = class Work {
};
__decorate([
    mongoose_1.Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' }),
    __metadata("design:type", user_schema_1.User)
], Work.prototype, "user", void 0);
__decorate([
    mongoose_1.Prop(),
    __metadata("design:type", String)
], Work.prototype, "workName", void 0);
__decorate([
    mongoose_1.Prop({ type: mongoose.Schema.Types.Mixed, default: null }),
    __metadata("design:type", Object)
], Work.prototype, "panoramaTourConfig", void 0);
__decorate([
    mongoose_1.Prop({ type: mongoose.Schema.Types.String, enum: WorkTheme }),
    __metadata("design:type", String)
], Work.prototype, "workTheme", void 0);
__decorate([
    mongoose_1.Prop({ default: Date.now }),
    __metadata("design:type", Date)
], Work.prototype, "createdTime", void 0);
Work = __decorate([
    mongoose_1.Schema()
], Work);
exports.Work = Work;
exports.WorksSchema = mongoose_1.SchemaFactory.createForClass(Work);
//# sourceMappingURL=work.schema.js.map