import { Component, OnInit } from '@angular/core';

interface ItemData {
  id: number;
  name: string;
  status: boolean;
}

@Component({
  selector: 'app-buy-list',
  templateUrl: './buy-list.component.html',
  styleUrls: ['./buy-list.component.scss']
})
export class BuyListComponent implements OnInit {
  i = 0;
  editId: number | null = null;
  listOfData: ItemData[] = [
    {
      id: 0,
      name: "Молоко",
      status: false,
    },
    {
      id: 1,
      name: "Сыр",
      status: true,
    },
    {
      id: 2,
      name: "Хлеб",
      status: false,
    },
  ];

  startEdit(id: number): void {
    this.editId = id;
  }

  stopEdit(): void {
    this.editId = null;
  }

  addRow(name: string): void {
    if(name.length < 3 || name === " ") return
    this.listOfData = [
      ...this.listOfData,
      {
        id: this.listOfData[this.listOfData.length - 1].id + 1,
        name: name,
        status: false
      }
    ];
    this.i++;

    console.log(this.listOfData);

  }

  changeStatus(id: number):void {
    this.listOfData[id].status = !this.listOfData[id].status

  }

  deleteRow(id: number): void {
    this.listOfData = this.listOfData.filter(d => d.id !== id);
  }

  ngOnInit(): void {

  }
}
