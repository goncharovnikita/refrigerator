import { HttpService } from "./http-service";

import { ReplaySubject, Observable, of } from "rxjs";
import User from "../models/user";
import FirebaseService, { Auth, AuthProvider, GoogleAuthProvider } from "./firebase";

export default class UserService {
  private fireAuth: Auth;

  constructor(
    private http: HttpService,
    private firebaseService: FirebaseService
  ) {
    this.fireAuth = firebaseService.getAuth();
    this._init();
  }

  private _authenticated = new ReplaySubject<boolean>(1);
  private _user = new ReplaySubject<User | null>(1);

  getAuthenticated(): Observable<boolean> {
    return this._authenticated;
  }

  getUser(): Observable<User | null> {
    return this._user;
  }

  login(providerType: 'google' = 'google') {
    const provider = this._getProvider(providerType);

    this.fireAuth.signInWithPopup(provider)
      .then(() => {})
      .catch((err) => {
        console.error(err);
      })

  }

  logout = () => {
    this.fireAuth.signOut()
      .then(() => {})
      .catch((err) => console.error(err))
  }

  private _getProvider(provider: 'google'): AuthProvider {
    switch (provider) {
      case 'google':
        return new GoogleAuthProvider();
      default:
        throw new Error('unsupported provider ' + provider)
    }
  }

  private _init() {
    this.fireAuth.onAuthStateChanged(user => {
      this._user.next(user);
      this._authenticated.next(Boolean(user));
    })
  }
}
