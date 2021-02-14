import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatopersonaComponent } from './datopersona.component';

describe('DatopersonaComponent', () => {
  let component: DatopersonaComponent;
  let fixture: ComponentFixture<DatopersonaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatopersonaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatopersonaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
