import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {

  noFullSelect(event) {
    event.target.selectionStart = event.target.selectionEnd;
  }

  navigation(event) {
    if(event.key === "ArrowDown") {
      this.focusElement(event.srcElement.nextElementSibling);
    } else if(event.key === "ArrowUp") {
      this.focusElement(event.srcElement.previousElementSibling);
     }
  }

  focusElement(element) {
    if(element == null)
        return;
    else
        element.focus();
  }

}
