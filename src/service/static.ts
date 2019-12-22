import { HttpService } from "./http-service";
import UserService from "./user-service";
import FirebaseService from "./firebase";
import RefrigeratorsService from "./refrigerators-service";

const httpService = new HttpService();
const firebaseService = new FirebaseService();
export const userService = new UserService(httpService, firebaseService);
export const refrigeratorsService = new RefrigeratorsService(
  httpService,
  firebaseService
);
