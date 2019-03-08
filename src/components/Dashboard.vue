<template>
    <div class="dashboard">
        <b-navbar toggleable="md" type="dark" variant="info">
            <img src="../assets/logo.png" style="height:50px;background-color: aliceblue;margin-right:20px;" />
            <b-navbar-brand href="#">IoT Showcase</b-navbar-brand>
            <b-navbar-nav class="ml-auto">
                <b-nav-item href="#">Auto-Refresh</b-nav-item>
                <b-button-group>
                    <b-button :variant="variantForAutoRefresh(true)" @click="changeAutoRefresh(true)">An</b-button>
                    <b-button :variant="variantForAutoRefresh(false)" @click="changeAutoRefresh(false)">Aus</b-button>
                </b-button-group>
            </b-navbar-nav>
        </b-navbar>
        <b-container fluid style="margin-top:20px;">
            <vehicle-list
                :vehicles="vehicles"
                :client="client"
                :pictures="pictures"
                @connectionchange="onConnectionchange"
            />
            <b-row>
                <scenarios
                   :connected-vehicles="connectedVehicles.length"
                   :client="client"
                />
                <vehicle-controller
                    v-for="vehicle in connectedVehicles"
                    :key="vehicle.id"
                    :vehicle="vehicle"
                    :client="client"
                    :pictures="pictures"
                />
            </b-row>

        </b-container>
    </div>
</template>

<script>
import VehicleList from "./VehicleList"
import VehicleController from "./VehicleController"
import Scenarios from "./Scenarios"
import {VehicleClient} from "../client/VehicleClient"
import eb401ef0f82b from '../assets/eb401ef0f82b.png'
import ed0c94216553 from '../assets/ed0c94216553.png'
import cb73ac40502a from '../assets/cb73ac40502a.png'
import c667a5ded647 from '../assets/c667a5ded647.png'

export default {
    components: {
        Scenarios,
        VehicleController,
        VehicleList
    },

    data() {
        return {
            autoRefresh: false,
            client: null,
            vehicles: [],
            autoRefreshTask: null,
            pictures: new Map([
                ['eb401ef0f82b', eb401ef0f82b],
                ['ed0c94216553', ed0c94216553],
                ['cb73ac40502a', cb73ac40502a],
                ['c667a5ded647', c667a5ded647]
            ]),
        }
    },

    computed: {
        connectedVehicles() {
            return this.vehicles
                .filter(v => v.connected)
                .map(v => Object.assign(v, {speed:0}))
        }
    },

    watch: {
      autoRefresh(autoRefresh) {
          if(autoRefresh === true) {
              this.enableAutoRefresh()
          } else {
              this.disableAutoRefresh()
          }
      }
    },

    methods: {

        loadVehicles() {
            const self = this
            this.client
                .vehicles()
                .then(vehicles => {
                    self.vehicles = vehicles
                })
        },

        onConnectionchange() {
            setTimeout(function() {
                this.loadVehicles()
            }.bind(this), 1000)
        },

        variantForAutoRefresh(autoRefresh) {
            if(autoRefresh == true && this.autoRefresh === true) return "success"
            else if(autoRefresh === false && this.autoRefresh === false) return "danger"
            return "normal"
        },

        changeAutoRefresh(autoRefresh) {
            this.autoRefresh = autoRefresh
        },

        enableAutoRefresh() {
            this.autoRefreshTask = setInterval(function() {
                this.loadVehicles()
            }.bind(this), 2000)
        },

        disableAutoRefresh() {
            clearInterval(this.autoRefreshTask)
        }
    },

    created() {
        this.client = new VehicleClient()
        this.loadVehicles()
    },
}
</script>

<style scoped>
.bg-info {
    background-color: #841439!important;
}
</style>
