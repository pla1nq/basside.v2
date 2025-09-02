function scrollUpModule() {
  const scrollUp = document.querySelector('.scroll-up')

  window.addEventListener('scroll', checkHeight)

  function checkHeight() {
    if (window.scrollY >= 300) {
      scrollUp.classList.add('is-active')
    } else {
      scrollUp.classList.remove('is-active')
    }
  }

  scrollUp.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  })
}

export default scrollUpModule
