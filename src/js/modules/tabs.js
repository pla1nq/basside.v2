function tabsModule() {
  const rootElements = document.querySelectorAll('[data-js-tabs]')

  rootElements.forEach(root => {
    const buttons = root.querySelectorAll('[data-js-tabs-button]')
    const contents = root.querySelectorAll('[data-js-tabs-content]')
    let activeIndex = [...buttons].findIndex(btn =>
      btn.classList.contains('is-active')
    )
    const lastIndex = buttons.length - 1

    const updateUI = () => {
      buttons.forEach((btn, i) => {
        const isActive = i === activeIndex
        btn.classList.toggle('is-active', isActive)
        btn.setAttribute('aria-selected', isActive)
        btn.setAttribute('tabindex', isActive ? '0' : '-1')
      })

      contents.forEach((content, i) => {
        content.classList.toggle('is-active', i === activeIndex)
      })
    }

    const activateTab = index => {
      activeIndex = index
      updateUI()
      buttons[index].focus()
    }

    const previousTab = () =>
      activateTab(activeIndex === 0 ? lastIndex : activeIndex - 1)
    const nextTab = () =>
      activateTab(activeIndex === lastIndex ? 0 : activeIndex + 1)
    const firstTab = () => activateTab(0)
    const lastTabFunc = () => activateTab(lastIndex)

    buttons.forEach((btn, i) => {
      btn.addEventListener('click', () => activateTab(i))
    })

    root.addEventListener('keydown', event => {
      const { code, metaKey } = event

      if (metaKey && code === 'ArrowLeft') return firstTab()
      if (metaKey && code === 'ArrowRight') return lastTabFunc()

      switch (code) {
        case 'ArrowLeft':
          previousTab()
          break
        case 'ArrowRight':
          nextTab()
          break
        case 'Home':
          firstTab()
          break
        case 'End':
          lastTabFunc()
          break
      }
    })

    updateUI()
  })
}

export default tabsModule
