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

  editId: number | null = null;

  listOfData: ItemData[] = [];

  i = this.listOfData[this.listOfData.length - 1].id;

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

    this.saveState()

    console.log(this.listOfData);

  }

  changeStatus(id: number):void {
    this.listOfData[id].status = !this.listOfData[id].status
    this.saveState()

  }

  deleteRow(id: number): void {
    this.listOfData = this.listOfData.filter(d => d.id !== id);
    this.saveState()
  }

  ngOnInit(): void {
    this.loadState()
  }

  saveState(): void{
    localStorage.setItem('buyList', JSON.stringify(this.listOfData))
  }

  loadState() {
    try {
      const buyListInStorage = JSON.parse(localStorage.getItem('buyList') as string, (key, value) => value)

      this.listOfData.length = 0
      this.listOfData.push(...buyListInStorage)
    } catch (e) {
      console.log('There was an error retrieving buyList from localStorage')
      console.log(e)
    }
  }
}
