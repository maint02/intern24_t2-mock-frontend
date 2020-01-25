import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Navbar.ComponentComponent } from './navbar.component.component';

describe('Navbar.ComponentComponent', () => {
  let component: Navbar.ComponentComponent;
  let fixture: ComponentFixture<Navbar.ComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Navbar.ComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Navbar.ComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
