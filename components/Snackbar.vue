



<template>

  <v-snackbar v-model="show" :color="color" timeout="3000">

    {{ message }}
    <template v-slot:action="{ attrs }">
    
      <v-btn   v-bind="attrs" text @click="Fshow()">Close</v-btn>
    </template>

  </v-snackbar>
 
</template>

<script>
export default {
  methods:{
Fshow(){
  this.show=false
}
  },
  data () {
    return {
      show: false,
      message: '',
      color: ''
    }
  },

  created () {
    this.$store.subscribe((mutation, state) => {
      if (mutation.type === 'snackbar/showMessage') {
        this.message = state.snackbar.content
        this.color = state.snackbar.color
        this.show = true
      }
    })
  }
}
</script>