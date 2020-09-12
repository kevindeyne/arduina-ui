import { DocumentationService } from './../services/documentation.service';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent {

  @Input()
  nodes: [];

  constructor(private documentationService: DocumentationService) {}

  noFullSelect(event) {
    event.target.selectionStart = event.target.selectionEnd;
    this.updateDocumentation(event);
  }

  navigation(event) {
    this.updateDocumentation(event);
    if (event.key === 'ArrowDown') {
        this.focusElement(event, this.getNextSibling(event.srcElement, '.input'));
    } else if (event.key === 'ArrowUp') {
         this.focusElement(event, this.getPreviousSibling(event.srcElement, '.input'));
     }
  }

  getPreviousSibling(elem, selector) {
    const allOptions = document.querySelectorAll(selector);
    const index = Array.prototype.indexOf.call(allOptions, elem);
    if(index === 0) { return elem; }
    return allOptions[index - 1];
  }

  getNextSibling(elem, selector) {
    const allOptions = document.querySelectorAll(selector);
    const index = Array.prototype.indexOf.call(allOptions, elem);
    if(index === allOptions.length) { return elem; }
    return allOptions[index + 1];
  }

  focusElement(event, element) {
    if (element == null) {
      return;
    } else {
      element.focus();
    }
  }

  updateDocumentation(event) {
    this.documentationService.lineChange.emit(event.target.value);
  }

}
