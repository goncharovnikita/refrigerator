import firebase from 'firebase/app';

import { AppConfig } from '../config';

import 'firebase/auth';
import 'firebase/database';

export type Auth = firebase.auth.Auth;
export type AuthProvider = firebase.auth.AuthProvider;
export type Database = firebase.database.Database;
export type DBReference = firebase.database.Reference;
export const GoogleAuthProvider = firebase.auth.GoogleAuthProvider;

export default class FirebaseService {
  private app: firebase.app.App;

  constructor() {
    this.app = firebase.initializeApp(AppConfig.firebaseConfig);
  }

  getAuth(): firebase.auth.Auth {
    return this.app.auth();
  }

  getDatabase(): Database {
    return this.app.database();
  }

  getDbRef(path: string, db: Database): DBReference {
    return db.ref(path);
  }
}
