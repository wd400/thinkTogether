<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">

      <v-card>
      <v-card-title class="headline">
       <v-icon left large>mdi-thought-bubble</v-icon> 
     <h2>  thinkTogether </h2>
       <v-card-subtitle>
        <h4>  {{$t('app_description')}} </h4>
       </v-card-subtitle>
        </v-card-title>
        <v-card-text>

          <h4>{{$t('use_cases')}}</h4>
          <ul>
          <li>{{$t('general_reflections')}}</li>
          <li>{{$t('dilemmas')}}</li>
          <li>{{$t('action_process')}}</li>
          <li>{{$t('personnal_problems')}}</li>
          </ul>
           <br>
           {{$t('explore_msg')}}
           <br>


          <hr class="my-3">
   <!--       <p>{{$t('long_term')}}</p> -->
          <p>{{$t('data_access_msg')}} 
<a
              href="https://github.com/wd400/thinkTogether/releases/"
              target="_blank"
              rel="noopener noreferrer"
            >https://github.com/wd400/thinkTogether/releases/</a> ({{$t('updated_monthly')}})
</p>

<h4>{{$t('notice_location')}} <a
              href="https://github.com/wd400/thinkTogether/"
              target="_blank"
              rel="noopener noreferrer"
            >{{$t('here')}}</a> </h4> 



        </v-card-text>

      </v-card>
    </v-col>
  </v-row>
</template>
