<template>
<div>
    <h2 class="header">公告</h2>
    <p>{{ msg }}</p>
</div>

</template>

<script>
    export default {
        name: "MainTain",
         data(){
            return {
               msg: ''
            }
        },
        mounted() {
            this.msg = this.$route.query.msg;
        }
    }
</script>
