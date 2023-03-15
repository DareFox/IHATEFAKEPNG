/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/websites/google.ts":
/*!********************************!*\
  !*** ./src/websites/google.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "GoogleUrlConverter": () => (/* binding */ GoogleUrlConverter)
/* harmony export */ });
const GoogleUrlConverter = {
    name: "Google",
    isUrlValid: function (url) {
        return isGoogle(url) &&
            isSearchingImages(url) &&
            isUserSearchingTransparent(url) &&
            !isGoogleSearchSetToTransparent(url);
    },
    convertURL: function (url) {
        const newUrlParams = new URLSearchParams(url.search);
        newUrlParams.set("tbs", "ic:trans");
        return new URL(`${url.origin}${url.pathname}?${newUrlParams.toString()}`);
    }
};
/**
 * Check if url is google.**\/
 * @param url URL to check
 */
function isGoogle(url) {
    const urlDomain = url.hostname;
    return urlDomain.includes("google.") || urlDomain.includes(".google.");
}
/**
 * Check if user searching transparent images
 * @param url Google URL
 */
function isUserSearchingTransparent(url) {
    const query = url.searchParams.get("q");
    const words = ["png"];
    if (!query)
        return false;
    for (const word of words) {
        if (query.toLocaleLowerCase().includes(word.toLocaleLowerCase()))
            return true;
    }
    return false;
}
/**
 * Check if color option in Google set to transparent
 * @param url Google URL
 */
function isGoogleSearchSetToTransparent(url) {
    return url.searchParams.get("tbs") == "ic:trans";
}
/**
 * Check if url points to Google Images section
 * @param url Google URL
 */
function isSearchingImages(url) {
    return url.searchParams.get("tbm") == "isch";
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!***************************!*\
  !*** ./src/background.ts ***!
  \***************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _websites_google__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./websites/google */ "./src/websites/google.ts");

