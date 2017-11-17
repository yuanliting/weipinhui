<template>
  <div>
    <checklist :title="$t('Basic Usage')" :label-position="labelPosition" required :options="commonList" v-model="checklist001" @on-change="change"></checklist>

  </div>
</template>



<script>
  import { Group, CellBox, Checklist, Cell, Divider, XButton } from 'vux'
  import _ from 'lodash'

  export default {
    mounted () {

    },
    components: {
      Group,
      Checklist,
      Cell,
      Divider,
      XButton,
      CellBox
    },
    methods: {
      change (val, label) {
        console.log('change', val, label)
      },
      $t(){
          return '哈哈'
      }
    },
    data () {
      return {
        fullValues: [],
        labelPosition: '',
        error: '',
        commonList: [ 'China', 'Japan', 'America' ],
        checklist001: [],

      }
    }
  }
</script>

<style scoped>
  .error {
    padding-left: 15px;
    line-height: 28px;
    color: #888;
    font-size: 12px;
  }
</style>
