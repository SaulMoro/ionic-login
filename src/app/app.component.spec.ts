import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { AppComponent } from './app.component';
import { AppModule } from './app.module';

describe('Applicaton smoke test', () => {
  it('the application boots up', () => {
    const bootApplication = () => {
      const { router, run } = setup();
      run(() => router.initialNavigation());
    };

    expect(bootApplication).not.toThrow();
  });

  it('navigation works', async () => {
    const { router, run } = setup();
    const canNavigate = await run(() => router.navigateByUrl('/'));

    expect(canNavigate).toBe(true);
  });

  it('navigation home works', async () => {
    const { router, run } = setup();
    const canNavigate = await run(() => router.navigateByUrl('/home'));

    expect(canNavigate).toBe(true);
  });

  it('navigation login works', async () => {
    const { router, run } = setup();
    const canNavigate = await run(() => router.navigateByUrl('/login'));

    expect(canNavigate).toBe(true);
  });
});

const setup = () => {
  TestBed.configureTestingModule({
    imports: [AppModule, RouterTestingModule],
  }).compileComponents();

  let rootFixture: ComponentFixture<AppComponent>;
  const initializeRootFixture = () => {
    if (rootFixture == null) {
      rootFixture = TestBed.createComponent(AppComponent);
    }
  };

  return {
    get router() {
      initializeRootFixture();
      return TestBed.inject(Router);
    },
    run: <TResult>(task: () => TResult) => {
      initializeRootFixture();
      return rootFixture.ngZone == null ? task() : rootFixture.ngZone.run(task);
    },
  };
};
