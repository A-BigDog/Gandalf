/**
 * Gandalf theme — node half.
 *
 * The browser half (src/client) carries the actual theme; this module is the
 * host-loader entry that declares the package (and its `dsh.client` manifest
 * is picked up by the client-module table from package.json).
 */
export const name = 'gandalf-theme'

/** @param ctx - host cordis context. */
export function apply(): void {
  // No server-side behavior needed: the client bundle registers the theme.
}
