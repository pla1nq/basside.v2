import videoData from '../videos.json'
import { initVideoModal } from './videoModal.js'

// Импортируем картинки
import heroBg from '../../assets/images/hero/hero-bg.png'

// Словарь доступных картинок
const images = {
  'hero-bg.png': heroBg,
}

export default function tabsVideoModule() {
  const openModal = initVideoModal()
  const tabsContent = document.querySelectorAll('[data-js-tabs-content]')
  const tabsButtons = document.querySelectorAll('[data-js-tabs-button]')
  const keys = Object.keys(videoData)

  function renderTabContent(index) {
    const tab = tabsContent[index]
    const list = tab.querySelector('.tabs__content-list')
    const videos = videoData[keys[index]] || []

    // Очистка списка и удаление старой кнопки More
    list.innerHTML = ''
    const oldMoreBtn = tab.querySelector('.tabs__more-btn')
    if (oldMoreBtn) oldMoreBtn.remove()

    // Первые 4 видео
    const initialVideos = videos.slice(0, 4)
    const remainingVideos = videos.slice(4)

    // Рендер первых
    initialVideos.forEach(v => {
      const li = document.createElement('li')
      li.className = 'tabs__content-item'
      li.innerHTML = `
        <article class="work-card" data-video-id="${v.videoId}">
          <figure class="work-card__figure">
            <img class="work-card__preview" src="${images[v.src]}" alt="${v.alt}" loading="lazy" />
            <button class="work-card__play" aria-label="Watch video">
              <svg class="work-card__play-icon">
                <use xlink:href="icons/sprites.svg#play"></use>
              </svg>
            </button>
          </figure>
        </article>
      `
      list.appendChild(li)
      const card = li.querySelector('.work-card')
      card.addEventListener('click', () => openModal(v.videoId))
    })

    // Если есть ещё видео
    if (remainingVideos.length) {
      const moreBtn = document.createElement('button')
      moreBtn.className = 'tabs__more-btn btn'
      moreBtn.textContent = 'More'
      list.after(moreBtn)

      moreBtn.addEventListener('click', () => {
        remainingVideos.forEach((v, i) => {
          const li = document.createElement('li')
          li.className = 'tabs__content-item'
          li.innerHTML = `
            <article class="work-card is-hidden" data-video-id="${v.videoId}">
              <figure class="work-card__figure">
                <img class="work-card__preview" src="${images[v.src]}" alt="${v.alt}" loading="lazy" />
                <button class="work-card__play" aria-label="Watch video">
                  <svg class="work-card__play-icon">
                    <use xlink:href="icons/sprites.svg#play"></use>
                  </svg>
                </button>
              </figure>
            </article>
          `
          list.appendChild(li)
          const card = li.querySelector('.work-card')
          card.addEventListener('click', () => openModal(v.videoId))

          // Плавное появление
          setTimeout(() => {
            card.classList.remove('is-hidden')
            card.classList.add('is-visible')
          }, i * 100)
        })

        moreBtn.remove()
      })
    }
  }

  // Рендер активной вкладки при загрузке
  const activeIndex = [...tabsButtons].findIndex(btn =>
    btn.classList.contains('is-active')
  )
  if (activeIndex !== -1) renderTabContent(activeIndex)

  // Перерисовываем контент при переключении вкладки
  tabsButtons.forEach((btn, index) => {
    btn.addEventListener('click', () => renderTabContent(index))
  })
}
