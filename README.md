# PoC Ionic Login

PoC Ionic Login

[Demo of project](https://poc-ionic-login.firebaseapp.com/)

## Login Demo Data

Client User: `email:test@test.com | pass:(any password)`

VIP User: `email:vip@vip.com | pass:(any password)`

## Table of Contents

- [Quick Start](#quick-start)
- [Description](#description)
- [Anotaciones](#anotaciones)
- [Optimizaciones](#optimizaciones)
- [Code scaffolding](#code-scaffolding)
- [Contact](#contact)

## **Quick Start**

1. Run `npm i`
2. Run `npm run start`

## **Description**

Entendemos que la primera versión era una prueba de concepto con motivos de presentación a negocio y ahora se requiere una estructura base empresarial. Nos basaremos en las mejores prácticas, clean code y últimas tecnologías disponibles. Las carácterísticas generales de la arquitectura desarrollada es:

**Angular Core**

- **Core and Shared modules**
- **Lazy Loading Features**
- **Container / Presentational Components** (Smart / Dumb Components)
- **Strict mode** Angular & Typescript
- **TailwindCSS JIT** (supported natively on Angular 11.2) for fast mockup
- **Performance** with the use of trackBy, Componentes OnPush, Intersection Observer, Virtual Scrolling, Lazy images, ...
- **i18n**

**State Management**

- **NgRx** as State Management
- **NgRx Entity** for the treatment of entities
- **NgRx Router State** to manage the state of the App from the Router in NgRx
- [**Good Actions Hygiene**](https://www.youtube.com/watch?v=JmnsEvoy-gY) to think on actions as events ([Source] Event), not as commands
- [**ngrx-store-localstorage**](https://github.com/btroncone/ngrx-store-localstorage) to save or retrieve parts of the state from the localStorage. We rehydrate NgRx content (Cache)

**Test**

- Karma & Jamine
- [Angular Testing Library](https://github.com/testing-library/angular-testing-library) for unit test assertions
- [Cypress](https://cypress.io) for running E2E tests
- [Cypress Testing Library](https://github.com/testing-library/cypress-testing-library) for end to end test assertions

**Other**

- **eslint and stylelint** as lint tools
- **Git Flow**
- **Dark Mode** with Media Query 'prefers-color-scheme: dark'
- **ion-img** to automatically add lazy load to images and render optimizations
- **Barrel files**
- **Auto deploy on Merge and preview on PR** with Github Actions
- **CodeQL** analysis
- **Husky and lint-staged** to pass lint and prettier to changed code on commit
- **Commitlint** to use [Convetional Commits](https://www.conventionalcommits.org/)

## **Anotaciones**

Estas son algunas anotaciones de las decisiones tomadas, se puede obtener más información visitando las [Issues](https://github.com/SaulMoro/ionic-login/issues?q=is%3Aissue+is%3Aclosed), [PullRequest](https://github.com/SaulMoro/ionic-login/pulls?q=is%3Apr+is%3Aclosed) o los Commits.

- Se ha dessarrollado siguiendo el sistema **Git Flow**, con Branches, Issues y Pull Requests.
- Se ha usado TailwindCSS para realizar un maquetado rápido. Se ha seguido la técnica de maquetación Mobile First. Soportado nativamente por Angular en las últimas versiones.
- El estado de la interfaz, auth y los features se manejan mediante state management (redux) con NgRx.
- Se ha realizado Unit tests, Integration tests y e2e tests de las funcionalidades y state management.
- Se ha usado para tests las herramientas de testing descritas previamente.
- Se mostrará un skeleton loader animado mientras se carga información, en lugar de los clásicos spinners.
- Una Github action que hace una preview del pull request, para ver una versión de la app antes de hacer merge con la rama main.
- Se ahorra manejo del estado, gracias al router state de ngrx.

## **Optimizaciones**

- Se ha creado una Preloading Strategy basada en roles, dónde no hará la precarga de módulos a los que el usuario no puede acceder por sus permisos.
- Se usará ion-img para hacer las imágenes lazy, no cargará las imágenes que no están en la vista actual.
- Otras mejoras: trackBy, Componentes OnPush, Intersection Observer, ...

Otras optimizaciones que se pueden realizar:

- Colocar los assets en un CDN
- Prerenderizar partes no dinámicas de la web para convertila en una aplicación Jamstack. Hice de ponente en un Webinar dónde explico como implementarlo con Angular. [Enlace al vídeo](https://www.youtube.com/watch?v=gycXzCT9UTI). [Enlace al artículo](https://enmilocalfunciona.io/jamstack-angular-desarrollo-web-parte-1/)
- (Optimización de desarrollo) Crear una arquitectura basada en monorepositorio con [Nx Workspaces](https://nx.dev/). Dispongo de varios ejemplos de proyectos con esta arquitectura.
- (Optimización de desarrollo) Usar RTK Query en un futuro para manejar el estado del servidor (recomendado por redux), que pasará a formar parte de [Redux Toolkit](https://redux-toolkit.js.org/). He creado una librería para adaptarla a poder usarla con NgRx [ngrx-rtk-query](https://www.npmjs.com/package/ngrx-rtk-query), por la cual me han felicitado los creadores/mantenedores de Redux públicamente [Mark Erikson](https://twitter.com/acemarke/status/1371811240742420482) o [Lenz Weber](https://twitter.com/phry/status/1371789843546697736).

## **Code scaffolding**

```bash
# Create Lazy Feature
> ng g module features/(nombre-feature) --module [app | parent-module-name] --route (route-name)

# Create Data-Access of a Feature (Not Shared)
> ng g module features/(nombre-feature)/data-access-(state-name) --module features/(nombre-feature-padre)
> ng g @ngrx/schematics:feature features/(nombre-feature)/data-access-(state-name)/+state/(StateName) -m features/(nombre-feature)/data-access-(state-name) --creators --api
> ng g service features/(nombre-feature)/data-access-(state-name)/services/(service-name)
> ng g interface features/(nombre-feature)/data-access-(state-name)/models/(model-name) model

# Create Shared Data-Access
> ng g module shared/data-access-(state-name) --module shared
> ng g @ngrx/schematics:feature shared/data-access-(state-name)/+state/(StateName) -m shared/data-access-(state-name) --creators --api
> ng g service shared/data-access-(state-name)/services/(service-name)
> ng g interface shared/data-access-(state-name)/models/(model-name) model

# Misc
> ng g component features/(nombre-feature)/containers/(container-name)
> ng g component features/(nombre-feature)/components/(component-name)
> ng g service features/(nombre-feature)/services/(service-name)
> ng g interface features/(nombre-feature)/models/(model-name) model
```

## Contact

**Saúl Moro Gómez**
