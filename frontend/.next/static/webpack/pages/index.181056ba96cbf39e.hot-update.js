"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("pages/index",{

/***/ "./src/components/RecentAds.tsx":
/*!**************************************!*\
  !*** ./src/components/RecentAds.tsx ***!
  \**************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": function() { return /* binding */ RecentAds; }\n/* harmony export */ });\n/* harmony import */ var _swc_helpers_tagged_template_literal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @swc/helpers/_/_tagged_template_literal */ \"./node_modules/@swc/helpers/esm/_tagged_template_literal.js\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"./node_modules/react/jsx-dev-runtime.js\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _AdCard__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./AdCard */ \"./src/components/AdCard.tsx\");\n/* harmony import */ var next_navigation__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! next/navigation */ \"./node_modules/next/navigation.js\");\n/* harmony import */ var next_navigation__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(next_navigation__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _styles_RecentAds_module_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @/styles/RecentAds.module.css */ \"./src/styles/RecentAds.module.css\");\n/* harmony import */ var _styles_RecentAds_module_css__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_styles_RecentAds_module_css__WEBPACK_IMPORTED_MODULE_6__);\n/* harmony import */ var _apollo_client__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @apollo/client */ \"./node_modules/@apollo/client/index.js\");\n\nfunction _templateObject() {\n    const data = (0,_swc_helpers_tagged_template_literal__WEBPACK_IMPORTED_MODULE_0__._)([\n        \"\\n  query Ads($categoryId: FLoat, $search: String) {\\n    ads(categoryId: $categoryId, search: $search) {\\n      createdAt\\n      id\\n      price\\n      description\\n      location\\n      owner\\n      picture\\n    }\\n  }\\n\"\n    ]);\n    _templateObject = function() {\n        return data;\n    };\n    return data;\n}\n\nvar _s = $RefreshSig$();\n\n\n\n\n\nconst GET_ALL_ADS = (0,_apollo_client__WEBPACK_IMPORTED_MODULE_5__.gql)(_templateObject());\n//\nfunction RecentAds() {\n    _s();\n    const [totalPrice, setTotalPrice] = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(0);\n    const [ads, setAds] = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)([]);\n    const searchParams = (0,next_navigation__WEBPACK_IMPORTED_MODULE_4__.useSearchParams)();\n    const categoryId = searchParams.get(\"categoryId\");\n    var _search;\n    const search = searchParams.get((_search = \"search\") !== null && _search !== void 0 ? _search : \"\");\n    const { loading, error, data } = (0,_apollo_client__WEBPACK_IMPORTED_MODULE_5__.useQuery)(GET_ALL_ADS);\n    if (loading) return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)(\"p\", {\n        children: \"Loading...\"\n    }, void 0, false, {\n        fileName: \"/home/daniel/Projet/My good corner/the-good-corner/frontend/src/components/RecentAds.tsx\",\n        lineNumber: 31,\n        columnNumber: 24\n    }, this);\n    if (error) return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)(\"p\", {\n        children: \"Error !\"\n    }, void 0, false, {\n        fileName: \"/home/daniel/Projet/My good corner/the-good-corner/frontend/src/components/RecentAds.tsx\",\n        lineNumber: 32,\n        columnNumber: 22\n    }, this);\n    console.log(GET);\n    const addToTotalPrice = (price)=>{\n        setTotalPrice(totalPrice + price);\n    };\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.Fragment, {\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)(\"h2\", {\n                children: \"Annonces r\\xe9centes\"\n            }, void 0, false, {\n                fileName: \"/home/daniel/Projet/My good corner/the-good-corner/frontend/src/components/RecentAds.tsx\",\n                lineNumber: 43,\n                columnNumber: 9\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)(\"p\", {\n                children: [\n                    \"Total du panier : \",\n                    totalPrice,\n                    \" €\"\n                ]\n            }, void 0, true, {\n                fileName: \"/home/daniel/Projet/My good corner/the-good-corner/frontend/src/components/RecentAds.tsx\",\n                lineNumber: 44,\n                columnNumber: 9\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)(\"section\", {\n                className: (_styles_RecentAds_module_css__WEBPACK_IMPORTED_MODULE_6___default().recentAds),\n                children: ads.map((ad, index)=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)(\"div\", {\n                        children: [\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)(_AdCard__WEBPACK_IMPORTED_MODULE_3__.AdCard, {\n                                id: ad.id,\n                                picture: ad.picture,\n                                location: ad.location,\n                                price: ad.price,\n                                category: ad.category,\n                                title: ad.title,\n                                description: ad.description,\n                                owner: ad.owner,\n                                createdAt: ad.createdAt,\n                                setTotal: setTotalPrice,\n                                total: totalPrice\n                            }, void 0, false, {\n                                fileName: \"/home/daniel/Projet/My good corner/the-good-corner/frontend/src/components/RecentAds.tsx\",\n                                lineNumber: 48,\n                                columnNumber: 15\n                            }, this),\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)(\"button\", {\n                                className: \"button\",\n                                onClick: ()=>addToTotalPrice(ad.price),\n                                children: \"Add price to total\"\n                            }, void 0, false, {\n                                fileName: \"/home/daniel/Projet/My good corner/the-good-corner/frontend/src/components/RecentAds.tsx\",\n                                lineNumber: 61,\n                                columnNumber: 15\n                            }, this)\n                        ]\n                    }, index, true, {\n                        fileName: \"/home/daniel/Projet/My good corner/the-good-corner/frontend/src/components/RecentAds.tsx\",\n                        lineNumber: 47,\n                        columnNumber: 13\n                    }, this))\n            }, void 0, false, {\n                fileName: \"/home/daniel/Projet/My good corner/the-good-corner/frontend/src/components/RecentAds.tsx\",\n                lineNumber: 45,\n                columnNumber: 9\n            }, this)\n        ]\n    }, void 0, true);\n}\n_s(RecentAds, \"zqLChk6/keSfk7WBRLipfpd3jus=\", false, function() {\n    return [\n        next_navigation__WEBPACK_IMPORTED_MODULE_4__.useSearchParams,\n        _apollo_client__WEBPACK_IMPORTED_MODULE_5__.useQuery\n    ];\n});\n_c = RecentAds;\nvar _c;\n$RefreshReg$(_c, \"RecentAds\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports on update so we can compare the boundary\n                // signatures.\n                module.hot.dispose(function (data) {\n                    data.prevExports = currentExports;\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevExports !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevExports !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvY29tcG9uZW50cy9SZWNlbnRBZHMudHN4IiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUE0QztBQUNWO0FBRWdCO0FBQ0M7QUFDSjtBQUUvQyxNQUFNTSxjQUFjRixtREFBR0E7QUFhdkIsRUFBRTtBQUNhLFNBQVNHOztJQUN0QixNQUFNLENBQUNDLFlBQVlDLGNBQWMsR0FBR1QsK0NBQVFBLENBQVM7SUFDckQsTUFBTSxDQUFDVSxLQUFLQyxPQUFPLEdBQUdYLCtDQUFRQSxDQUFlLEVBQUU7SUFDL0MsTUFBTVksZUFBZVYsZ0VBQWVBO0lBQ3BDLE1BQU1XLGFBQWFELGFBQWFFLEdBQUcsQ0FBQztRQUNKO0lBQWhDLE1BQU1DLFNBQVNILGFBQWFFLEdBQUcsQ0FBQyxnRUFBWTtJQUM1QyxNQUFNLEVBQUVFLE9BQU8sRUFBRUMsS0FBSyxFQUFFQyxJQUFJLEVBQUUsR0FBR2Isd0RBQVFBLENBQUNDO0lBRzFDLElBQUlVLFNBQVUscUJBQU8sOERBQUNHO2tCQUFFOzs7Ozs7SUFDeEIsSUFBSUYsT0FBUSxxQkFBTyw4REFBQ0U7a0JBQUU7Ozs7OztJQUV0QkMsUUFBUUMsR0FBRyxDQUFDQztJQUdaLE1BQU1DLGtCQUFrQixDQUFDQztRQUN2QmYsY0FBY0QsYUFBYWdCO0lBQzdCO0lBRUUscUJBQ0U7OzBCQUNFLDhEQUFDQzswQkFBRzs7Ozs7OzBCQUNKLDhEQUFDTjs7b0JBQUU7b0JBQW1CWDtvQkFBVzs7Ozs7OzswQkFDakMsOERBQUNrQjtnQkFBUUMsV0FBV3hCLCtFQUFnQjswQkFDakNPLElBQUltQixHQUFHLENBQUMsQ0FBQ0MsSUFBSUMsc0JBQ1osOERBQUNDOzswQ0FDQyw4REFBQy9CLDJDQUFNQTtnQ0FDTGdDLElBQUlILEdBQUdHLEVBQUU7Z0NBQ1RDLFNBQVNKLEdBQUdJLE9BQU87Z0NBQ25CQyxVQUFVTCxHQUFHSyxRQUFRO2dDQUNyQlgsT0FBT00sR0FBR04sS0FBSztnQ0FDZlksVUFBVU4sR0FBR00sUUFBUTtnQ0FDckJDLE9BQU9QLEdBQUdPLEtBQUs7Z0NBQ2ZDLGFBQWFSLEdBQUdRLFdBQVc7Z0NBQzNCQyxPQUFPVCxHQUFHUyxLQUFLO2dDQUNmQyxXQUFXVixHQUFHVSxTQUFTO2dDQUN2QkMsVUFBVWhDO2dDQUNWaUMsT0FBT2xDOzs7Ozs7MENBRVQsOERBQUNtQztnQ0FBT2hCLFdBQVU7Z0NBQVNpQixTQUFTLElBQU1yQixnQkFBZ0JPLEdBQUdOLEtBQUs7MENBQUc7Ozs7Ozs7dUJBZDdETzs7Ozs7Ozs7Ozs7O0FBb0JwQjtHQTdDc0J4Qjs7UUFHREwsNERBQWVBO1FBR0hHLG9EQUFRQTs7O0tBTm5CRSIsInNvdXJjZXMiOlsid2VicGFjazovL19OX0UvLi9zcmMvY29tcG9uZW50cy9SZWNlbnRBZHMudHN4PzViYTMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgdXNlU3RhdGUsIHVzZUVmZmVjdCB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgQWRDYXJkIH0gZnJvbSBcIi4vQWRDYXJkXCI7XG5pbXBvcnQgeyBBZENhcmRUeXBlIH0gZnJvbSBcIkAvdHlwZXMvYWRzLnR5cGVcIjtcbmltcG9ydCB7IHVzZVNlYXJjaFBhcmFtcyB9IGZyb20gXCJuZXh0L25hdmlnYXRpb25cIjtcbmltcG9ydCBzdHlsZXMgZnJvbSBcIkAvc3R5bGVzL1JlY2VudEFkcy5tb2R1bGUuY3NzXCI7XG5pbXBvcnQgeyBncWwsIHVzZVF1ZXJ5IH0gZnJvbSBcIkBhcG9sbG8vY2xpZW50XCI7XG5cbmNvbnN0IEdFVF9BTExfQURTID0gZ3FsYFxuICBxdWVyeSBBZHMoJGNhdGVnb3J5SWQ6IEZMb2F0LCAkc2VhcmNoOiBTdHJpbmcpIHtcbiAgICBhZHMoY2F0ZWdvcnlJZDogJGNhdGVnb3J5SWQsIHNlYXJjaDogJHNlYXJjaCkge1xuICAgICAgY3JlYXRlZEF0XG4gICAgICBpZFxuICAgICAgcHJpY2VcbiAgICAgIGRlc2NyaXB0aW9uXG4gICAgICBsb2NhdGlvblxuICAgICAgb3duZXJcbiAgICAgIHBpY3R1cmVcbiAgICB9XG4gIH1cbmA7XG4vL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gUmVjZW50QWRzKCkge1xuICBjb25zdCBbdG90YWxQcmljZSwgc2V0VG90YWxQcmljZV0gPSB1c2VTdGF0ZTxudW1iZXI+KDApO1xuICBjb25zdCBbYWRzLCBzZXRBZHNdID0gdXNlU3RhdGU8QWRDYXJkVHlwZVtdPihbXSk7XG4gIGNvbnN0IHNlYXJjaFBhcmFtcyA9IHVzZVNlYXJjaFBhcmFtcygpO1xuICBjb25zdCBjYXRlZ29yeUlkID0gc2VhcmNoUGFyYW1zLmdldChcImNhdGVnb3J5SWRcIik7XG4gIGNvbnN0IHNlYXJjaCA9IHNlYXJjaFBhcmFtcy5nZXQoXCJzZWFyY2hcIiA/PyBcIlwiKTtcbiAgY29uc3QgeyBsb2FkaW5nLCBlcnJvciwgZGF0YSB9ID0gdXNlUXVlcnkoR0VUX0FMTF9BRFMpO1xuXG4gIFxuICBpZiAobG9hZGluZyApIHJldHVybiA8cD5Mb2FkaW5nLi4uPC9wPjtcbiAgaWYgKGVycm9yICkgcmV0dXJuIDxwPkVycm9yICE8L3A+O1xuXG4gIGNvbnNvbGUubG9nKEdFVCk7XG5cblxuICBjb25zdCBhZGRUb1RvdGFsUHJpY2UgPSAocHJpY2U6IG51bWJlcikgPT4ge1xuICAgIHNldFRvdGFsUHJpY2UodG90YWxQcmljZSArIHByaWNlKVxuICB9XG5cbiAgICByZXR1cm4gKFxuICAgICAgPD5cbiAgICAgICAgPGgyPkFubm9uY2VzIHLDqWNlbnRlczwvaDI+XG4gICAgICAgIDxwPlRvdGFsIGR1IHBhbmllciA6IHt0b3RhbFByaWNlfSDigqw8L3A+XG4gICAgICAgIDxzZWN0aW9uIGNsYXNzTmFtZT17c3R5bGVzLnJlY2VudEFkc30+XG4gICAgICAgICAge2Fkcy5tYXAoKGFkLCBpbmRleCkgPT4gKFxuICAgICAgICAgICAgPGRpdiBrZXk9e2luZGV4fT5cbiAgICAgICAgICAgICAgPEFkQ2FyZFxuICAgICAgICAgICAgICAgIGlkPXthZC5pZH1cbiAgICAgICAgICAgICAgICBwaWN0dXJlPXthZC5waWN0dXJlfVxuICAgICAgICAgICAgICAgIGxvY2F0aW9uPXthZC5sb2NhdGlvbn1cbiAgICAgICAgICAgICAgICBwcmljZT17YWQucHJpY2V9XG4gICAgICAgICAgICAgICAgY2F0ZWdvcnk9e2FkLmNhdGVnb3J5fVxuICAgICAgICAgICAgICAgIHRpdGxlPXthZC50aXRsZX1cbiAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbj17YWQuZGVzY3JpcHRpb259XG4gICAgICAgICAgICAgICAgb3duZXI9e2FkLm93bmVyfVxuICAgICAgICAgICAgICAgIGNyZWF0ZWRBdD17YWQuY3JlYXRlZEF0fVxuICAgICAgICAgICAgICAgIHNldFRvdGFsPXtzZXRUb3RhbFByaWNlfVxuICAgICAgICAgICAgICAgIHRvdGFsPXt0b3RhbFByaWNlfVxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cImJ1dHRvblwiIG9uQ2xpY2s9eygpID0+IGFkZFRvVG90YWxQcmljZShhZC5wcmljZSl9PkFkZCBwcmljZSB0byB0b3RhbDwvYnV0dG9uPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgKSl9XG4gICAgICAgIDwvc2VjdGlvbj5cbiAgICAgIDwvPlxuICAgICk7XG4gIH1cblxuIl0sIm5hbWVzIjpbInVzZVN0YXRlIiwiQWRDYXJkIiwidXNlU2VhcmNoUGFyYW1zIiwic3R5bGVzIiwiZ3FsIiwidXNlUXVlcnkiLCJHRVRfQUxMX0FEUyIsIlJlY2VudEFkcyIsInRvdGFsUHJpY2UiLCJzZXRUb3RhbFByaWNlIiwiYWRzIiwic2V0QWRzIiwic2VhcmNoUGFyYW1zIiwiY2F0ZWdvcnlJZCIsImdldCIsInNlYXJjaCIsImxvYWRpbmciLCJlcnJvciIsImRhdGEiLCJwIiwiY29uc29sZSIsImxvZyIsIkdFVCIsImFkZFRvVG90YWxQcmljZSIsInByaWNlIiwiaDIiLCJzZWN0aW9uIiwiY2xhc3NOYW1lIiwicmVjZW50QWRzIiwibWFwIiwiYWQiLCJpbmRleCIsImRpdiIsImlkIiwicGljdHVyZSIsImxvY2F0aW9uIiwiY2F0ZWdvcnkiLCJ0aXRsZSIsImRlc2NyaXB0aW9uIiwib3duZXIiLCJjcmVhdGVkQXQiLCJzZXRUb3RhbCIsInRvdGFsIiwiYnV0dG9uIiwib25DbGljayJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/components/RecentAds.tsx\n"));

/***/ })

});