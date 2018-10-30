<template>
    <b-col
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
            <div class="battery-level">
                <i class="fa fa-battery-full" v-if="batteryLevel > 4000 "></i>
                <i class="fa fa-battery-three-quarters" v-if="batteryLevel <= 4000 && batteryLevel > 3900 "></i>
                <i class="fa fa-battery-half" v-if="batteryLevel <= 3900 && batteryLevel > 3600 "></i>
                <i class="fa fa-battery-quarter" v-if="batteryLevel <= 3600 && batteryLevel > 3400 "></i>
                <i class="fa fa-battery-empty" v-if="batteryLevel && batteryLevel <= 3400"></i>
                <i class="fa fa-spinner fa-spin" v-if="batteryLevel === null"></i>
            </div>
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
</template>

<script>
export default {
    name: "VehicleController",

    props: {
        vehicle: {
            type: Object,
            required: true
        },

        client: {
            required: true
        },

        pictures: {
            default: () => new Map()
        }
    },

    data() {
      return {
          batteryLevelQueryTask: null,
          batteryLevel: null
      }
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
    },

    created() {
        this.batteryLevelQueryTask = setInterval(function(){
            const self = this
            this.client.queryBatteryLevel(this.vehicle.id).then(response => {
                self.batteryLevel = response.batteryLevel
            })
        }.bind(this), 10000)
    },

    beforeDestroy() {
        clearInterval(this.batteryLevelQueryTask)
    }
}
</script>

<style scoped>
.change-lane {
    margin: 5px;
}

.battery-level {
    float:right;
}

.fa-battery-full,
.fa-battery-three-quarters {
    color: green;
}

.fa-battery-half {
    color: orange;
}

.fa-battery-quarter,
.fa-battery-empty {
    color: red;
}
</style>
