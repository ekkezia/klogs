/* eslint-disable no-console */
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/analytics';

const firebaseConfig = {
  apiKey: 'AIzaSyABfrysLPj95nm8lMagbmJkH4XKZVQhVZw',
  authDomain: 'parallelchain-lab.firebaseapp.com',
  projectId: 'parallelchain-lab',
  storageBucket: 'parallelchain-lab.appspot.com',
  messagingSenderId: '103370676807',
  appId: '1:103370676807:web:0ce1089a1ff88f621a2f62',
  measurementId: 'G-REX4TG32BY',
};

export { firebase, firebaseConfig };
