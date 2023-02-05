import { Injectable } from '@angular/core';
import { Workbook } from 'exceljs';

@Injectable()
export class ExportExcelService {
  constructor() {}

  async import(formFile: any) {
    const { workbook, worksheet } = await this.initWorkbookExcel(formFile);
    let a = worksheet.getCell('A2').value;
    let letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'];

    for (let letter of letters) {
      // for(){
      // }
    }
    console.log(a);
  }
  async initWorkbookExcel(formFile: any) {
    const workbook = new Workbook();
    await this.importExcel(workbook, formFile);
    return { workbook, worksheet: workbook.getWorksheet('Formato') };
  }
  async importExcel(workbook: any, formFile: any) {
    await workbook.xlsx.load(formFile);
  }
}
