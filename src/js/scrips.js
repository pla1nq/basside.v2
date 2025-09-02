// Loader
import loaderModule from './modules/loader'

// Styles
import '/src/styles/styles.scss'

// Mobile Menu
import mobileMenuModal from './modules/mobileMenu'

// Scroll to up
import scrollUpModule from './modules/scrollUp'

// Animation on scroll
import scrollAnimationModule from './modules/animateOnScroll'

// // Tabs
import tabsModule from './modules/tabs'

// Tabs + Video
import tabsVideoModule from './modules/tabsVideoModule'

// Сначала ждём завершения лоадера
loaderModule().then(() => {
  // Потом запускаем остальные модули
  mobileMenuModal()
  scrollUpModule()
  scrollAnimationModule()
  tabsModule() // переключение вкладок
  tabsVideoModule() // карточки + видео
})
