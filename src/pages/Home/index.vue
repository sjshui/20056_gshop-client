<template>
    <div >
        <TypeNav/>
        <ListContainer></ListContainer>
        <TodayRecommend></TodayRecommend>
        <Rank></Rank>
        <Like></Like>
        <Floor></Floor>
        <Floor></Floor>
        <Brand></Brand>
    </div>
    
</template>

<script>
    import ListContainer from './ListContainer/index.vue'
    import TodayRecommend from './TodayRecommend/index.vue'
    import Rank from './Rank/index.vue'
    import Like from './Like'
    import Floor from './Floor'
    import Brand from './Brand'

    export default {
        name:'Home',
        components:{
            ListContainer,
            TodayRecommend,
            Rank,
            Like,
            Floor,
            Brand
        }
    }
</script>

<style lang="less" scoped>

</style>