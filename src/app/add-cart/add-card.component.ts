import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-add-card',
  templateUrl: './add-card.component.html',
  styleUrls: ['./add-card.component.css']
})
export class AddCardComponent implements OnInit {

  data;
  comment = '';
  constructor(
    public dialogRef: MatDialogRef<AppComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogdata) { }

  ngOnInit(): void {
    this.initializeData();
  }

  initializeData() {
    if (this.dialogdata.action === 'add') {
      this.data = { title: 'Card Title', desc: '', comments: [''] };
    }
    else {
      this.data = JSON.parse(JSON.stringify(this.dialogdata.cardData));
    }
  }

  onSave() {
    this.dialogRef.close(this.data);
  }
  onClose() {
    this.dialogRef.close();
  }
  addComment() {
    const date = new Date();
    const ts = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
    this.data.comments.push({ comment: this.comment, ts: ts });
    this.comment = '';
  }
}
