import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent {

  noFullSelect(event) {
    event.target.selectionStart = event.target.selectionEnd;
  }

  navigation(event) {
    if(event.key === "ArrowDown" && null !== event.srcElement.nextElementSibling) {
      if("INPUT" === event.srcElement.nextElementSibling.nodeName) {
          this.focusElement(event.srcElement.nextElementSibling);
      } else {
          this.focusElement(event.srcElement.nextElementSibling.nextElementSibling);
      }
    } else if(event.key === "ArrowUp" && null !== event.srcElement.previousElementSibling) {
        if("INPUT" === event.srcElement.previousElementSibling.nodeName) {
            this.focusElement(event.srcElement.previousElementSibling);
        } else {
            this.focusElement(event.srcElement.previousElementSibling.previousElementSibling);
        }
     }
  }

  focusElement(element) {
    if(element == null)
        return;
    else
        element.focus();
  }

}
