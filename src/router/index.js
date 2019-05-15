import Vue from 'vue'
import Router from 'vue-router'
import ErrorPage from '@/components/ErrorPage'
// import HomePage from '@/components/unit1/HomePage'
// import Unit1Tests from '@/components/unit1/children/TestsContainer'
// import NavigationHolder from '@/components/unit1/NavigationHolder'
// import Unit1_grammar_video from '@/components/unit1/children/Grammar_video'

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

const Unit1_vocabulary = resolve => {
  require.ensure(['@/components/unit1/Vocabulary.vue'], () => {
    resolve(require('@/components/unit1/Vocabulary.vue'))
  })
}



Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/error',
      name: 'ErrorPage',
      component: ErrorPage
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
