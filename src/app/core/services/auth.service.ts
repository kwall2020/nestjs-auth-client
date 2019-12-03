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
      ClientId: '31ti93njpc4gsuusg756ts0m2t'
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
      newPasswordRequired: (userAttributes: any, requiredAttributes: any) => {
        console.log(
          'new password required',
          userAttributes,
          requiredAttributes
        );
        cognitoUser.completeNewPasswordChallenge(
          '9lS*8Wbl^z0N*Ugn',
          requiredAttributes,
          {
            onSuccess: (session: CognitoUserSession) => console.log(session),
            onFailure: (err: any) => console.log(err)
          }
        );
      },
      onSuccess: (
        session: CognitoUserSession,
        userConfirmationNecessary: boolean
      ) => console.log(session, userConfirmationNecessary),
      onFailure: err => console.log(err)
    });
  }
}
