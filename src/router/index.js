import Vue from 'vue'
import Router from 'vue-router'
import VueCookies from 'vue-cookies'
import ErrorPage from '@/components/ErrorPage'
import Unit1_vocabulary from '@/components/unit1/Vocabulary.vue'
import store from '../store'


Vue.use(VueCookies)
// Lazily load routes


//Admin components
const Administer = resolve => {
  require.ensure(['@/components/Administer'], () => {
    resolve(require('@/components/Administer'))
  })
}

const Admin = resolve => {
  require.ensure(['@/components/Administration/Admin'], () => {
    resolve(require('@/components/Administration/Admin'))
  })
}

const CoursesAdmin = resolve => {
  require.ensure(['@/components/Administration/AdminPages/CoursesAdmin'], () => {
    resolve(require('@/components/Administration/AdminPages/CoursesAdmin'))
  })
}

const EnglishCourseAdmin = resolve => {
  require.ensure(['@/components/Administration/AdminPages/EnglishCourses/EnglishCourseAdmin'], () => {
    resolve(require('@/components/Administration/AdminPages/EnglishCourses/EnglishCourseAdmin'))
  })
}

const ManageEnglishCourse = resolve => {
  require.ensure(['@/components/Administration/AdminPages/EnglishCourses/ManageEnglishCourse'], () => {
    resolve(require('@/components/Administration/AdminPages/EnglishCourses/ManageEnglishCourse'))
  })
}

const List = resolve => {
  require.ensure(['@/components/Administration/AdminPages/EnglishCourses/List'], () => {
    resolve(require('@/components/Administration/AdminPages/EnglishCourses/List'))
  })
}

const AddAndEdit = resolve => {
  require.ensure(['@/components/Administration/AdminPages/EnglishCourses/AddAndEdit'], () => {
    resolve(require('@/components/Administration/AdminPages/EnglishCourses/AddAndEdit'))
  })
}

// End of admin components

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

const Messages = resolve => {
  require.ensure(['@/components/main/messages/Messages'], () => {
    resolve(require('@/components/main/messages/Messages'))
  })
}

const Tasks = resolve => {
  require.ensure(['@/components/main/tasks/Tasks'], () => {
    resolve(require('@/components/main/tasks/Tasks'))
  })
}

const Friends = resolve => {
  require.ensure(['@/components/main/friends/Friends'], () => {
    resolve(require('@/components/main/friends/Friends'))
  })
}

const Notifications = resolve => {
  require.ensure(['@/components/main/notifications/Notifications'], () => {
    resolve(require('@/components/main/notifications/Notifications'))
  })
}
const Courses = resolve => {
  require.ensure(['@/components/main/Courses'], () => {
    resolve(require('@/components/main/Courses'))
  })
}

const EnglishFile = resolve => {
  require.ensure(['@/components/main/EnglishFile'], () => {
    resolve(require('@/components/main/EnglishFile'))
  })
}

const ListenAndRepeatModel = resolve => {
  require.ensure(['@/components/main/models/ListenAndRepeatModel'], () => {
    resolve(require('@/components/main/models/ListenAndRepeatModel'))
  })
}

const PutSpaces = resolve => {
  require.ensure(['@/components/main/models/PutSpaces'], () => {
    resolve(require('@/components/main/models/PutSpaces'))
  })
}


