<template>
  <v-form v-model="valid">
    <v-text-field v-model="loginInfo.name"
                  :label="$t('name')"
                  :rules="[required('name'), minLength('name', 1),maxLength('name', 20)]" 
                  v-if="hasName" />

    <v-text-field v-model="loginInfo.email"
                  :label="$t('email')"
                  :rules="[required('email'), emailFormat()]" />

 <PasswordField :destination="loginInfo"/> 
    <v-btn @click="submitForm(loginInfo)" :disabled="!valid">{{ buttonText }}</v-btn>
  </v-form>
</template>

<script>
  import validations from '@/utils/validations';
  export default {
    data() {
      return {
        valid: false,
        loginInfo: {
          email: '',
          password: '',
        },
        ...validations
      }
    },
    props: ["submitForm", "buttonText", "hasName"]
  }
</script>

<style lang="scss" scoped>
</style>