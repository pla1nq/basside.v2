function scrollAnimationModule({ instant = false } = {}) {
  const animElements = document.querySelectorAll('[data-js-animate]')

  if (instant) {
    // Все сразу активны
    animElements.forEach(animElement => {
      animElement.classList.add('is-active')
    })
    return
  }

  // Иначе используем IntersectionObserver
  const options = {
    root: null,
    rootMargin: '0px 0px 0px 0px',
    threshold: 0.2,
  }

  const callback = (entries, observer) => {
    entries.forEach(entry => {
      const currentElement = entry.target
      if (entry.isIntersecting) {
        currentElement.classList.add('is-active')
        observer.unobserve(currentElement)
      }
    })
  }

  const observer = new IntersectionObserver(callback, options)

  animElements.forEach(animElement => {
    observer.observe(animElement)
  })
}

export default scrollAnimationModule
