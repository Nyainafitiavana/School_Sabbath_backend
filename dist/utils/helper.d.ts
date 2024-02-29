declare class Helper {
    calculOffset: (limit: number, page: number) => Promise<number>;
    getDateNowString: () => Promise<string>;
    getYear: () => Promise<string>;
    getMonth: () => Promise<string>;
    getDay: () => Promise<string>;
    hashPassword: (password: string) => Promise<string>;
}
export default Helper;
