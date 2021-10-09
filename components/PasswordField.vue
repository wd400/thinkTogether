<template>
        <v-text-field :type="show ? 'text' : 'password'"
                  :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
  
                  @click:append="show = !show"



                  :label="getTitle()" 


 v-model="destination.password"

                  :rules="rules"


 />

</template>


<script>
  import validations from '@/utils/validations';
export default {
props:{
    destination:{
        type:Object,
        required:true
    },
    title:{
      type:String,
      default:null
    },
    needed:{
      type:Boolean,
      default:true
    }


  },
      data() {
      return {
        show: false,
      ...validations,
      rules:[]
      }
    },
    methods:{
      getTitle(){
      return  this.title ?? this.$t('password')
      }
    },
        created() {
          this.rules=[ this.minLength('password', 8), this.maxLength('password', 20)]
        if ( this.needed){
            this.rules.concat(this.required('password'))
        }
    },
}

</script>
