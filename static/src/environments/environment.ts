// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyCUZifOVn61-MQ3e_0EK95TOqM30JGbyUU',
    authDomain: 'meetview.firebaseapp.com',
    databaseURL: 'https://meetview.firebaseio.com',
    projectId: 'meetview',
    storageBucket: 'meetview.appspot.com',
    messagingSenderId: '817538782176'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
