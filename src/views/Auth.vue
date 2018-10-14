<template>

</template>

<script>
    import { auth } from '../api/api.js'

    export default {
        name: "Auth",
        data() {
            return {}
        },
        mounted() {
            let un = this.$route.query.un;
            let verify = this.$route.query.verify;
            let param = {
                un: un,
                verify: verify
            };
            auth(param).then((res) => {
                if(res.code === 0){
                    localStorage.setItem("manage",true);
                    this.$router.push({path: '/'})
                }else {
                    this.$router.push({path: '/noauth'})
                }
            })
        }
    }
</script>

<style scoped>

</style>