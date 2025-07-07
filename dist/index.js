import './sourcemap-register.cjs';/******/ /* webpack/runtime/compat */
/******/ 
/******/ if (typeof __nccwpck_require__ !== 'undefined') __nccwpck_require__.ab = new URL('.', import.meta.url).pathname.slice(import.meta.url.match(/^file:\/\/\/\w:/) ? 1 : 0, -1) + "/";
/******/ 
/************************************************************************/
var __webpack_exports__ = {};

Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@actions/core");
const eslint_1 = require("./eslint");
const run = async () => {
    try {
        await (0, eslint_1.runEslint)();
        process.exit(0);
    }
    catch (err) {
        (0, core_1.setFailed)(err.message);
    }
};
run();


//# sourceMappingURL=index.js.map