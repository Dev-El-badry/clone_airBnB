import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { OffertDetialPage } from './offert-detial.page';

describe('OffertDetialPage', () => {
  let component: OffertDetialPage;
  let fixture: ComponentFixture<OffertDetialPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OffertDetialPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(OffertDetialPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
