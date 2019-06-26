import Vue from 'vue'
import Router from 'vue-router'
import VueCookies from 'vue-cookies'
import ErrorPage from '@/components/ErrorPage'
import Unit1_vocabulary from '@/components/unit1/Vocabulary.vue'
import store from '../store'
import AuthHandler from '../Authorization/AuthHandler'


Vue.use(VueCookies)
// Lazily load routes
const Administer = resolve => {
  require.ensure(['@/components/Administer'], () => {
    resolve(require('@/components/Administer'))
  })
}

const UnitsHandler = resolve => {
  require.ensure(['@/components/Administration/UnitsHandler'], () => {
    resolve(require('@/components/Administration/UnitsHandler'))
  })
}

const MainPage = resolve => {
  require.ensure(['@/components/MainPage'], () => {
    resolve(require('@/components/MainPage'))
  })
}

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

const Profile = resolve => {
  require.ensure(['@/components/Profile'], () => {
    resolve(require('@/components/Profile'))
  })
}

const Dashboard = resolve => {
  require.ensure(['@/components/main/dashboard/Dashboard'], () => {
    resolve(require('@/components/main/dashboard/Dashboard'))
  })
}

const Settings = resolve => {
  require.ensure(['@/components/main/settings/Settings'], () => {
    resolve(require('@/components/main/settings/Settings'))
  })
}
const Courses = resolve => {
  require.ensure(['@/components/main/Courses'], () => {
    resolve(require('@/components/main/Courses'))
  })
}
const AllCourses = resolve => {
  require.ensure(['@/components/main/courses-sub/AllCourses'], () => {
    resolve(require('@/components/main/courses-sub/AllCourses'))
  })
}
const LearningRoute = resolve => {
  require.ensure(['@/components/main/courses-sub/LearningRoute'], () => {
    resolve(require('@/components/main/courses-sub/LearningRoute'))
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
      path: '/en',
      name: 'MainPage',
      component: MainPage
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
        name: 'MainPage'
      }
    },
    {
      path: '/administer',
      name: 'administer',
      component: Administer
    },
    {
      path: '/profile',
      name: 'profile',
      component: Profile,
      redirect: {name: "dashboard"},
      beforeEnter (to, from, next) {
        if (VueCookies.get('userData')) {
          if (VueCookies.get('userData')["token"]) {
            next()
          }
          else {
            next({name: 'MainPage'})
          }
        }
        else {
          next({name: 'MainPage'})
        }
      },
      children: [
        {
          path: 'dashboard',
          name: 'dashboard',
          component: Dashboard
        },
        {
          path: 'settings',
          name: 'settings',
          component: Settings
        }
      ]
    },
    {
      path: '/courses',
      name: 'courses',
      component: Courses,
      redirect: {name: 'all-courses'},
      children: [
        {
        path: 'all-courses',
        name: 'all-courses',
        component: AllCourses
        },
        {
          path: 'learning-route',
          name: 'learning-route',
          component: LearningRoute
        }
    ]
    },
    {
      path: '/admin-page',
      name: 'admin-page',
      component: UnitsHandler,
      beforeEnter: (to, from, next)=> {
        if(VueCookies.isKey('userData')) {
          if (VueCookies.get('userData')["token"])
            
            next()
        }
        else {
          next({name: 'administer'})
        }
      }
    }
  ],
  mode: 'history'
})
