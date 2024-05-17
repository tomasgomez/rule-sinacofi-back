// import { InternalError, ErrorCode } from '../internalError';
// import { ActionTypes } from '../actions/actionTypes';
// import { of, catchError, map, from, Observable, concatMap, queueScheduler, observeOn } from 'rxjs';

// // Payload type with any key-value pair
// type Payload = { [key: string]: any };

// // Function type that can return a payload or an InternalError
// type ActionFunction<T> = (payload: Payload) => Observable<T | InternalError>;

// // Actions type with specific action functions 
// type Actions = {
//   [key in ActionTypes]: ActionFunction<any | InternalError>; 
// };

// // Function to create an observable from an action function with error handling
// const createActionObservable = <T>(fn: ActionFunction<T>, payload: Payload) =>
//   from(fn(payload)).pipe(
//     catchError((error) => of(new InternalError(error.message, ErrorCode.INTERNAL_SERVER_ERROR )))
//   );

// // Map of action types to their corresponding pipelines
// const actionPipelines = new Map<ActionTypes, (payload: Payload) => any>();

// const pipeline = (actionType: ActionTypes, ...actionFns: ActionFunction<any | InternalError>[]): any => {
//   actionPipelines.set(actionType, (payload: Payload) => {
//     return of(payload).pipe(
//       observeOn(queueScheduler),
//       map((response: Payload) => from(actionFns).pipe(concatMap((fn) => fn(response))
//       )),
//       catchError((error) => of(error))
//     );
//   });
// }



// export { Actions, Payload, pipeline, createActionObservable };