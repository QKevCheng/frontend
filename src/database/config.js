import * as firebase from "firebase";

// Initialize Firebase
const config = {
  apiKey: "AIzaSyDqshlzqz65hd51mRelSYdmZNcvQ1WrTQg",
  authDomain: "test-e285e.firebaseapp.com",
  databaseURL: "https://test-e285e.firebaseio.com",
  projectId: "test-e285e",
  storageBucket: "test-e285e.appspot.com",
  messagingSenderId: "71945885230"
};
firebase.initializeApp(config)

const database = firebase.database();

export default database;