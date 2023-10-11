const connectionType = new WeakMap<any, ConnectionType>()

class NetworkInformation extends EventTarget {
    get type(): ConnectionType {
        let type = connectionType.get(this)
        if (!type) {
            type = getConnectionType()
            connectionType.set(this, type)
        }
        return type
    }
    readonly attribute EffectiveConnectionType effectiveType;
    readonly attribute Megabit downlinkMax;
    readonly attribute Megabit downlink;
    readonly attribute Millisecond rtt;
    attribute EventHandler onchange;
  };

  export default NetworkInformation