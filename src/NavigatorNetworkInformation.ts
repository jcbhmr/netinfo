import NetworkInformation from "./NetworkInformation.js"

const connection = new WeakMap<any, NetworkInformation>()

const NavigatorNetworkInformation = {
    prototype: {
        get connection(): NetworkInformation {
            return connection.get(this)!
        }
    }
}

export default NavigatorNetworkInformation