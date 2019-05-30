import Vue from 'vue'
import Router from 'vue-router'
import ErrorPage from '@/components/ErrorPage'
// import HomePage from '@/components/unit1/HomePage'
// import Unit1Tests from '@/components/unit1/children/TestsContainer'
// import NavigationHolder from '@/components/unit1/NavigationHolder'
import Unit1_vocabulary from '@/components/unit1/Vocabulary.vue'

// Lazily load routes
const HomePage = resolve => {
  require.ensure(['@/components/unit1/HomePage'], () => {
    resolve(require('@/components/unit1/HomePage'))
  })
}

const NavigationHolder = resolve => {
  require.ensure(['@/components/unit1/NavigationHolder'], () => {
    resolve(require('@/components/unit1/NavigationHolder'))
  })
}

const Unit1_grammar_video = resolve => {
  require.ensure(['@/components/unit1/children/Grammar_video'], () => {
    resolve(require('@/components/unit1/children/Grammar_video'))
  })
}

const Unit1Tests = resolve => {
  require.ensure(['@/components/unit1/children/TestsContainer'], () => {
    resolve(require('@/components/unit1/children/TestsContainer'))
  })
}

const Unit1_grammar = resolve => {
  require.ensure(['@/components/unit1/Grammar'], () => {
    resolve(require('@/components/unit1/Grammar'))
  })
}

const Unit1_exersice = resolve => {
  require.ensure(['@/components/unit1/GrammarDrag'], () => {
    resolve(require('@/components/unit1/GrammarDrag'))
  })
}


const Unit1_reading = resolve => {
  require.ensure(['@/components/unit1/Reading.vue'], () => {
    resolve(require('@/components/unit1/Reading.vue'))
  })
}

const Unit1_reading_exercise = resolve => {
  require.ensure(['@/components/unit1/ReadingComponents/ReadingExercise.vue'], () => {
    resolve(require('@/components/unit1/ReadingComponents/ReadingExercise.vue'))
  })
}

const Unit1_reading_hooker = resolve => {
  require.ensure(['@/components/unit1/ReadingComponents/ReadingHooker.vue'], () => {
    resolve(require('@/components/unit1/ReadingComponents/ReadingHooker.vue'))
  })
}

const Unit1_listening = resolve => {
  require.ensure(['@/components/unit1/Listening'], () => {
    resolve(require('@/components/unit1/Listening'))
  })
}

const Unit1_listening_recording = resolve => {
  require.ensure(['@/components/unit1/ListeningComponents/ListeningRecording.vue'], () => {
    resolve(require('@/components/unit1/ListeningComponents/ListeningRecording.vue'))
  })
}

const Unit1_listening_exercise = resolve => {
  require.ensure(['@/components/unit1/ListeningComponents/ListeningExercise'], () => {
    resolve(require('@/components/unit1/ListeningComponents/ListeningExercise'))
  })
}

const Unit1_homework = resolve => {
  require.ensure(['@/components/unit1/Homework'], () => {
    resolve(require('@/components/unit1/Homework'))
  })
}

import FlipClock from '@/components/FlipClock'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/error',
      name: 'ErrorPage',
      component: ErrorPage
    },
    {
      path: '/flipclock',
      name: 'Flipclock',
      component: FlipClock
    },
    {
      path: '/unit1/homepage',
      name: 'HomePage',
      component: HomePage 
    },
    {
      path: '/unit1/tests',
      name: 'Unit1_tests',
      component: Unit1Tests
    },
    {
      path: '/unit1',
      name: 'Unit1',
      component: NavigationHolder,
      children: [
        {
          path: 'grammar',
          name: 'Unit1_grammar',
          component: Unit1_grammar,
          redirect: {name: "Unit1_grammar_video"},
          children: [
            {
              path: 'video',
              name: 'Unit1_grammar_video',
              component: Unit1_grammar_video
            },
            {
              path: 'exercise',
              name: 'Unit1_grammar_exercise',
              component: Unit1_exersice
            }
          ]
        },
        {
          path: 'vocabulary',
          name: 'Unit1_vocabulary',
          component: Unit1_vocabulary
        },
        {
          path: 'reading',
          name: 'Unit1_reading',
          component: Unit1_reading,
          redirect: '/unit1/reading/main',
          children: [
            {
              path: 'exercise',
              name: 'Unit1_reading_exercise',
              component: Unit1_reading_exercise
            },
            {
              path: 'main',
              name: "Unit1_reading_hooker",
              component: Unit1_reading_hooker
            }
          ]
        },
        {
          path: 'listening',
          name: 'Unit1_listening',
          component: Unit1_listening,
          redirect: {name: 'Unit1_listening_recording'},
          children: [
            {
              path: 'recording',
              name: 'Unit1_listening_recording',
              component: Unit1_listening_recording
            },
            {
              path: 'exercise',
              name: 'Unit1_listening_exercise',
              component: Unit1_listening_exercise
            }
          ]
        },
        {
          path: 'homework',
          name: 'Unit1_homework',
          component: Unit1_homework
        }
      ]
    },
    {
      path: '*',
      redirect: {
        name: 'Unit1'
      }
    }
  ],
  mode: 'history'
})
