<template>
</template>

<script>
    import { auth } from '../api/api'
    export default {
        name: "Auth",
        mounted() {
            const un = this.$route.query.un;
            const verify = this.$route.query.verify;
            const param = {
                un: un,
                verify: verify
            };
            auth(param).then(data => {
                if(data.code === 0) {
                    localStorage.setItem('user',JSON.stringify(data.data))
                }else{
                    // 认证失败 返回数字石大
                    window.location.href = 'http://i.upc.edu.cn';
                }
            });
            
        }
    }
</script>
