import { Component } from '@angular/core';
import { Click } from 'src/app/shared/models/clicks/clicks';
import { MatTableDataSource } from '@angular/material/table';
import { DataSource } from '@angular/cdk/table';
@Component({
  selector: 'app-list-clicks',
  templateUrl: './list-clicks.component.html',
  styleUrls: ['./list-clicks.component.scss'],
})
export class ListClicksComponent {
  private ELEMENT_DATA?: Click[] = [
    {
      idClick: '1',
      httpCode: 302,
      httpMethod: 'POST',
      ip: '192.168.1.1',
      navegador: 'Firefox',
      reference: 'Whatsapp',
      idLink: 'Link1',
    },
  ];
  displayedColumns: string[] = [
    'Link',
    'HTTP_Code',
    'HTTP_Method',
    'IP',
    'Navegador',
    'Referencia',
  ];
  listClick;

  constructor() {
    this.listClick = new MatTableDataSource(this.ELEMENT_DATA);
  }
}
