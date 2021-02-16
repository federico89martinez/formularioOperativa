import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NovsubofiComponent } from './novsubofi.component';

describe('NovsubofiComponent', () => {
  let component: NovsubofiComponent;
  let fixture: ComponentFixture<NovsubofiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NovsubofiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NovsubofiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
