import { DocumentationService } from './../services/documentation.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-editor-docs',
  templateUrl: './editor-docs.component.html',
  styleUrls: ['./editor-docs.component.css']
})
export class EditorDocsComponent implements OnInit {

  debug = "";

  private matches = ['OPEN', 'CLICK', 'INPUT', 'DELETE', 'GET', 'HEAD', 'OPTIONS', 'PATCH', 'POST', 'PUT', 'VERIFY', 'SCROLL']; //TODO dynamic

  constructor(private documentationService: DocumentationService) {
    this.documentationService.lineChange.subscribe((line: string) => this.loadDocumentation(line));
    this.showAllOptions();
  }

  ngOnInit(): void {
  }

  loadDocumentation(line) {
    if(line == null  || line.trim() === "") {
      this.showAllOptions();
    } else {
      let firstWord = line;
      if(firstWord.includes(" ")) firstWord = line.split(" ")[0];
      firstWord = firstWord.trim().toUpperCase();

      let possibleCommands = this.matches.filter(name => name.startsWith(firstWord));

      //let matchFound = this.matches[this.matches.indexOf(firstWord)];
      //let fullMatch = this.matches.indexOf(firstWord) <= 0;
      //this.debug = matchFound + " - " + fullMatch;
      if(possibleCommands.length === 0) {
        this.showAllOptions();
      } else if(possibleCommands.length === 1) {
        this.debug = possibleCommands[0] + ": full info";
      } else {
        this.debug = possibleCommands.join(', ');
      }

    }
  }

  showAllOptions() {
        this.debug = "Showing all options";
  }

}
