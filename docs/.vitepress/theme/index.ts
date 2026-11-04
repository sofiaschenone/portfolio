import DefaultTheme from 'vitepress/theme'
import LiveStats from './components/LiveStats.vue'
import TechPillars from './components/TechPillars.vue'
import GitHubProjects from './components/GitHubProjects.vue'
import RecruiterGame from './components/RecruiterGame.vue'
import './style.css'

export default {
  ...DefaultTheme,
  enhanceApp({ app }) {
    app.component('LiveStats', LiveStats)
    app.component('TechPillars', TechPillars)
    app.component('GitHubProjects', GitHubProjects)
    app.component('RecruiterGame', RecruiterGame)
  }
}
