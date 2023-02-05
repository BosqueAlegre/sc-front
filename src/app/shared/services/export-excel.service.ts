import { Injectable } from '@angular/core';
import { Workbook } from 'exceljs';

@Injectable()
export class ExportExcelService {
  constructor() {}

  async importFamilyCharge(formFile: any) {
    const { workbook, worksheet } = await this.initWorkbookExcel(formFile);
    let letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'];
    let number = 0;
    let isUndefined: any = '';
    while (isUndefined != undefined || isUndefined != null) {
      number++;
      isUndefined = worksheet.getCell(`B${number}`).value;
    }
    number--;
    let family = [];

    for (let i = 2; i <= number; i++) {
      let user = {
        ci: '',
        name: '',
        patherLastName: '',
        motherLastName: '',
        email: '',
        phone: '',
        gender: '',
        dateOfBirth: 0,
        familyBoss: false,
        boss: false,
        family: '',
        apartment: '',
      };
      for (let letter of letters) {
        switch (letter) {
          case 'A':
            user.ci = String(worksheet.getCell(`${letter}${number}`).value);
            break;
          case 'B':
            user.name = String(worksheet.getCell(`${letter}${number}`).value);
            break;
          case 'C':
            user.patherLastName = String(
              worksheet.getCell(`${letter}${number}`).value
            );

            break;
          case 'D':
            user.motherLastName = String(
              worksheet.getCell(`${letter}${number}`).value
            );

            break;

          case 'E':
            let email: any = worksheet.getCell(`${letter}${number}`).value;
            user.email = email.text;

            break;
          case 'F':
            user.phone = String(worksheet.getCell(`${letter}${number}`).value);

            break;
          case 'G':
            user.gender = String(worksheet.getCell(`${letter}${number}`).value);

            break;
          case 'H':
            user.dateOfBirth = new Date(
              String(worksheet.getCell(`${letter}${number}`).value)
            ).getTime();

            break;
          case 'I':
            user.apartment = String(
              worksheet.getCell(`${letter}${number}`).value
            );

            break;
          default:
            break;
        }
      }
      family.push(user);
    }
  }

  async importFamilyBoss(formFile: any) {
    const { workbook, worksheet } = await this.initWorkbookExcel(formFile);
    let letters = ['A'];
    let number = 0;
    let isUndefined: any = '';
    while (isUndefined != undefined || isUndefined != null) {
      number++;
      isUndefined = worksheet.getCell(`A${number}`).value;
    }
    number--;
    let familyBoss = [];

    for (let i = 2; i <= number; i++) {
      for (let letter of letters) {
        familyBoss.push(worksheet.getCell(`${letter}${number}`).value);
      }
    }
    console.log(familyBoss);
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
