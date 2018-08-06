import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
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

  ngAfterViewInit() {
    const board: HTMLCanvasElement = this.craftboard.nativeElement;
    this.context = board.getContext('2d');

    this.context.lineWidth = 2;
    this.context.lineCap = 'round';
    this.context.strokeStyle = '#000';

    this.captureEvents(board);
  }

  private captureEvents(event: HTMLCanvasElement)
  {
    
    fromEvent(event, 'mousedown')
    .pipe(switchMap(e => {
        return fromEvent(event, 'mousemove')
        .pipe(
            takeUntil(fromEvent(event, 'mouseup')), 
            takeUntil(fromEvent(event, 'mouseleave')),
            pairwise()
        )   
    }))
    .subscribe((res: [MouseEvent, MouseEvent])=>{
      const rect = event.getBoundingClientRect();
      const prevPos = {
        x: res[0].clientX - rect.left,
        y: res[0].clientY - rect.top
      }

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
      this.context.moveTo(prevPos.x, prevPos.y);
      this.context.lineTo(currPos.x, currPos.y);
      this.context.stroke();
    }
  }

}

interface Point {
  x: number;
  y: number;
}
