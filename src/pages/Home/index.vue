<template>
  <div>
    <TypeNav />
    <ListContainer></ListContainer>
    <TodayRecommend></TodayRecommend>
    <Rank></Rank>
    <Like></Like>
    <Floor v-for="floor in floors" :key="floor.id" :floor="floor"></Floor>
    <Brand></Brand>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import ListContainer from "./ListContainer/index.vue";
import TodayRecommend from "./TodayRecommend/index.vue";
import Rank from "./Rank/index.vue";
import Like from "./Like";
import Floor from "./Floor";
import Brand from "./Brand";

export default {
  name: "Home",

  mounted(){
    this.$store.dispatch('home/getRecommends')
    this.$store.dispatch('home/getFloors')
    this.$store.dispatch('home/getRank')
    this.$store.dispatch('home/getLike')
  },

  computed:{
    ...mapState({
        floors: state => state.home.floors
    })
  },

  components: {
    ListContainer,
    TodayRecommend,
    Rank,
    Like,
    Floor,
    Brand,
  },
};
</script>

<style lang="less" scoped>
</style>