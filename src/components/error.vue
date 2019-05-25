<template>
    <div>
        <img src="../assets/error.jpg" alt="">
    </div>
</template>

<script>
export default {
    name:'error',
    created(){
        this.$message.error('扎吧吧,,你的url地址出错了~~~~~~')
    }
}

</script>

<style>

</style>
