"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt = require("bcrypt");
class Helper {
    constructor() {
        this.calculOffset = async (limit, page) => {
            const offset = limit * (page - 1);
            return offset;
        };
        this.getDateNowString = async () => {
            const date = new Date();
            const year = date.toLocaleString('default', { year: 'numeric' });
            const month = date.toLocaleString('default', { month: '2-digit' });
            const day = date.toLocaleString('default', { day: '2-digit' });
            return year + '-' + month + '-' + day;
        };
        this.getYear = async () => {
            const date = new Date();
            const year = date.toLocaleString('default', { year: 'numeric' });
            return year;
        };
        this.getMonth = async () => {
            const date = new Date();
            const month = date.toLocaleString('default', { month: '2-digit' });
            return month;
        };
        this.getDay = async () => {
            const date = new Date();
            const day = date.toLocaleString('default', { day: '2-digit' });
            return day;
        };
        this.hashPassword = async (password) => {
            const saltOrRounds = 10;
            const hash = await bcrypt.hash(password, saltOrRounds);
            return hash;
        };
    }
}
exports.default = Helper;
//# sourceMappingURL=helper.js.map