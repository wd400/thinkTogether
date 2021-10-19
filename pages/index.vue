<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <v-card class="logo py-4 d-flex justify-center">
        
      </v-card>
      <v-card>
        <v-card-title class="headline">
          {{$t('app_description')}}
        </v-card-title>
        <v-card-text>
          <p>{{$t('use_cases')}}</p>
          <p>-{{$t('general_reflections')}}</p>
          <p>-{{$t('dilemmas')}}</p>
          <p>-{{$t('action_process')}}</p>
          <p>-{{$t('personnal_problems')}}</p>
           <br>
           {{$t('explore_msg')}}
           <br>
           


          <hr class="my-3">
          <p>{{$t('long_term')}}</p>
          <p>{{$t('data_access_msg')}} 
<a
              href="https://github.com/wd400/thinkTogether/releases/"
              target="_blank"
              rel="noopener noreferrer"
            >https://github.com/wd400/thinkTogether/releases/</a> ({{$t('updated_monthly')}})
</p>
        </v-card-text>

      </v-card>
    </v-col>
  </v-row>
</template>
