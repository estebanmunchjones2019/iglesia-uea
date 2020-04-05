import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContainerIntroComponent } from './container-intro.component';

describe('ContainerIntroComponent', () => {
  let component: ContainerIntroComponent;
  let fixture: ComponentFixture<ContainerIntroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContainerIntroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContainerIntroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
