"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setMode = void 0;
const baseConfig = {
    mode: "doc",
    dev: {},
    demo: {},
    doc: {
        port: 5002
    }
};
exports.setMode = (mode) => (baseConfig.mode = mode);
exports.default = baseConfig;
