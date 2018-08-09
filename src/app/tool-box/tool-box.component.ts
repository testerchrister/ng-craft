import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'tool-box',
  templateUrl: './tool-box.component.html',
  styleUrls: ['./tool-box.component.css']
})
export class ToolBoxComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  chooseTool(tool) {
    console.log('Tool selected', tool);
  }
}
