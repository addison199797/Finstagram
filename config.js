import Firebase from 'firebase';
export const config = {
    apiKey: "AIzaSyACXinXI871IIDQgn8mwZ6yKhsFpHuOKQg",
    authDomain: "hialice-a4627.firebaseapp.com",
    databaseURL: "https://hialice-a4627.firebaseio.com",
    projectId: "hialice-a4627",
    storageBucket: "hialice-a4627.appspot.com",
    messagingSenderId: "908328550456"
  };
  let app = Firebase.initializeApp(config);
export const db = app.database();
