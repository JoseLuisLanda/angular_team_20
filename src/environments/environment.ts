// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  serviceURL : "http://localhost:5000/apisvc/us-central1/api",
  firebaseConfig : {
    apiKey: "AIzaSyDHxlKfchpJrycT_fAOX3JjBCWp_uFlcjI",
    authDomain: "comfecoapp.firebaseapp.com",
    projectId: "comfecoapp",
    storageBucket: "comfecoapp.appspot.com",
    messagingSenderId: "402972450487",
    appId: "1:402972450487:web:9e95a13733763164be7732",
    measurementId: "G-N8CCCR0BKC"
  },
  firebase: {
    apiKey: "AIzaSyDHxlKfchpJrycT_fAOX3JjBCWp_uFlcjI",
    authDomain: "comfecoapp.firebaseapp.com",
    projectId: "comfecoapp",
    storageBucket: "comfecoapp.appspot.com",
    messagingSenderId: "402972450487",
    appId: "1:402972450487:web:9e95a13733763164be7732",
    measurementId: "G-N8CCCR0BKC"
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
