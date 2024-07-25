import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NtsplAdminComponent } from './ntspl-admin.component';

describe('NtsplAdminComponent', () => {
  let component: NtsplAdminComponent;
  let fixture: ComponentFixture<NtsplAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NtsplAdminComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NtsplAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
