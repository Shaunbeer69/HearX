import { TestBed, async } from '@angular/core/testing';
import { LandingPageComponent } from './landing-page.component';


describe('LandingPageComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        LandingPageComponent
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(LandingPageComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'hearx-shop'`, () => {
    const fixture = TestBed.createComponent(LandingPageComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('hearx-shop');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(LandingPageComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('.content span').textContent).toContain('hearx-shop app is running!');
  });
});
