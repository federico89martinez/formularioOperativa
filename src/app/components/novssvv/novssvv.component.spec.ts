import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NovssvvComponent } from './novssvv.component';

describe('NovssvvComponent', () => {
  let component: NovssvvComponent;
  let fixture: ComponentFixture<NovssvvComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NovssvvComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NovssvvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
