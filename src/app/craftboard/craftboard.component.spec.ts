import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CraftboardComponent } from './craftboard.component';

describe('CraftboardComponent', () => {
  let component: CraftboardComponent;
  let fixture: ComponentFixture<CraftboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CraftboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CraftboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
