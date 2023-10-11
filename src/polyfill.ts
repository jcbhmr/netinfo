import NavigatorNetworkInformation from "./NavigatorNetworkInformation.js";

if (typeof Navigator !== "undefined") {
    const s = Object.getOwnPropertyDescriptors(NavigatorNetworkInformation)
    delete s.name
    delete s.length
    delete s.prototype
    Object.defineProperties(Navigator, s)

    const p = Object.getOwnPropertyDescriptors(NavigatorNetworkInformation.prototype)
    delete p.constructor
    delete p[Symbol.toStringTag]
    Object.defineProperties(Navigator.prototype, p)
}
if (typeof WorkerNavigator !== "undefined") {
    const s = Object.getOwnPropertyDescriptors(NavigatorNetworkInformation)
    delete s.name
    delete s.length
    delete s.call
    delete s.prototype
    Object.defineProperties(WorkerNavigator, s)

    const p = Object.getOwnPropertyDescriptors(NavigatorNetworkInformation.prototype)
    delete p.constructor
    delete p[Symbol.toStringTag]
    Object.defineProperties(WorkerNavigator.prototype, p)
}