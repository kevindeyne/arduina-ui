import { DocumentationService } from './../services/documentation.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-editor-docs',
  templateUrl: './editor-docs.component.html',
  styleUrls: ['./editor-docs.component.css']
})
export class EditorDocsComponent implements OnInit {

  outOfFocus = false;
  allOptionsShown = true;
  multipleOptionsPossible = [];

  private matches = ['OPEN', 'CLICK', 'INPUT', 'DELETE', 'GET', 'HEAD', 'OPTIONS', 'PATCH', 'POST', 'PUT', 'VERIFY', 'SCROLL'];

  private categories = [
    {
      cat: 'Web UI',
      cmds: ['OPEN', 'CLICK', 'INPUT', 'SCROLL']
    },
    {
      cat: 'REST api',
      cmds: ['GET', 'POST', 'HEAD', 'PUT', 'OPTIONS', 'PATCH', 'DELETE']
    },
    {
      cat: 'Database',
      cmds: ['SELECT', 'UPDATE']
    },
    {
      cat: 'Email',
      cmds: ['EXPECT-EMAIL', 'SEND-EMAIL-TO']
    },
    {
      cat: 'VERIFY',
      cmds: ['VERIFY']
    }
  ];

  private commandDetails = [
    {
      name: 'OPEN',
      fullCommand: 'OPEN \'(documentselector)\'',
      example: 'OPEN \'https://www.arduina.dev\'',
      description: 'The OPEN command is meant to load a website. The site page can be internal or external.',
      options: []
    },
    {
      name: 'CLICK',
      fullCommand: 'CLICK \'(documentselector)\' -optionA -optionB',
      example: 'CLICK \'button[type="submit"]\'',
      description: 'The CLICK command is meant to trigger a click event in a web ui. By default it will wait until a change is done',
      options: [{
        option: '-wait=(boolean)',
        default: 'true',
        description: 'This will check for a combination of DOM changes and visual comparisons.'
      }]
    },
    {
      name: 'INPUT',
      fullCommand: 'INPUT \'(documentselector)\' -set=(value)',
      example: 'INPUT \'input[name="email"]\' -set=john@doe.com',
      description: 'The INPUT command is meant fill in a value into an input box.',
      options: [{
        option: '-set=(value)',
        description: 'This will check for a combination of DOM changes and visual comparisons.'
      }]
    },
    {
      name: 'VERIFY',
      fullCommand: 'INPUT \'(documentselector)\' -set=(value)',
      example: 'INPUT \'input[name="email"]\' -set=john@doe.com',
      description: 'The INPUT command is meant fill in a value into an input box.',
      options: [{
        option: '-set=(value)',
        description: 'This will check for a combination of DOM changes and visual comparisons.'
      }]
    }
  ];

  selected = null;

  constructor(private documentationService: DocumentationService) {
    this.documentationService.lineChange.subscribe((line: string) => this.loadDocumentation(line));
    this.showAllOptions();
  }

  ngOnInit(): void {
  }

  loadDocumentation(line) {
    if (line == null  || line.trim() === '') {
      this.showAllOptions();
    } else {
      this.allOptionsShown = false;
      let firstWord = line;
      if (firstWord.includes(' ')) { firstWord = line.split(' ')[0]; }
      firstWord = firstWord.trim().toUpperCase();

      const possibleCommands = this.matches.filter(name => name.startsWith(firstWord));

      if (possibleCommands.length === 0) {
        this.showAllOptions();
      } else if (possibleCommands.length === 1) {
        this.multipleOptionsPossible = [];
        this.selected = this.commandDetails.filter(cmd => cmd.name === possibleCommands[0])[0];
      } else {
        this.multipleOptionsPossible = possibleCommands;
      }

    }
  }

  showAllOptions() {
        this.allOptionsShown = true;
        this.multipleOptionsPossible = [];
  }

}
