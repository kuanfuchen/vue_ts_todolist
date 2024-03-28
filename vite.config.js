"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const vite_1 = require("vite");
const plugin_vue_1 = __importDefault(require("@vitejs/plugin-vue"));
const path_1 = __importDefault(require("path"));
const vite_plugin_1 = require("@quasar/vite-plugin");
// https://vitejs.dev/config/
exports.default = (0, vite_1.defineConfig)({
    plugins: [
        (0, plugin_vue_1.default)({
            template: { transformAssetUrls: vite_plugin_1.transformAssetUrls }
        }),
        (0, vite_plugin_1.quasar)({
            sassVariables: 'src/quasar-variables.sass'
        })
    ],
    resolve: {
        alias: {
            '@': path_1.default.resolve(__dirname, 'src')
        }
    },
});
