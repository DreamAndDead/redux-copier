(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(["exports"], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports);
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports);
        global.copier = mod.exports;
    }
})(this, function (exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    function copifyActionCreator(actionCreator) {
        return actionCreator;
    }

    function copifyReducer(reducer) {
        return reducer;
    }

    exports.copifyActionCreator = copifyActionCreator;
    exports.copifyReducer = copifyReducer;
});
