function onOpen() {
}
function addSheet() {
}
function deleteSheet() {
}
function setActiveSheet() {
}
function getSheetsData() {
}
function doGet() {
}
function getActiveUserEmail() {
}!function(e, a) {
    for (var i in a) e[i] = a[i];
}(this, function(modules) {
    var installedModules = {};
    function __webpack_require__(moduleId) {
        if (installedModules[moduleId]) return installedModules[moduleId].exports;
        var module = installedModules[moduleId] = {
            i: moduleId,
            l: !1,
            exports: {}
        };
        return modules[moduleId].call(module.exports, module, module.exports, __webpack_require__), 
        module.l = !0, module.exports;
    }
    return __webpack_require__.m = modules, __webpack_require__.c = installedModules, 
    __webpack_require__.d = function(exports, name, getter) {
        __webpack_require__.o(exports, name) || Object.defineProperty(exports, name, {
            enumerable: !0,
            get: getter
        });
    }, __webpack_require__.r = function(exports) {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(exports, Symbol.toStringTag, {
            value: "Module"
        }), Object.defineProperty(exports, "__esModule", {
            value: !0
        });
    }, __webpack_require__.t = function(value, mode) {
        if (1 & mode && (value = __webpack_require__(value)), 8 & mode) return value;
        if (4 & mode && "object" == typeof value && value && value.__esModule) return value;
        var ns = Object.create(null);
        if (__webpack_require__.r(ns), Object.defineProperty(ns, "default", {
            enumerable: !0,
            value: value
        }), 2 & mode && "string" != typeof value) for (var key in value) __webpack_require__.d(ns, key, function(key) {
            return value[key];
        }.bind(null, key));
        return ns;
    }, __webpack_require__.n = function(module) {
        var getter = module && module.__esModule ? function() {
            return module["default"];
        } : function() {
            return module;
        };
        return __webpack_require__.d(getter, "a", getter), getter;
    }, __webpack_require__.o = function(object, property) {
        return Object.prototype.hasOwnProperty.call(object, property);
    }, __webpack_require__.p = "", __webpack_require__(__webpack_require__.s = 4);
}([ function(module, __webpack_exports__, __webpack_require__) {
    "use strict";
    __webpack_require__.d(__webpack_exports__, "c", (function() {
        return sheets_getSheetsData;
    })), __webpack_require__.d(__webpack_exports__, "a", (function() {
        return addSheet;
    })), __webpack_require__.d(__webpack_exports__, "b", (function() {
        return deleteSheet;
    })), __webpack_require__.d(__webpack_exports__, "d", (function() {
        return setActiveSheet;
    }));
    var sheetData_sheetData = {
        masterSheetId: "1iAySI5XDUJkJ0wqwVacIZeHpRKxV_06gUteNMEBXduI",
        sheetNames: {
            users: "users"
        }
    };
    function _defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || !1, descriptor.configurable = !0, 
            "value" in descriptor && (descriptor.writable = !0), Object.defineProperty(target, descriptor.key, descriptor);
        }
    }
    var SpreadsheetManager = function() {
        function SpreadsheetManager(wb, sheetName) {
            !function(instance, Constructor) {
                if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
            }(this, SpreadsheetManager), this.wb = wb, this.sheet = this.wb.getSheetByName(sheetName), 
            this.values = this.getSheetValues(), this.rowHeaders = this.getRowHeaders(this.values[0]);
        }
        var Constructor, protoProps, staticProps;
        return Constructor = SpreadsheetManager, (protoProps = [ {
            key: "getRowHeaders",
            value: function(topRow) {
                for (var obj = {}, c = 0; c < topRow.length; c++) obj[topRow[c]] = c;
                return obj;
            }
        }, {
            key: "getSheetValues",
            value: function() {
                return this.sheet.getDataRange().getValues();
            }
        }, {
            key: "getValuesInColumn",
            value: function(headerName) {
                var valuesOnly = arguments.length > 1 && arguments[1] !== undefined && arguments[1], values = this.values, rowHeaders = this.rowHeaders;
                if (rowHeaders.hasOwnProperty(headerName)) {
                    var columnIndex = rowHeaders[headerName];
                    return values.slice(1).map((function(row) {
                        return valuesOnly ? row[columnIndex] : [ row[columnIndex] ];
                    }));
                }
                return Logger.log("".concat(headerName, " not found in row headers")), !1;
            }
        }, {
            key: "pasteValuesToColumn",
            value: function(headerName, columnArray) {
                var sheet = this.sheet, rowHeaders = this.rowHeaders;
                if (!rowHeaders.hasOwnProperty(headerName)) return Logger.log("".concat(headerName, " not found in row headers")), 
                !1;
                var columnIndex = rowHeaders[headerName], pasteRange = sheet.getRange(2, columnIndex + 1, columnArray.length, 1);
                pasteRange.getA1Notation(), pasteRange.setValues(columnArray);
            }
        }, {
            key: "updateAllValues",
            value: function() {
                sheet.getRange(1, 1, values.length, values[0].length).setValues(values);
            }
        } ]) && _defineProperties(Constructor.prototype, protoProps), staticProps && _defineProperties(Constructor, staticProps), 
        SpreadsheetManager;
    }(), sheets_getSheetsData = function() {
        var master = SpreadsheetApp.openById(sheetData_sheetData.masterSheetId);
        Logger.log(sheetData_sheetData.masterSheetId), Logger.log(master.getName());
        var obj = {
            master: master,
            sheets: {}
        };
        for (var name in sheetData_sheetData.sheetNames) obj.sheets[name] = new SpreadsheetManager(master, name);
        return obj;
    }, addSheet = function(sheetTitle) {
        return SpreadsheetApp.getActive().insertSheet(sheetTitle), sheets_getSheetsData();
    }, deleteSheet = function(sheetIndex) {
        var sheets = SpreadsheetApp.getActive().getSheets();
        return SpreadsheetApp.getActive().deleteSheet(sheets[sheetIndex]), sheets_getSheetsData();
    }, setActiveSheet = function(sheetName) {
        return SpreadsheetApp.getActive().getSheetByName(sheetName).activate(), sheets_getSheetsData();
    };
}, function(module, __webpack_exports__, __webpack_require__) {
    "use strict";
    __webpack_require__.d(__webpack_exports__, "a", (function() {
        return onOpen;
    }));
    var onOpen = function() {
        SpreadsheetApp.getUi().createMenu("Webapp").addItem("Sheet Name Editor", "openDialog").addItem("About me", "openAboutSidebar").addToUi();
    };
}, function(module, __webpack_exports__, __webpack_require__) {
    "use strict";
    __webpack_require__.d(__webpack_exports__, "a", (function() {
        return doGet;
    }));
    var doGet = function(e) {
        return HtmlService.createHtmlOutputFromFile("main");
    };
}, function(module, __webpack_exports__, __webpack_require__) {
    "use strict";
    __webpack_require__.d(__webpack_exports__, "a", (function() {
        return getActiveUserEmail;
    }));
    var getActiveUserEmail = function() {
        return Session.getActiveUser().getEmail();
    };
}, function(module, __webpack_exports__, __webpack_require__) {
    "use strict";
    __webpack_require__.r(__webpack_exports__), function(global) {
        var _ui__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1), _sheets__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(0), _routes__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(2), _user__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(3);
        global.onOpen = _ui__WEBPACK_IMPORTED_MODULE_0__["a"], global.addSheet = _sheets__WEBPACK_IMPORTED_MODULE_1__["a"], 
        global.deleteSheet = _sheets__WEBPACK_IMPORTED_MODULE_1__["b"], global.setActiveSheet = _sheets__WEBPACK_IMPORTED_MODULE_1__["d"], 
        global.getSheetsData = _sheets__WEBPACK_IMPORTED_MODULE_1__["c"], global.doGet = _routes__WEBPACK_IMPORTED_MODULE_2__["a"], 
        global.getActiveUserEmail = _user__WEBPACK_IMPORTED_MODULE_3__["a"];
    }.call(this, __webpack_require__(5));
}, function(module, exports) {
    var g;
    g = function() {
        return this;
    }();
    try {
        g = g || new Function("return this")();
    } catch (e) {
        "object" == typeof window && (g = window);
    }
    module.exports = g;
} ]));