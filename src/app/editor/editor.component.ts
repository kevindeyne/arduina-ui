import { DocumentationService } from './../services/documentation.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent {

  constructor(private documentationService : DocumentationService) {}

  noFullSelect(event) {
    event.target.selectionStart = event.target.selectionEnd;
    this.updateDocumentation(event);
  }

  navigation(event) {
    this.updateDocumentation(event);
    if(event.key === "ArrowDown" && null !== event.srcElement.nextElementSibling) {
      if("INPUT" === event.srcElement.nextElementSibling.nodeName) {
          this.focusElement(event, event.srcElement.nextElementSibling);
      } else {
          this.focusElement(event, event.srcElement.nextElementSibling.nextElementSibling);
      }
    } else if(event.key === "ArrowUp" && null !== event.srcElement.previousElementSibling) {
        if("INPUT" === event.srcElement.previousElementSibling.nodeName) {
            this.focusElement(event, event.srcElement.previousElementSibling);
        } else {
            this.focusElement(event, event.srcElement.previousElementSibling.previousElementSibling);
        }
     }
  }

  focusElement(event, element) {
    if(element == null){
      return;
    } else {
      element.focus();
    }
  }

  updateDocumentation(event) {
    this.documentationService.lineChange.emit(event.target.value);
  }

}
