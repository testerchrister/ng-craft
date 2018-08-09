import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Draw Box';
  private _selectedTool: string;

  ngOnInit()
  {
    this._selectedTool = 'pencil';
  }

  setTool(tool: string)
  {
    this._selectedTool = tool;
  }

  selectedTool()
  {
    return this._selectedTool;
  }
}
