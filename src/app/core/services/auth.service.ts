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
  private userPoolData: ICognitoUserPoolData = {
    UserPoolId: 'us-east-1_8QRhH1UKX',
    ClientId: '31ti93njpc4gsuusg756ts0m2t'
  };

  authenticate(
    userName: string,
    password: string
  ): Observable<CognitoUserSession> {
    const userData: ICognitoUserData = {
      Username: userName,
      Pool: new CognitoUserPool(this.userPoolData)
    };
    const cognitoUser = new CognitoUser(userData);
    const authenticationDetails = new AuthenticationDetails({
      Username: userName,
      Password: password
    });

    return new Observable((observer: Observer<CognitoUserSession>) => {
      cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: (session: CognitoUserSession) => {
          observer.next(session);
          observer.complete();
        },
        onFailure: err => {
          observer.error(err);
          observer.complete();
        }
      });
    });
  }

  resetPassword(
    userName: string,
    confirmationCode: string,
    newPassword: string
  ) {
    const userData: ICognitoUserData = {
      Username: userName,
      Pool: new CognitoUserPool(this.userPoolData)
    };
    const cognitoUser = new CognitoUser(userData);

    return new Observable((observer: Observer<boolean>) => {
      cognitoUser.confirmPassword(confirmationCode, newPassword, {
        onSuccess: () => {
          observer.next(true);
          observer.complete();
        },
        onFailure: _err => {
          observer.error(_err);
          observer.complete();
        }
      });
    });
  }

  refresh(userName: string, refreshToken: string): Observable<any> {
    const userData: ICognitoUserData = {
      Username: userName,
      Pool: new CognitoUserPool(this.userPoolData)
    };
    const cognitoUser = new CognitoUser(userData);

    return new Observable((observer: any) => {
      cognitoUser.refreshSession(
        new CognitoRefreshToken({
          RefreshToken: refreshToken
        }),
        (err, result) => {
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
