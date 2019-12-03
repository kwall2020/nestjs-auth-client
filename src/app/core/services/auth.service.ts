import { Injectable } from '@angular/core';
import {
  CognitoUser,
  ICognitoUserData,
  CognitoUserPool,
  ICognitoUserPoolData,
  AuthenticationDetails,
  CognitoUserSession
} from 'amazon-cognito-identity-js';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor() {}

  authenticate(username: string, password: string) {
    const userPoolData: ICognitoUserPoolData = {
      UserPoolId: 'us-east-1_8QRhH1UKX',
      ClientId: '7s4ipjgfm88hhotdbfhl7kdgb4'
    };
    const userData: ICognitoUserData = {
      Username: username,
      Pool: new CognitoUserPool(userPoolData)
    };
    const cognitoUser = new CognitoUser(userData);
    const authenticationDetails = new AuthenticationDetails({
      Username: username,
      Password: password
    });

    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: (
        session: CognitoUserSession,
        userConfirmationNecessary: boolean
      ) => console.log(session, userConfirmationNecessary),
      onFailure: err => console.log(err)
    });
  }
}