const Model = resolve => {
  require.ensure(['@/components/main/models/Model'], () => {
    resolve(require('@/components/main/models/Model'))
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

const Course = resolve => {
  require.ensure(['@/components/main/courses-sub/Course'], () => {
    resolve(require('@/components/main/courses-sub/Course'))
  })
}

const DragAndDrop = resolve => {
  require.ensure(['@/components/main/models/DragAndDropModel'], () => {
    resolve(require('@/components/main/models/DragAndDropModel'))
  })
}

const RestoreText = resolve => {
  require.ensure(['@/components/main/models/RestoreText'], () => {
    resolve(require('@/components/main/models/RestoreText'))
  })
}

// Typing test
const Typing = resolve => {
  require.ensure(['@/components/main/typing/Typing'], () => {
    resolve(require('@/components/main/typing/Typing'))
  })
}

const NewKeys = resolve => {
  require.ensure(['@/components/main/typing/NewKeys'], () => {
    resolve(require('@/components/main/typing/NewKeys'))
  })
}

const WordDrill = resolve => {
  require.ensure(['@/components/main/typing/WordDrill'], () => {
    resolve(require('@/components/main/typing/WordDrill'))
  })
}

const SentenceDrill = resolve => {
  require.ensure(['@/components/main/typing/SentenceDrill'], () => {
    resolve(require('@/components/main/typing/SentenceDrill'))
  })
}

const ParagraphDrill = resolve => {
  require.ensure(['@/components/main/typing/ParagraphDrill'], () => {
    resolve(require('@/components/main/typing/ParagraphDrill'))
  })
}

const TextDrill = resolve => {
  require.ensure(['@/components/main/typing/TextDrill'], () => {
    resolve(require('@/components/main/typing/TextDrill'))
  })
}

const TypingResult = resolve => {
  require.ensure(['@/components/main/typing/ResultPage'], () => {
    resolve(require('@/components/main/typing/ResultPage'))
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
      component: Administer,
      beforeEnter: (to, from, next)=> {
        if (!store.getters.isAdminUser) {
          next()
        }
        else {
          next({name: 'courses-admin'})
        }
      }
    },
    {
      path: '/profile/:userId',
      name: 'profile',
      component: Profile,
      redirect: {name: "dashboard", params: {userId: store.state.userData.user_id}},
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
        },
        {
          path: 'notifications',
          name: 'notifications',
          component: Notifications
        },
        {
          path: 'messages',
          name: 'messages',
          component: Messages
        },
        {
          path: 'tasks',
          name: 'tasks',
          component: Tasks
        },
        {
          path: 'friends',
          name: 'friends',
          component: Friends
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
      path: '/english-file',
      name: 'english-file',
      component: EnglishFile,
      children: [
        {
          path: '/course/:id',
          name: 'course',
          component: Course
        },
        {
          path: '/model',
          name: 'learning-models',
          component: Model,
          children: [
            {
              path: 'listen-and-repeat/:id',
              name: 'listen-and-repeat-model',
              component: ListenAndRepeatModel
            }
          ]
        },
        {
          path: '/drag-and-drop',
          name: 'drag-and-drop',
          component: DragAndDrop,
          children: [
            {
              path: '/model/restore-text/:id',
              name: 'restore-text',
              component: RestoreText
            }
          ]
        },
        {
          path: '/put-spaces',
          name: 'put-spaces',
          component: PutSpaces
        }
      ]
    },
    {
      path: '/admin-page',
      name: 'admin-page',
      component: Admin,
      redirect: {name: 'courses-admin'},
      children: [
        {
          path: 'courses',
          name: 'courses-admin',
          component: CoursesAdmin
        },
        {
          path: 'english-course/:course',
          name: 'english-course-admin',
          component: EnglishCourseAdmin
        },
        {
          path: 'english-course/:course/:unit',
          name: 'english-course-manage',
          component: ManageEnglishCourse
        },
        {
          path: 'english-course/:course/:unit/add-edit/:part/:type',
          name: 'english-course-add',
          component: AddAndEdit
        },
        {
          path: 'english-course/:course/:unit/list/:part/:type',
          name: 'english-course-list',
          component: List
        }
      ],
      beforeEnter: (to, from, next)=> {
        if (store.getters.isAdminUser) {
          next()
        }
        else {
          next({name: 'administer'})
        }
      }
    },
    {
      path: '/typing',
      name: 'typing',
      component: Typing,
      children: [
        {
          path: 'new-keys',
          name: 'new-keys',
          component: NewKeys
        },
        {
          path: 'word-drill',
          name: 'word-drill',
          component: WordDrill
        },
        {
          path: 'sentence-drill',
          name: 'sentence-drill',
          component: SentenceDrill
        },
        {
          path: 'paragraph-drill',
          name: 'paragraph-drill',
          component: ParagraphDrill
        },
        {
          path: 'text-drill',
          name: 'text-drill',
          component: TextDrill
        },
        {
          path: 'result',
          name: 'typing-result',
          component: TypingResult,
          beforeEnter: function (to, from, next) {
            if (store.state.typingPage === null) {
              next ({name: "MainPage"})
            }
            else {
              next()
            }
          }
        }
      ]
    }
  ],
  mode: 'history'
})
