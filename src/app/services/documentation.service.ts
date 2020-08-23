import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DocumentationService {

  public counter = 0;

  public lineChange = new EventEmitter<string>();

  constructor() { }
}
