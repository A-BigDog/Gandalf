//#region src/index.ts
/**
* Gandalf theme — node half.
*
* The browser half (src/client) carries the actual theme; this module is the
* host-loader entry that declares the package (and its `dsh.client` manifest
* is picked up by the client-module table from package.json).
*/
const name = "gandalf-theme";
/** @param ctx - host cordis context. */
function apply() {}
//#endregion
export { apply, name };
