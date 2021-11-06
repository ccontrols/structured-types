"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfigStore = void 0;
const vscode = __importStar(require("vscode"));
class ConfigStore {
    constructor() {
        this._config = {
            singlePage: true,
            autoShowDocumentation: false,
        };
        this.readValue = (config, key) => {
            const value = config.get(key);
            if (typeof value === 'string' && value === '') {
                return undefined;
            }
            else if (Array.isArray(value) && value.length === 0) {
                return undefined;
            }
            return value;
        };
        this.readConfig();
    }
    get config() {
        return this._config;
    }
    readConfig() {
        const config = vscode.workspace.getConfiguration('instant-documentation');
        this._config.singlePage = this.readValue(config, 'singlePage');
        this._config.autoShowDocumentation = this.readValue(config, 'singlePage');
        this._config.collapsed = this.readValue(config, 'collapsed');
        this._config.visible = this.readValue(config, 'visible');
        this._config.extensions = this.readValue(config, 'extensions');
        this._config.maxProps = this.readValue(config, 'maxProps');
        this._config.columns = this.readValue(config, 'columns');
        this._config.sections = this.readValue(config, 'sections');
        this._config.skipInherited = this.readValue(config, 'skipInherited');
        Object.keys(this._config).forEach((key) => {
            const name = key;
            if (this._config[name] === undefined) {
                delete this._config[name];
            }
        });
        return this._config;
    }
}
exports.ConfigStore = ConfigStore;
//# sourceMappingURL=config.js.map