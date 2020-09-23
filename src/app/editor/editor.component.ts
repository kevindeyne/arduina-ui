import { UserService } from './../services/user.service';
import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { TestNode } from './../services/TestNode';
import { DocumentationService } from './../services/documentation.service';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent {

  @Input()
  nodes: TestNode[];

  constructor(private documentationService: DocumentationService, private httpClient: HttpClient, private userService: UserService) {}

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
    } else if (event.key === 'Enter') {
        const newNode = new TestNode();
        newNode.command = event.target.value;
        this.nodes.push(newNode);
        event.target.value = '';
        this.save(newNode);
    }
  }

  saveLine(event) {
    const allOptions = document.querySelectorAll('.input');
    const index = Array.prototype.indexOf.call(allOptions, event.target);
    const testNode = this.nodes[index];
    testNode.command = event.target.value;
    if (testNode.command !== testNode.lastVersion) {
      this.save(testNode);
    }
  }

  private save(node: TestNode): TestNode {
    node.lastVersion = node.command;
    if (node.id === undefined) {
      this.httpClient.post<TestNode>(environment.baseUrl + '/new-node', node, this.userService.getHeader()).subscribe(e => {
        node = e;
      });
    } else {
      this.httpClient.post<TestNode>(environment.baseUrl + '/update-node', node, this.userService.getHeader()).subscribe(e => {
        node = e;
      });
    }
    return node;
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
