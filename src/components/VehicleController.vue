<template>
    <b-row>
        <b-col
            v-for="vehicle in connectedVehicles"
            :key="vehicle.id"
            col
            lg="4"
            md="6"
            sm="12"
        >
            <b-card
                :title="vehicle.name"
                class="mb-2"
            >
                <img :src="pictures.get(vehicle.id)" width="50%" />
                <div style="text-align: left;">
                <b-button variant="danger" @click="stop(vehicle.id)">Stop</b-button>
                <p />
                <b-form-group
                    :id="`${vehicle.id}-set-speed-group`"
                    label="Geschwindigkeit (mm/sec):"
                    :label-for="`${vehicle.id}-set-speed`"
                >
                    <b-form-input
                        :id="`${vehicle.id}-set-speed`"
                        v-model="vehicle.speed"
                        type="range"
                        :min="0"
                        :max="1000"
                        @change="setSpeed(vehicle.id, arguments[0])"
                    >
                    </b-form-input>
                </b-form-group>
                <b-button-group style="margin-left:100px;">
                    <b-button class="change-lane" @click="changeLane(vehicle.id, -68.0)">
                        Lane 1
                    </b-button>
                    <b-button class="change-lane" @click="changeLane(vehicle.id, -34.0)">
                        Lane 2
                    </b-button>
                    <b-button class="change-lane" @click="changeLane(vehicle.id, 34.0)">
                        Lane 3
                    </b-button>
                    <b-button class="change-lane" @click="changeLane(vehicle.id, 68.0)">
                        Lane 4
                    </b-button>
                </b-button-group>
                </div>
            </b-card>
        </b-col>
    </b-row>
</template>

<script>
import eb401ef0f82b from '../assets/eb401ef0f82b.png'
import ed0c94216553 from '../assets/ed0c94216553.png'
import {VehicleClient} from "../client/VehicleClient";

export default {
    name: "VehicleController",

    props: {
        vehicles: {
            type: Array,
            default: () => []
        }
    },

    data() {
        return {
            client: null,
            pictures: new Map([
                ['eb401ef0f82b', eb401ef0f82b],
                ['ed0c94216553', ed0c94216553]
            ])
        }
    },

    computed: {
        connectedVehicles() {
            return this.vehicles
                .filter(v => v.connected)
                .map(v => Object.assign(v, {speed:0}))
        }
    },

    created() {
        this.client = new VehicleClient()
    },

    methods: {
        setSpeed(vehicleId, speed) {
            this.client.setSpeed(vehicleId, speed)
        },

        stop(vehicleId) {
            this.client.setSpeed(vehicleId, 0)
        },

        changeLane(vehicleId, offset) {
            this.client.changeLane(vehicleId, offset)
        }
    }
}
</script>

<style scoped>
.change-lane {
    margin: 5px;
}
</style>
