// 1: if we add a service in provider of specific component {useClass = name of service} just that component and its direct descendant have access to it
// single tone!: if we want to use a shared component in the different feature and location we need to have different instance of service as well @Injectable({}). otherwise we can use @Injectable({
//  provideIn: 'root' }) with root argument
//  we have two loadingStoreService one at   the level of app and other at the level of edit-course form ; so we need to two different instance of that service because the state of app is different
// for MessageStoreService
// 1: app.module => provider: [MessageStoreService] : all application can use this instance ans set and get same thing (store)
// 1: app.component => provider: [MessageStoreService] just this component and all direct descendants; but in the course-module : in the other service we do not have acces to it but in the all compoentn of that service we have access!
// how about register in the root and if we need it for that app in other part use different different token (useClass)
// when we register a storeService in the app.module and also register that stoe in the decorator of one of the descendant(it is recognized just in this component and in its descendants and not in the parent or other modules!); in these cases the instance created in app module is used and not one created in that component!(from parent): so it is better we create a shared feature store and all application asynchave access to it and if we face similar issue (conflict between istances it is better pass variable from input!)
// we can have two instances at the same time from one service based on where we registerer the provider;
// if u want to put some reusable component into shared component in share-module, when wanto use it , use with input and output not eith shared service beacuse we wase issue regarding providers! share storeServie does not recognized
// if we wnt to have access to a service in the globar single tone service, we need to add it in the app.module provider not app component provider
// state at the level of component, module and whole component with import { Subject } from 'rxjs';
// // Single Data Obs Pattern in course Component
// opPush change detection in fully reactive component
// opPush change detection (@Input and observable in dom | async): a lot of data with a lot of expression in DOM
// with opPush angular update DOM only we push data explicitly

// Jasmine: Behavior-driven javascript
// specification and they are grouped in test suit (describe('name'), () => {});

// TEST: BDD: Jasmine-karma: fdescribe and fit (focus)
// Karma is a tool which lets us spawn browsers and run Jasmine tests inside of them all from the command line. The results of the tests are also displayed on the command line.
// ng test --no-watch

// cypress:
// 1- need UI running and also cypress running and not backend

// code coverage in testing:
// ng test --watch=false --code-coverage
// to see the report in coverage folder we need http-server to serve html filter : npm i -g http-server;
// cd ./coverage  then run: http-server -c-1 (disable all caching header) . (current folded)
// open to see http://localhost:8080/buy-and-sell/
// cypress run : not open browser and UI and we can see the result in the command line

// preparing for CI
// npm run build:prod && xx mac and linux
// independent of PS we can run command in sequence
// win => run-s
// instal npm i :     "npm-run-all": "^4.1.5" in dependencies
// "start-server-and-test": "^1.9.1", in dev-Dependencies
// start and wait to be ready for test: start-server-and-test (installed in package json)//
//  command to stat the server  : build-and-deploy:prod
// location of server http://localhost:4200

// error after npm run e2e :
// <base href="/"> =>>  <base href="./">
