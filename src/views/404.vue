<template>
    <p class="page-container">404 page not found</p>
</template>

<style lang="scss" scoped>
    .page-container {
        font-size: 20px;
        text-align: center;
        color: rgb(192, 204, 218);
    }
</style>

<script>
    import { test } from '../api/api';

    export default {
        data() {
            return {};
        },
        methods: {

        },
        mounted(){
            // axios.get(`http://localhost:9000/test`, {paymentId: 1}).then((res)=>{
            //     console.log(res.data)
            //     console.log(12333)
            // });
            test().then((data)=>{
                console.log(data)
            })
        }
    }
</script>