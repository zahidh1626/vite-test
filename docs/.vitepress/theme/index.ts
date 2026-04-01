import Theme from 'vitepress/theme'
import 'virtual:group-icons.css'
import './styles.css'
import { setupSidebarAccordion } from './SidebarAccordion'

export default {
  ...Theme,
  enhanceApp() {
    setupSidebarAccordion()
  }
}
