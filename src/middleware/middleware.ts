export interface Middleware<State = any> {
  use(state: State, next: () => void): any;
}
