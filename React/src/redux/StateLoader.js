import { createStore } from 'redux';
import cookie from 'react-cookies';
import Statics from '../components/util/Statics';
import allReducers from './reducers';

const LOCAL_STORAGE_NAME = 'localData';

class PersistedStore {
  // Singleton property
  static DefaultStore = null;

  // Accessor to the default instance of this class
  static getDefaultStore() {
    if (PersistedStore.DefaultStore === null) {
      PersistedStore.DefaultStore = new PersistedStore();
    }

    return PersistedStore.DefaultStore;
  }

  // Redux store
  _store = null;

  // When class instance is used, initialize the store
  constructor() {
    // console.log('constructor');
    this.initStore();
  }

  // Initialization of Redux Store
  initStore() {
    const current = PersistedStore.loadState();
    //   console.log(current);
    this._store = createStore(
      allReducers,
      current,
      window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    );
    this._store.subscribe(() => {
      // console.log('subscribe');
      PersistedStore.saveState(this._store.getState());
    });
  }

  // Getter to access the Redux store
  get store() {
    try {
      if (this._store.getState().isLogged === false) {
        cookie.remove(Statics.REFRESH_TOKEN);
        cookie.remove(Statics.ACCESS_TOKEN);
      }
    } catch (e) {}

    return this._store;
  }

  // Loading persisted state from localStorage, no need to access
  // this method from the outside
  static loadState() {
    try {
      let serializedState = localStorage.getItem(LOCAL_STORAGE_NAME);
      if (serializedState === null) {
        // console.log('serializedState === null');
        const newState = PersistedStore.initialState();
        this.saveState(newState);
        return newState;
      }
      return JSON.parse(serializedState);
    } catch (err) {
      return PersistedStore.initialState();
    }
  }

  // Saving persisted state to localStorage every time something
  // changes in the Redux Store (This happens because of the subscribe()
  // in the initStore-method). No need to access this method from the outside
  static saveState(state) {
    try {
      let serializedState = JSON.stringify(state);
      localStorage.setItem(LOCAL_STORAGE_NAME, serializedState);
    } catch (err) {}
  }

  // Return whatever you want your initial state to be
  static initialState() {
    return { isLogged: false, errorText: '', addTask: null };
  }
}

export default PersistedStore;
