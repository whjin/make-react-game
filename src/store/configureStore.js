import {fromJS} from 'immutable';
import {
    createStore,
    applyMiddleware,
    compose
} from 'redux';
import createReducer from './reducers';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {createEpicMiddleware, combineEpics} from 'redux-observable';
import initialEpics from './epics';

export default function configureStore(initialState = {}, history) {
    const epic$ = new BehaviorSubject(combineEpics(...initialEpics));
    const rootEpic = (action$, store, deps) =>
        epic$.mergeMap(epic =>
            epic(action$, store, deps).catch((err, source$) => {
                setTimeout(() => {
                    throw err;
                }, 0);
                return source$;
            }),
        );
    const epicMiddleware = createEpicMiddleware();

    const middlewares = [
        epicMiddleware,
    ];

    const enhancers = [applyMiddleware(...middlewares)];

    const composeEnhancers =
        process.env.NODE_ENV !== 'production' &&
        typeof window === 'object' &&
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
            ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
                shouldHotReload: false,
            })
            : compose;

    const store = createStore(
        createReducer(),
        fromJS(initialState),
        composeEnhancers(...enhancers)
    );

    epicMiddleware.run(rootEpic);

    return store;
}
