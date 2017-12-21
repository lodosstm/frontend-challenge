export class Employee {
  constructor(
    public photo: string,
    public firstName: string,
    public lastName: string,
    public Sex: string,
    public birthDay: string,
    public position: string,
    public idskill = [],
    public characteristic: string,
    public progress: number,
    public id?: number
  ) { }
}
