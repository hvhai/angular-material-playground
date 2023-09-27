# AngularMaterialPlayground

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.2.3.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

## Command list

```shell
# upgrade angular version
npx npm-check-updates --upgrade --target "minor" --filter "/@angular.*/"

# create home page
ng g c features/Home --standalone

# add angular material
ng add @angular/material

# add dependency
npm install -D dotenv td-node

# create callback component
ng g component features/callback --standalone --skip-tests --style=none

ng g component shared/components/buttons/login-button --standalone --inline-template --skip-tests --style=none --flat --export
ng g component shared/components/buttons/signup-button --standalone --inline-template --skip-tests --style=none --flat --export
ng g component shared/components/buttons/logout-button --standalone --inline-template --skip-tests --style=none --flat --export
ng g component shared/components/navigation/nav-bar-button --standalone --skip-tests --style=none --flat --export
```
