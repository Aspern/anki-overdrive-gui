import axios from 'axios'

class VehicleClient {
    _restClient

    constructor() {
        this._restClient = axios.create({})
    }

    vehicles() {
        return this._restClient
            .get('http://localhost:8090/api/vehicle')
            .then(response => Promise.resolve(response.data))
            .catch(response => Promise.reject(response))
    }

    connect(vehicleId) {
        return this._restClient
            .post(`http://localhost:8090/api/vehicle/${vehicleId}/connect`)
            .then(response => Promise.resolve(response.data))
            .catch(response => Promise.reject(response))
    }

    disconnect(vehicleId) {
        return this._restClient
            .post(`http://localhost:8090/api/vehicle/${vehicleId}/disconnect`)
            .then(response => Promise.resolve(response.data))
            .catch(response => Promise.reject(response))
    }

    setOffset(vehicleId, offset) {
        return this._restClient
            .post(`http://localhost:8090/api/vehicle/${vehicleId}/set-offset`, {
                offset
            })
            .then(response => Promise.resolve(response.data))
            .catch(response => Promise.reject(response))
    }

    setSpeed(vehicleId, speed) {
        return this._restClient
            .post(`http://localhost:8090/api/vehicle/${vehicleId}/set-speed`, {
                speed
            })
            .then(response => Promise.resolve(response.data))
            .catch(response => Promise.reject(response))
    }

    changeLane(vehicleId, offset) {
        return this._restClient
            .post(`http://localhost:8090/api/vehicle/${vehicleId}/change-lane`, {
                offset
            })
            .then(response => Promise.resolve(response.data))
            .catch(response => Promise.reject(response))
    }

    queryBatteryLevel(vehicleId) {
        return this._restClient
            .get(`http://localhost:8090/api/vehicle/${vehicleId}/battery-level`)
            .then(response => Promise.resolve(response.data))
            .catch(response => Promise.reject(response))
    }

    startAntiCollision() {
        return this._restClient
            .post(`http://localhost:8090/api/anti-collision`)
            .then(response => Promise.resolve(response.data))
            .catch(response => Promise.reject(response))
    }

    stopAntiCollision() {
        return this._restClient
            .delete(`http://localhost:8090/api/anti-collision`)
            .then(response => Promise.resolve(response.data))
            .catch(response => Promise.reject(response))
    }

}

export {VehicleClient}