const websites = [_websites_google__WEBPACK_IMPORTED_MODULE_0__.GoogleUrlConverter];
chrome.tabs.onUpdated.addListener((tabID, changeInfo, tab) => {
    const url = tab.url;
    if (!url)
        return;
    const urlObj = new URL(url);
    for (const website of websites) {
        if (website.isUrlValid(urlObj)) {
            const newUrl = website.convertURL(urlObj);
            chrome.tabs.update(tabID, {
                url: newUrl.toString()
            });
            console.log(`Redirecting from ${url} to ${newUrl}`);
            return;
        }
    }
});

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFja2dyb3VuZC5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUVPLE1BQU0sa0JBQWtCLEdBQXdCO0lBQ25ELElBQUksRUFBRSxRQUFRO0lBQ2QsVUFBVSxFQUFFLFVBQVUsR0FBUTtRQUMxQixPQUFPLFFBQVEsQ0FBQyxHQUFHLENBQUM7WUFDcEIsaUJBQWlCLENBQUMsR0FBRyxDQUFDO1lBQ3RCLDBCQUEwQixDQUFDLEdBQUcsQ0FBQztZQUMvQixDQUFDLDhCQUE4QixDQUFDLEdBQUcsQ0FBQztJQUN4QyxDQUFDO0lBQ0QsVUFBVSxFQUFFLFVBQVUsR0FBUTtRQUMxQixNQUFNLFlBQVksR0FBRyxJQUFJLGVBQWUsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDO1FBQ3BELFlBQVksQ0FBQyxHQUFHLENBQUMsS0FBSyxFQUFFLFVBQVUsQ0FBQztRQUVuQyxPQUFPLElBQUksR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLE1BQU0sR0FBRyxHQUFHLENBQUMsUUFBUSxJQUFJLFlBQVksQ0FBQyxRQUFRLEVBQUUsRUFBRSxDQUFDO0lBQzdFLENBQUM7Q0FDSjtBQUVEOzs7R0FHRztBQUNILFNBQVMsUUFBUSxDQUFDLEdBQVE7SUFDdEIsTUFBTSxTQUFTLEdBQUcsR0FBRyxDQUFDLFFBQVE7SUFFOUIsT0FBTyxTQUFTLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxJQUFJLFNBQVMsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDO0FBQzFFLENBQUM7QUFFRDs7O0dBR0c7QUFDSCxTQUFTLDBCQUEwQixDQUFDLEdBQVE7SUFDeEMsTUFBTSxLQUFLLEdBQUksR0FBRyxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDO0lBQ3hDLE1BQU0sS0FBSyxHQUFHLENBQUMsS0FBSyxDQUFDO0lBRXJCLElBQUksQ0FBQyxLQUFLO1FBQ04sT0FBTyxLQUFLO0lBRWhCLEtBQUssTUFBTSxJQUFJLElBQUksS0FBSyxFQUFFO1FBQ3RCLElBQUksS0FBSyxDQUFDLGlCQUFpQixFQUFFLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1lBQzVELE9BQU8sSUFBSTtLQUNsQjtJQUVELE9BQU8sS0FBSztBQUNoQixDQUFDO0FBRUQ7OztHQUdHO0FBQ0gsU0FBUyw4QkFBOEIsQ0FBQyxHQUFRO0lBQzVDLE9BQU8sR0FBRyxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLElBQUksVUFBVTtBQUNwRCxDQUFDO0FBRUQ7OztHQUdHO0FBQ0gsU0FBUyxpQkFBaUIsQ0FBQyxHQUFRO0lBQy9CLE9BQU8sR0FBRyxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLElBQUksTUFBTTtBQUNoRCxDQUFDOzs7Ozs7O1VDN0REO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7QUNOc0Q7QUFFdEQsTUFBTSxRQUFRLEdBQUcsQ0FBQyxnRUFBa0IsQ0FBQztBQUVyQyxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxLQUFLLEVBQUUsVUFBVSxFQUFFLEdBQUcsRUFBRSxFQUFFO0lBQ3pELE1BQU0sR0FBRyxHQUFHLEdBQUcsQ0FBQyxHQUFHO0lBRW5CLElBQUksQ0FBQyxHQUFHO1FBQ0osT0FBTTtJQUVWLE1BQU0sTUFBTSxHQUFHLElBQUksR0FBRyxDQUFDLEdBQUcsQ0FBQztJQUUzQixLQUFLLE1BQU0sT0FBTyxJQUFJLFFBQVEsRUFBRTtRQUM1QixJQUFJLE9BQU8sQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLEVBQUU7WUFDNUIsTUFBTSxNQUFNLEdBQUcsT0FBTyxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUM7WUFFekMsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFO2dCQUN0QixHQUFHLEVBQUUsTUFBTSxDQUFDLFFBQVEsRUFBRTthQUN6QixDQUFDO1lBRUYsT0FBTyxDQUFDLEdBQUcsQ0FBQyxvQkFBb0IsR0FBRyxPQUFPLE1BQU0sRUFBRSxDQUFDO1lBQ25ELE9BQU07U0FDVDtLQUNKO0FBQ0wsQ0FBQyxDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vaWhhdGVmYWtlcG5nLy4vc3JjL3dlYnNpdGVzL2dvb2dsZS50cyIsIndlYnBhY2s6Ly9paGF0ZWZha2Vwbmcvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vaWhhdGVmYWtlcG5nL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9paGF0ZWZha2Vwbmcvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9paGF0ZWZha2Vwbmcvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9paGF0ZWZha2VwbmcvLi9zcmMvYmFja2dyb3VuZC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBXZWJzaXRlVXJsQ29udmVydGVyIH0gZnJvbSBcIi4vd2Vic2l0ZVVybENvbnZlcnRlclwiXG5cbmV4cG9ydCBjb25zdCBHb29nbGVVcmxDb252ZXJ0ZXI6IFdlYnNpdGVVcmxDb252ZXJ0ZXIgPSB7XG4gICAgbmFtZTogXCJHb29nbGVcIixcbiAgICBpc1VybFZhbGlkOiBmdW5jdGlvbiAodXJsOiBVUkwpOiBCb29sZWFuIHtcbiAgICAgICAgcmV0dXJuIGlzR29vZ2xlKHVybCkgJiYgXG4gICAgICAgIGlzU2VhcmNoaW5nSW1hZ2VzKHVybCkgJiZcbiAgICAgICAgaXNVc2VyU2VhcmNoaW5nVHJhbnNwYXJlbnQodXJsKSAmJlxuICAgICAgICAhaXNHb29nbGVTZWFyY2hTZXRUb1RyYW5zcGFyZW50KHVybCkgXG4gICAgfSxcbiAgICBjb252ZXJ0VVJMOiBmdW5jdGlvbiAodXJsOiBVUkwpOiBVUkwge1xuICAgICAgICBjb25zdCBuZXdVcmxQYXJhbXMgPSBuZXcgVVJMU2VhcmNoUGFyYW1zKHVybC5zZWFyY2gpXG4gICAgICAgIG5ld1VybFBhcmFtcy5zZXQoXCJ0YnNcIiwgXCJpYzp0cmFuc1wiKVxuXG4gICAgICAgIHJldHVybiBuZXcgVVJMKGAke3VybC5vcmlnaW59JHt1cmwucGF0aG5hbWV9PyR7bmV3VXJsUGFyYW1zLnRvU3RyaW5nKCl9YClcbiAgICB9XG59XG5cbi8qKlxuICogQ2hlY2sgaWYgdXJsIGlzIGdvb2dsZS4qKlxcL1xuICogQHBhcmFtIHVybCBVUkwgdG8gY2hlY2tcbiAqL1xuZnVuY3Rpb24gaXNHb29nbGUodXJsOiBVUkwpOiBib29sZWFuIHtcbiAgICBjb25zdCB1cmxEb21haW4gPSB1cmwuaG9zdG5hbWVcblxuICAgIHJldHVybiB1cmxEb21haW4uaW5jbHVkZXMoXCJnb29nbGUuXCIpIHx8IHVybERvbWFpbi5pbmNsdWRlcyhcIi5nb29nbGUuXCIpXG59XG5cbi8qKlxuICogQ2hlY2sgaWYgdXNlciBzZWFyY2hpbmcgdHJhbnNwYXJlbnQgaW1hZ2VzXG4gKiBAcGFyYW0gdXJsIEdvb2dsZSBVUkxcbiAqL1xuZnVuY3Rpb24gaXNVc2VyU2VhcmNoaW5nVHJhbnNwYXJlbnQodXJsOiBVUkwpOiBib29sZWFuIHsgICAgXG4gICAgY29uc3QgcXVlcnkgPSAgdXJsLnNlYXJjaFBhcmFtcy5nZXQoXCJxXCIpXG4gICAgY29uc3Qgd29yZHMgPSBbXCJwbmdcIl1cblxuICAgIGlmICghcXVlcnkpXG4gICAgICAgIHJldHVybiBmYWxzZVxuXG4gICAgZm9yIChjb25zdCB3b3JkIG9mIHdvcmRzKSB7XG4gICAgICAgIGlmIChxdWVyeS50b0xvY2FsZUxvd2VyQ2FzZSgpLmluY2x1ZGVzKHdvcmQudG9Mb2NhbGVMb3dlckNhc2UoKSkpXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZSBcbiAgICB9XG5cbiAgICByZXR1cm4gZmFsc2Vcbn1cblxuLyoqXG4gKiBDaGVjayBpZiBjb2xvciBvcHRpb24gaW4gR29vZ2xlIHNldCB0byB0cmFuc3BhcmVudFxuICogQHBhcmFtIHVybCBHb29nbGUgVVJMXG4gKi9cbmZ1bmN0aW9uIGlzR29vZ2xlU2VhcmNoU2V0VG9UcmFuc3BhcmVudCh1cmw6IFVSTCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB1cmwuc2VhcmNoUGFyYW1zLmdldChcInRic1wiKSA9PSBcImljOnRyYW5zXCJcbn1cblxuLyoqXG4gKiBDaGVjayBpZiB1cmwgcG9pbnRzIHRvIEdvb2dsZSBJbWFnZXMgc2VjdGlvblxuICogQHBhcmFtIHVybCBHb29nbGUgVVJMXG4gKi9cbmZ1bmN0aW9uIGlzU2VhcmNoaW5nSW1hZ2VzKHVybDogVVJMKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHVybC5zZWFyY2hQYXJhbXMuZ2V0KFwidGJtXCIpID09IFwiaXNjaFwiXG59XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7IEdvb2dsZVVybENvbnZlcnRlciB9IGZyb20gXCIuL3dlYnNpdGVzL2dvb2dsZVwiXG5cbmNvbnN0IHdlYnNpdGVzID0gW0dvb2dsZVVybENvbnZlcnRlcl1cblxuY2hyb21lLnRhYnMub25VcGRhdGVkLmFkZExpc3RlbmVyKCh0YWJJRCwgY2hhbmdlSW5mbywgdGFiKSA9PiB7XG4gICAgY29uc3QgdXJsID0gdGFiLnVybFxuICAgIFxuICAgIGlmICghdXJsKVxuICAgICAgICByZXR1cm5cblxuICAgIGNvbnN0IHVybE9iaiA9IG5ldyBVUkwodXJsKVxuXG4gICAgZm9yIChjb25zdCB3ZWJzaXRlIG9mIHdlYnNpdGVzKSB7XG4gICAgICAgIGlmICh3ZWJzaXRlLmlzVXJsVmFsaWQodXJsT2JqKSkge1xuICAgICAgICAgICAgY29uc3QgbmV3VXJsID0gd2Vic2l0ZS5jb252ZXJ0VVJMKHVybE9iailcblxuICAgICAgICAgICAgY2hyb21lLnRhYnMudXBkYXRlKHRhYklELCB7XG4gICAgICAgICAgICAgICAgdXJsOiBuZXdVcmwudG9TdHJpbmcoKVxuICAgICAgICAgICAgfSlcbiAgICBcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGBSZWRpcmVjdGluZyBmcm9tICR7dXJsfSB0byAke25ld1VybH1gKVxuICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgIH1cbiAgICB9XG59KSJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==