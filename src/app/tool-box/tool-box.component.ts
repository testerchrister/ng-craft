import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'tool-box',
  templateUrl: './tool-box.component.html',
  styleUrls: ['./tool-box.component.css']
})
export class ToolBoxComponent implements OnInit {

  @Output() toolSelected = new EventEmitter<string>();
  constructor() { }

  ngOnInit() {
  }

  chooseTool(tool: string) {
    console.log('Tool selected', tool);
    this.toolSelected.emit(tool);
  }
}
