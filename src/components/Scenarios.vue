<template>
    <b-col
            col
            lg="4"
            md="6"
            sm="12"
    >
        <b-card
                title="Szenarien"
                class="mb-2"
        >
            <div style="text-align: left;">
                <b-row>
                    <b-col lg="8" md="8">
                        Anti-Kollision
                    </b-col>
                    <b-col lg="2" md="2">
                        <b-button
                                variant="success"
                                :disabled="connectedVehicles !== 2"
                                @click="startAntiCollision"
                        >
                            Start
                        </b-button>
                    </b-col>
                    <b-col lg="2" md="2">
                        <b-button
                                variant="danger"
                                :disabled="connectedVehicles !== 2"
                                @click="stopAntiCollision"
                        >
                            Stop
                        </b-button>
                    </b-col>
                </b-row>
            </div>
        </b-card>
    </b-col>
</template>

<script>
export default {

    props: {
        connectedVehicles: {
            type: Number,
            default: 0
        },

        client: {
            required: true
        }
    },

    methods: {
        startAntiCollision() {
            this.client.startAntiCollision()
        },

        stopAntiCollision() {
            this.client.stopAntiCollision()
        }
    }

}
</script>

<style scoped>

</style>
