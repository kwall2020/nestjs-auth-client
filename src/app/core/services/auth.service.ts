import { Injectable } from '@angular/core';
import {
  AuthenticationDetails,
  CognitoRefreshToken,
  CognitoUser,
  CognitoUserPool,
  CognitoUserSession,
  ICognitoUserData,
  ICognitoUserPoolData
} from 'amazon-cognito-identity-js';
import { Observable, Observer } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor() {}

  authenticate(
    userName: string,
    password: string
  ): Observable<CognitoUserSession> {
    const userPoolData: ICognitoUserPoolData = {
      UserPoolId: 'us-east-1_8QRhH1UKX',
      ClientId: '31ti93njpc4gsuusg756ts0m2t'
    };
    const userData: ICognitoUserData = {
      Username: userName,
      Pool: new CognitoUserPool(userPoolData)
    };
    const cognitoUser = new CognitoUser(userData);
    const authenticationDetails = new AuthenticationDetails({
      Username: userName,
      Password: password
    });

    return new Observable((observer: Observer<CognitoUserSession>) => {
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
              onFailure: (err: any) => console.error(err)
            }
          );
        },
        onSuccess: (session: CognitoUserSession) => {
          observer.next(session);
          observer.complete();
        },
        onFailure: err => {
          console.error(err);
          observer.error(err);
          observer.complete();
        }
      });
    });
  }

  refresh(userName: string, refreshToken: string): Observable<any> {
    const userPoolData: ICognitoUserPoolData = {
      UserPoolId: 'us-east-1_8QRhH1UKX',
      ClientId: '31ti93njpc4gsuusg756ts0m2t'
    };
    const userData: ICognitoUserData = {
      Username: userName,
      Pool: new CognitoUserPool(userPoolData)
    };
    const cognitoUser = new CognitoUser(userData);

    return new Observable((observer: any) => {
      cognitoUser.refreshSession(
        new CognitoRefreshToken({
          RefreshToken: refreshToken
        }),
        (err, result) => {
          console.error(err);
          console.log(result);

          if (err) {
            observer.error(err);
          }
          if (result) {
            observer.next(result);
          }
          observer.complete();
        }
      );
    });
  }
}
