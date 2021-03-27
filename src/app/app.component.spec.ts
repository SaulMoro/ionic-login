import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { AppComponent } from './app.component';
import { routes } from './app-routing.module';
import { CoreStoreModule } from './core/core.state';

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

  it('navigation login works', async () => {
    const { router, run } = setup();

    const canNavigateLogin = await run(() => router.navigateByUrl('/login'));

    expect(canNavigateLogin).toBe(true);
  });

  it('navigation home works', async () => {
    const { router, run } = setup();

    const canNavigateLogin = await run(() => router.navigateByUrl('/home'));

    expect(canNavigateLogin).toBe(true);
  });

  it('navigation unknown route doesnt works', async () => {
    const { router, run } = setup();

    await run(() => router.navigateByUrl('/not-exists')).catch((error) =>
      expect(error).toMatch(/Cannot match any routes/i),
    );
  });
});

const setup = () => {
  TestBed.configureTestingModule({
    imports: [RouterTestingModule.withRoutes(routes), CoreStoreModule],
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
