function onOpen() {
}
function updateAllValues() {
}
function getSheetsData() {
}
function getSheetsDataByUser() {
}
function updateUserSheet() {
}
function addRowToSheet() {
}
function deleteRowById() {
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
        return sheets_addRowToSheet;
    })), __webpack_require__.d(__webpack_exports__, "b", (function() {
        return sheets_deleteRowById;
    })), __webpack_require__.d(__webpack_exports__, "d", (function() {
        return getSheetsDataByUser;
    })), __webpack_require__.d(__webpack_exports__, "e", (function() {
        return updateAllValues;
    })), __webpack_require__.d(__webpack_exports__, "f", (function() {
        return sheets_updateUserSheet;
    }));
    var sheetData_sheetData = {
        masterSheetId: "1iAySI5XDUJkJ0wqwVacIZeHpRKxV_06gUteNMEBXduI",
        sheetNames: {
            users: "users",
            meals: "meals",
            pm_checklist: "pm_checklist",
            am_checklist: "am_checklist",
            initial_setup: "initial_setup",
            macrochart: "macrochart"
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
        } ]) && _defineProperties(Constructor.prototype, protoProps), staticProps && _defineProperties(Constructor, staticProps), 
        SpreadsheetManager;
    }();
    function _slicedToArray(arr, i) {
        return function(arr) {
            if (Array.isArray(arr)) return arr;
        }(arr) || function(arr, i) {
            if ("undefined" == typeof Symbol || !(Symbol.iterator in Object(arr))) return;
            var _arr = [], _n = !0, _d = !1, _e = undefined;
            try {
                for (var _s, _i = arr[Symbol.iterator](); !(_n = (_s = _i.next()).done) && (_arr.push(_s.value), 
                !i || _arr.length !== i); _n = !0) ;
            } catch (err) {
                _d = !0, _e = err;
            } finally {
                try {
                    _n || null == _i["return"] || _i["return"]();
                } finally {
                    if (_d) throw _e;
                }
            }
            return _arr;
        }(arr, i) || function(o, minLen) {
            if (!o) return;
            if ("string" == typeof o) return _arrayLikeToArray(o, minLen);
            var n = Object.prototype.toString.call(o).slice(8, -1);
            "Object" === n && o.constructor && (n = o.constructor.name);
            if ("Map" === n || "Set" === n) return Array.from(o);
            if ("Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
        }(arr, i) || function() {
            throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
        }();
    }
    function _arrayLikeToArray(arr, len) {
        (null == len || len > arr.length) && (len = arr.length);
        for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
        return arr2;
    }
    var sheets_getMasterSheet = function() {
        return SpreadsheetApp.openById(sheetData_sheetData.masterSheetId);
    }, sheets_getSheetsData = function(sheetName) {
        var master = sheets_getMasterSheet();
        Logger.log("getSheetsData", sheetName);
        var ssm = new SpreadsheetManager(master, sheetName), returnObject = {
            values: ssm.values,
            rowHeaders: ssm.rowHeaders,
            name: sheetName
        };
        return Logger.log(returnObject), returnObject;
    }, sheets_addRowToSheet = function(sheetName, rowObject) {
        var master = sheets_getMasterSheet(), ssm = new SpreadsheetManager(master, sheetName), values = ssm.values, rowHeaders = ssm.rowHeaders, sheet = ssm.sheet, newRow = [];
        for (var header in rowHeaders) {
            newRow[rowHeaders[header]] = rowObject[header] || "";
        }
        return values.push(newRow), sheet.getRange(1, 1, values.length, values[0].length).setValues(values), 
        newRow;
    }, sheets_deleteRowById = function(sheetName, id) {
        var master = sheets_getMasterSheet(), ssm = new SpreadsheetManager(master, sheetName);
        Logger.log("deleteRowById", ssm);
        var values = ssm.values, rowHeaders = ssm.rowHeaders, sheet = ssm.sheet;
        values.some((function(row, index) {
            var rowId = row[rowHeaders["id"]];
            if (Logger.log(rowId), id == rowId) return sheet.getDataRange().clearContent(), 
            values.splice(index, 1), sheet.getRange(1, 1, values.length, values[0].length).setValues(values), 
            !0;
        }));
    }, getSheetsDataByUser = function(sheetName, email) {
        var sheet = sheets_getSheetsData(sheetName);
        Logger.log("getSheetsDataByUser", sheet);
        var values = sheet.values, rowHeaders = sheet.rowHeaders, returnObject = {
            values: values.filter((function(row, i) {
                return row[rowHeaders["email"]] === email;
            })),
            rowHeaders: rowHeaders,
            name: sheetName
        };
        return Logger.log(sheetName + "getSheetsDataByUser returns", JSON.stringify(returnObject)), 
        returnObject;
    }, updateAllValues = function(ssm) {
        var sheet = sheets_getMasterSheet().getSheetByName(ssm.name), values = ssm.values;
        sheet.getRange(1, 1, values.length, values[0].length).setValues(values);
    }, sheets_updateUserSheet = function(user) {
        var master = sheets_getMasterSheet();
        Logger.log("updateUserSheet", user);
        var ssm = new SpreadsheetManager(master, "users"), values = ssm.values, rowHeaders = ssm.rowHeaders, sheet = ssm.sheet;
        return values.forEach((function(row) {
            var sheetEmail = row[rowHeaders["email"]];
            Logger.log("sheetEmail", sheetEmail), sheetEmail === user.email && (Object.entries(user).forEach((function(_ref) {
                var _ref2 = _slicedToArray(_ref, 2), key = _ref2[0], value = _ref2[1];
                Logger.log(value, key), row[rowHeaders[key]] = value;
            })), !0);
        })), Logger.log(values), sheet.getRange(1, 1, values.length, values[0].length).setValues(values), 
        "user updated successfully";
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
        var html = HtmlService.createHtmlOutputFromFile("main");
        return html.addMetaTag("viewport", "width=device-width, initial-scale=1"), html;
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
        global.onOpen = _ui__WEBPACK_IMPORTED_MODULE_0__["a"], global.updateAllValues = _sheets__WEBPACK_IMPORTED_MODULE_1__["e"], 
        global.getSheetsData = _sheets__WEBPACK_IMPORTED_MODULE_1__["c"], global.getSheetsDataByUser = _sheets__WEBPACK_IMPORTED_MODULE_1__["d"], 
        global.updateUserSheet = _sheets__WEBPACK_IMPORTED_MODULE_1__["f"], global.addRowToSheet = _sheets__WEBPACK_IMPORTED_MODULE_1__["a"], 
        global.deleteRowById = _sheets__WEBPACK_IMPORTED_MODULE_1__["b"], global.doGet = _routes__WEBPACK_IMPORTED_MODULE_2__["a"], 
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