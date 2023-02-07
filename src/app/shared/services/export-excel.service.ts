import { HttpBackend, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Workbook } from 'exceljs';
import { saveAs } from 'file-saver';
import { AuthService } from 'src/app/services/auth.service';
import { FamilyService } from 'src/app/services/family.service';

@Injectable()
export class ExportExcelService {
  private http: HttpClient;

  constructor(private handler: HttpBackend) {
    this.http = new HttpClient(this.handler);
  }

  async importFamilyCharge(formFile: any, familyBoss: any) {
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
        boss: familyBoss.id,
        family: '',
        apartment: '',
        admin: familyBoss.admin,
        role: 'CARGA FAMILIAR',
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
    console.log(family);
    return family;
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
  }

  async initWorkbookExcel(formFile: any) {
    const workbook = new Workbook();
    await this.importExcel(workbook, formFile);
    return { workbook, worksheet: workbook.getWorksheet('Formato') };
  }
  async importExcel(workbook: any, formFile: any) {
    await workbook.xlsx.load(formFile);
  }

  //Export excel
  async exportExcel(array: any) {
    const { workbook, worksheet } = await this.getWorkbook();
    this.setValues(worksheet, array);
    this.saveExport(workbook);
  }
  async getExcel(workbook: any) {
    let formFile: any = await this.http
      .get('assets/files/Formato-carga-familiar.xlsx', {
        observe: 'response',
        responseType: 'blob',
      })
      .toPromise();
    await workbook.xlsx.load(formFile.body);
  }
  async getWorkbook() {
    const workbook = new Workbook();
    await this.getExcel(workbook);

    return { workbook, worksheet: workbook.getWorksheet('Formato') };
  }
  setValues(worksheet: any, array: any) {
    let letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'];
    let n = 0;
    for (let i = 2; i <= array.length + 1; i++) {
      for (let letter of letters) {
        switch (letter) {
          case 'A':
            worksheet.getCell(`${letter}${i}`).value = array[n].ci;
            break;
          case 'B':
            worksheet.getCell(`${letter}${i}`).value = array[n].name;
            break;
          case 'C':
            worksheet.getCell(`${letter}${i}`).value = array[n].patherLastName;
            break;
          case 'D':
            worksheet.getCell(`${letter}${i}`).value = array[n].motherLastName;
            break;
          case 'E':
            worksheet.getCell(`${letter}${i}`).value = array[n].email;
            break;
          case 'F':
            worksheet.getCell(`${letter}${i}`).value = array[n].phone;
            break;
          case 'G':
            worksheet.getCell(`${letter}${i}`).value = array[n].gender;
            break;
          case 'H':
            worksheet.getCell(`${letter}${i}`).value = `${new Date(
              array[n].dateOfBirth
            ).getDate()}/${
              new Date(array[n].dateOfBirth).getMonth() + 1
            }/${new Date(array[n].dateOfBirth).getFullYear()}`;
            break;
          case 'I':
            worksheet.getCell(`${letter}${i}`).value = array[n].apartment;
            break;
          default:
            break;
        }
      }
      n++;
    }
  }
  async saveExport(workbook: any) {
    const nameDocument = `Listado ${new Date().getDate()}/${
      new Date().getMonth() + 1
    }/${new Date().getFullYear()}`;
    const typeDocument =
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
    const data = await workbook.xlsx.writeBuffer();
    const blob = new Blob([data], { type: typeDocument });
    saveAs(blob, nameDocument + '.xlsx');
  }

  async downloadModel() {
    const { workbook, worksheet } = await this.getWorkbook();
    this.saveExport(workbook);
  }
}
