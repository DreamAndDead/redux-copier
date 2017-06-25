(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'lodash', 'randomString'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('lodash'), require('randomString'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.lodash, global.randomString);
    global.copier = mod.exports;
  }
})(this, function (exports, _lodash, _randomString) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.copifyReducer = exports.copifyActions = undefined;

  var _randomString2 = _interopRequireDefault(_randomString);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  var _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  var DEFAULT_STATE_STORE_KEY = '@@DEFAULT_STATE';

  function generateKey() {
    return _randomString2.default.generate();
  }
  function copifyActions(actionCreators, customKey) {
    var key = generateKey();
    if (customKey) key = customKey;

    function copifyActionCreator(actionCreator) {
      return function () {
        return _extends({}, actionCreator.apply(undefined, arguments), {
          key: key
        });
      };
    }

    return {
      actionCreators: (0, _lodash.mapValues)(actionCreators, copifyActionCreator),
      // state[key] is undefined at beginning, we need to read the default value
      // once we modify own state, use own state
      // like copy on write in linux
      selector: function selector(state) {
        return state[key] || state[DEFAULT_STATE_STORE_KEY];
      }
    };
  }

  /*
   * separate different state scope using action's key
   */
  function copifyReducer(reducer) {
    return function (state, action) {
      var key = action.key;

      // MAYBE it's redux INIT action when in combineReducers, state is undefined
      // and reducer(state, action) will generate defaultState
      if (key === undefined) {
        /*
         * everytime when combineReducer is called, we receive a INIT action
         * we need the next line, or state will change to shape like
         * {
         *   DEFAULT_STATE_STORE_KEY: {
         *     DEFAULT_STATE_STORE_KEY: {
         *       DEFAULT_STATE_STORE_KEY: {
         *         ...state
         *     }
         *    }
         *   }
         */
        if (!(DEFAULT_STATE_STORE_KEY in (state || {} /* INIT action, state is undefined */))) {
          return _defineProperty({}, DEFAULT_STATE_STORE_KEY, reducer(state, action));
        }
        return state;
      }

      // when encount a key doesn't exist, init scope state for it
      if (!(key in state)) {
        state = _extends({}, state, _defineProperty({}, key, (0, _lodash.cloneDeep)(state[DEFAULT_STATE_STORE_KEY])));
      }
      return _extends({}, state, _defineProperty({}, key, reducer(state[key], action)));
    };
  }

  exports.copifyActions = copifyActions;
  exports.copifyReducer = copifyReducer;
});
