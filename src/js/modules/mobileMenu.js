export default function mobileMenuModal() {
  const burgerButton = document.querySelector('.burger-button')
  const mobileMenu = document.querySelector('.mobile-nav')
  const mobileLinks = mobileMenu.querySelectorAll('.mobile-nav__link')
  const headerLinks = document.querySelectorAll('.header__menu-link')
  const allLinks = [...mobileLinks, ...headerLinks]
  const sections = document.querySelectorAll('section[id]')
  let isScrollingByClick = false // флаг ручного скролла

  function showMobileMenu() {
    mobileMenu.classList.add('is-active')
    burgerButton.classList.add('is-active')
    document.body.classList.add('is-lock')
    document.documentElement.classList.add('is-lock')
    burgerButton.setAttribute('aria-expanded', 'true')
  }

  function hideMobileMenu() {
    mobileMenu.classList.remove('is-active')
    burgerButton.classList.remove('is-active')
		document.body.classList.remove('is-lock')
    document.documentElement.classList.remove('is-lock')
    burgerButton.setAttribute('aria-expanded', 'false')
  }

  function smoothScroll(targetId) {
    const targetElement = document.querySelector(targetId)
    if (targetElement) {
      const headerHeight = document.querySelector('.header').offsetHeight
      const targetPosition = targetElement.offsetTop - headerHeight - 20
      window.scrollTo({ top: targetPosition, behavior: 'smooth' })
    }
  }

  function updateActiveLinks() {
    if (isScrollingByClick) return

    const scrollPosition = window.scrollY + 100
    let activeFound = false

    sections.forEach(section => {
      const top = section.offsetTop
      const height = section.offsetHeight
      if (scrollPosition >= top && scrollPosition < top + height) {
        const id = section.getAttribute('id')
        allLinks.forEach(link => {
          const match = link.getAttribute('href') === `#${id}`
          link.classList.toggle('is-active', match)
          if (match) activeFound = true
        })
      }
    })

    // если ни одна секция не активна — убираем класс у всех ссылок
    if (!activeFound) {
      allLinks.forEach(link => link.classList.remove('is-active'))
    }
  }

  // переключение бургера
  burgerButton.addEventListener('click', () => {
    mobileMenu.classList.contains('is-active')
      ? hideMobileMenu()
      : showMobileMenu()
  })

  // закрытие по Escape
  window.addEventListener('keydown', e => {
    if (e.code === 'Escape') hideMobileMenu()
  })

  // обработка кликов по ссылкам
  allLinks.forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault()
      const targetId = link.getAttribute('href')

      // вручную подсветили кликнутую ссылку
      allLinks.forEach(l => l.classList.remove('is-active'))
      link.classList.add('is-active')

      hideMobileMenu()

      // включаем флаг
      isScrollingByClick = true
      smoothScroll(targetId)

      // через время снимаем флаг (примерно длительность scroll-behavior)
      setTimeout(() => {
        isScrollingByClick = false
      }, 800)
    })
  })

  window.addEventListener('load', updateActiveLinks)
  window.addEventListener('scroll', updateActiveLinks)
}
