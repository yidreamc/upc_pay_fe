<template>

</template>

<script>
    export default {
        name: "CheckMsg",
        mounted() {

            let d = new Date();
            if ((d.getHours() == 23 && d.getMinutes() > 30) || (d.getHours() == 0 && d.getMinutes() < 30)) {

            }
        }
    }
</script>

<style scoped>

</style>