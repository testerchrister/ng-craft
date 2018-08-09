import { Component, AfterViewInit, ViewChild, ElementRef, Input } from '@angular/core';
import { Observable, fromEvent } from 'rxjs';
import { switchMap, takeUntil, pairwise } from 'rxjs/operators';

@Component({
  selector: 'craftboard',
  templateUrl: './craftboard.component.html',
  styleUrls: ['./craftboard.component.css']
})
export class CraftboardComponent implements AfterViewInit {

  @ViewChild('craftboard') public craftboard: ElementRef;
  private context: CanvasRenderingContext2D;
  private squareStart: boolean;
  private squareStartPoint: Point;
  @Input() tool: string;

  ngAfterViewInit() {
    const board: HTMLCanvasElement = this.craftboard.nativeElement;
    this.context = board.getContext('2d');

    this.context.lineWidth = 2;
    this.context.lineCap = 'round';
    this.context.strokeStyle = '#000';

    this.captureEvents(board);
  }

  ngAfterViewChecked()
  {
    if (this.tool === 'eraser') {
      this.context.lineWidth = 20;
      this.context.strokeStyle = '#fff';
    } else {
      this.context.lineWidth = 2;
      this.context.strokeStyle = '#000';
    }
  }

  private captureEvents(event: HTMLCanvasElement)
  {
    var tempPoint: Point;
    fromEvent(event, 'mousedown')
    .pipe(switchMap(e => {
        if ((this.tool == 'square' || this.tool == 'circle' ) && !this.squareStart) {
          this.squareStart = true;
        } else {
          this.squareStart = false;
        }
        return fromEvent(event, 'mousemove')
        .pipe(
            takeUntil(fromEvent(event, 'mouseup')), 
            takeUntil(fromEvent(event, 'mouseleave')),
            pairwise()
        )   
    }))
    .subscribe((res: [MouseEvent, MouseEvent])=>{
      const rect = event.getBoundingClientRect();
      
      if (this.squareStart) {
        if (!tempPoint) 
          tempPoint = {
            x: res[0].clientX - rect.left,
            y: res[0].clientY - rect.top
          }
      } else {
        tempPoint = {
          x: res[0].clientX - rect.left,
          y: res[0].clientY - rect.top
        }
      }
      const prevPos = tempPoint;

      const currPos = {
        x: res[1].clientX - rect.left,
        y: res[1].clientY - rect.top
      }
      this.drawonCanvas(prevPos, currPos);
    }) 
  }

  private drawonCanvas(prevPos: Point, currPos: Point)
  {
    if (!this.context) {
      return ;
    }
    this.context.beginPath();

    if(prevPos) {
      if (this.tool == 'square') {
        this.context.clearRect(prevPos.x, prevPos.y, currPos.x - prevPos.x, currPos.y - prevPos.y);
        this.context.strokeRect(prevPos.x, prevPos.y, currPos.x - prevPos.x, currPos.y - prevPos.y);
      } else if (this.tool == 'circle') {
        //this.context.ellipse(prevPos.x, prevPos.y, currPos.x - prevPos.x, currPos.y - prevPos.y, 1, 0, 360, true);
        
        var distance = Math.sqrt(Math.pow(prevPos.x - currPos.x, 2) + Math.pow(prevPos.y - currPos.y, 1));
        console.log(distance);
        this.context.arc(currPos.x, currPos.y,distance, 0, Math.PI * 2, false);
        this.context.clearRect(prevPos.x, prevPos.y, (currPos.x - prevPos.x) - this.context.lineWidth, (currPos.y - prevPos.y) + this.context.lineWidth);
        this.context.stroke();
        this.context.fillStyle= '#fff';
        this.context.fill();
        
      } else {
        this.context.moveTo(prevPos.x, prevPos.y);
        this.context.lineTo(currPos.x, currPos.y);
        this.context.stroke();
      }
    }
  }

}

interface Point {
  x: number;
  y: number;
}
