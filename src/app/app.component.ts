import { Component } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AddCardComponent } from './add-cart/add-card.component';
import { JUL } from '@angular/material/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  listData = [];


  constructor(public dialog: MatDialog) { }

  ngOnInit() {
    this.addList();
  }

  addCard(i) {
    const length = this.listData[i].cardData.length - 1;
    this.openDialog(i, length, 'add');
  }

  addList() {
    const length = this.listData.length + 1;;
    this.listData.push({ title: `List ${length}`, cardData: [{ title: 'Card Title:1', desc: '', comments: [] }] });
  }

  editCard(i, j) {
    this.openDialog(i, j, 'edit');
  }
  deleteCard(i, j) {
    this.listData[i].cardData.splice(j, 1);

  }
  deleteList(i: any) {
    this.listData.splice(i, 1);
  }

  drop(event: CdkDragDrop<string[]>, i) {
    moveItemInArray(this.listData[i].cardData, event.previousIndex, event.currentIndex);
  }




  openDialog(lIndex, cIndex, action): void {
    const dialogRef = this.dialog.open(AddCardComponent, {
      width: '40%',
      height: '55%',
      data: { cardData: this.listData[lIndex].cardData[cIndex], action: action }
    });

    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        if (action === 'add') {
          this.listData[lIndex].cardData.push(res);
        }
        else {
          this.listData[lIndex].cardData[cIndex] = res;
        }

      }
    })
  }

  getComments(data) {
    let cmt = []
    cmt = data.map(element => element.comment);
    return cmt.toString();
  }
}
