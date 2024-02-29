import * as bcrypt from 'bcrypt';

class Helper {
  public calculOffset = async (
    limit: number,
    page: number,
  ): Promise<number> => {
    const offset: number = limit * (page - 1);
    return offset;
  };

  public getDateNowString = async (): Promise<string> => {
    const date: Date = new Date();
    const year: string = date.toLocaleString('default', { year: 'numeric' });
    const month: string = date.toLocaleString('default', { month: '2-digit' });
    const day: string = date.toLocaleString('default', { day: '2-digit' });

    return year + '-' + month + '-' + day;
  };

  public getYear = async (): Promise<string> => {
    const date: Date = new Date();
    const year: string = date.toLocaleString('default', { year: 'numeric' });

    return year;
  };

  public getMonth = async (): Promise<string> => {
    const date: Date = new Date();
    const month: string = date.toLocaleString('default', { month: '2-digit' });

    return month;
  };

  public getDay = async (): Promise<string> => {
    const date: Date = new Date();
    const day: string = date.toLocaleString('default', { day: '2-digit' });

    return day;
  };

  public hashPassword = async (password: string): Promise<string> => {
    const saltOrRounds = 10;
    const hash = await bcrypt.hash(password, saltOrRounds);

    return hash;
  };
}
export default Helper;
