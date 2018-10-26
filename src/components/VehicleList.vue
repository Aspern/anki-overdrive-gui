<template>
    <b-card
        title="Fahrzeuge"
            class="mb-2"
    >
        <b-table
            show-empty
            striped
            hover
            bordered
            :items="vehicles"
            :fields="fields"
        >
            <template slot="connected" slot-scope="data">
                <b-button
                    :variant="connectButtonVariant(data.value)"
                    @click="toggleConnection(data.value, data.item.id)"
                >
                    {{connectButtonText(data.value)}}
                </b-button>
            </template>
            <template slot="offset" slot-scope="data">
                <b-form-select
                        v-model="data.value"
                        :options="offsetOptions"
                        :disabled="!data.item.connected"
                        style="max-width:250px;"
                        @change="changeOffset(arguments[0], data.item.id)"
                />
            </template>
            <template slot="picture" slot-scope="data">
                <img
                    :src="pictures.get(data.item.id)"
                    height="40"
                />
            </template>
            <div slot="empty">
                Keine Fahrzeuge verbunden.
            </div>
        </b-table>
    </b-card>
</template>

<script>
import eb401ef0f82b from '../assets/eb401ef0f82b.png'
import ed0c94216553 from '../assets/ed0c94216553.png'
import {VehicleClient} from "../client/VehicleClient";

export default {
    data() {
        return {
            vehicles: [],
            client: null,
            offsetOptions: [
                {value: 0, text: 'Zentriert (0mm)'},
                {value: -68, text: 'Lane 1 (-68.0mm)'},
                {value: -34, text: 'Lane 2 (-34.0mm)'},
                {value: 34, text: 'Lane 3 (34.0mm)'},
                {value: 68, text: 'Lane 4 (68.0mm)'},
            ],
            pictures: new Map([
                ['eb401ef0f82b', eb401ef0f82b],
                ['ed0c94216553', ed0c94216553]
            ]),
            fields: [
                {
                    key: 'picture',
                    label: 'Bild'
                },
                {
                    key: 'id',
                    label: 'ID'
                },
                {
                    key: 'name',
                    label: 'Fahrzeugname'
                },
                {
                  key: 'address',
                  label: 'Addresse (BLE)'
                },
                {
                    key: 'connected',
                    label: 'Verbunden'
                },
                {
                    key: 'offset',
                    label: 'Offset (mm)',
                    tdClass: 'offset-cell'
                }
            ]
        }
    },

    created() {
        this.client = new VehicleClient()
        this.loadVehicles()
    },

    methods: {

        loadVehicles() {
            const self = this
            this.client
                .vehicles()
                .then(vehicles => {
                    self.vehicles = vehicles
                    self.$emit('vehiclechanged', self.vehicles)
                })
        },

        connectButtonVariant(state) {
            if(state) return "success"
            return "danger"
        },

        connectButtonText(state) {
            if(state) return "Online"
            return "Offline"
        },

        toggleConnection(state, vehicleId) {
            if(state) this.client.disconnect(vehicleId).then(this.loadVehicles.bind(this))
            else this.client.connect(vehicleId).then(this.loadVehicles.bind(this))
        },

        changeOffset(offset, vehicleId) {
           this.client.setOffset(vehicleId, offset).then(this.loadVehicles.bind(this))
        }
    }
}
</script>

<style scoped>

</style>
