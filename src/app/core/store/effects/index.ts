import { AppEffects } from './app.effects';
import { AuthEffects } from './auth.effects';

export const effects: any[] = [AuthEffects, AppEffects];

export * from './auth.effects';
export * from './app.effects';
