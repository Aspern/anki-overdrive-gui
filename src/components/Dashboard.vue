<template>
    <div class="dashboard">
        <b-navbar toggleable="md" type="dark" variant="info">
            <img src="../assets/logo.png" style="height:50px;background-color: aliceblue;margin-right:20px;" />
            <b-navbar-brand href="#">IoT Showcase</b-navbar-brand>
        </b-navbar>
        <b-container fluid style="margin-top:20px;">
            <vehicle-list
                @vehiclechanged="vehicles = arguments[0]"
            />
            <vehicle-controller
                :vehicles="vehicles"
            />
        </b-container>
    </div>
</template>

<script>
import VehicleList from "./VehicleList"
import VehicleController from "./VehicleController";

export default {
    components: {
        VehicleController,
        VehicleList
    },

    data() {
        return {
            vehicles: []
        }
    }
}
</script>

<style scoped>
.bg-info {
    background-color: #841439!important;
}
</style>
