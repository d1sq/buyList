import { Component, OnDestroy, OnInit } from '@angular/core';
import { fromEvent, Subject, Subscription } from 'rxjs';

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
export class BuyListComponent implements OnInit, OnDestroy {

  private _destroy$ = new Subject<boolean>();

  editId: number | null = null;

  listOfData: ItemData[] = [];

  storageListener!: Subscription;

  i = 0;

  constructor(){
    this.loadState()

    // this.storageListener = fromEvent(window, 'storage').subscribe((event: StorageEvent) => {
    //   if(event.key === 'listOfData'){
    //     this.loadState()
    //   }
    // })
  }

  ngOnDestroy(){
    this._destroy$.next(true);
    this._destroy$.complete();

  }

  startEdit(id: number): void {
    this.editId = id;
  }

  stopEdit(): void {
    this.editId = null;
  }

  addRow(name: string): void {
    if(name.length < 3 || name === " ") return
    if(this.listOfData.length < 1){
      this.listOfData = [
        ...this.listOfData,
        {
          id: 0,
          name: name,
          status: false
        }
      ];
    }else{
      this.listOfData = [
        ...this.listOfData,
        {
          id: this.listOfData[this.listOfData.length - 1].id + 1,
          name: name,
          status: false
        }
      ];
    }
    this.saveState()
  }

  changeStatus(id: number):void {
    this.listOfData[id].status = !this.listOfData[id].status
    this.saveState()

  }

  deleteRow(id: number): void {
    this.listOfData = this.listOfData.filter(d => d.id !== id);
    this.saveState()
  }

  ngOnInit(): void {}

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
