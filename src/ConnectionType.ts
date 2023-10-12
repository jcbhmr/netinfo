/**
 * <dl>
 *   <dt><code>bluetooth</code></dt>
 *   <dd>A Bluetooth connection.</dd>
 *   <dt><code>cellular</code></dt>
 *   <dd>A cellular connection (e.g., EDGE, HSPA, LTE, etc.).</dd>
 *   <dt><code>ethernet</code></dt>
 *   <dd>An Ethernet connection.</dd>
 *   <dt><code>none</code></dt>
 *   <dd>No network connection. The user agent will not contact the network when the user follows links or when a script requests a remote page (or knows that such an attempt would fail) - i.e., equivalent to <code>navigator.onLine === false</code> in HTML.</dd>
 *   <dt><code>mixed</code></dt>
 *   <dd>The user agent is using multiple connection types.</dd>
 *   <dt><code>other</code></dt>
 *   <dd>The connection type that is known, but not one of enumerated connection types.</dd>
 *   <dt><code>unknown</code></dt>
 *   <dd>The user agent has established a network connection, but is unable, or unwilling, to determine the underlying connection technology.</dd>
 *   <dt><code>wifi</code></dt>
 *   <dd>A Wi-Fi connection.</dd>
 *   <dt><code>wimax</code></dt>
 *   <dd>A WiMAX connection.</dd>
 * </dl>
 *
 * @see https://wicg.github.io/netinfo/#connection-types
 * @see https://wicg.github.io/netinfo/#connectiontype-enum
 */
type ConnectionType =
  | "cellular"
  | "bluetooth"
  | "ethernet"
  | "mixed"
  | "none"
  | "other"
  | "unknown"
  | "wifi"
  | "wimax";
export default ConnectionType;
