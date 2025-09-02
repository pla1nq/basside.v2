export function initVideoModal() {
  // Создаём модальное окно
  const modal = document.createElement('div')
  modal.id = 'videoModal'
  modal.className = 'video-modal'
  modal.innerHTML = `
    <div class="video-modal__overlay"></div>
    <div class="video-modal__content">
      <button class="video-modal__close" aria-label="Close video">&times;</button>
      <iframe
        id="videoIframe"
        width="800"
        height="450"
        src=""
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
        allowfullscreen
      ></iframe>
    </div>
  `
  document.body.appendChild(modal)

  const iframe = modal.querySelector('#videoIframe')
  const overlay = modal.querySelector('.video-modal__overlay')
  const closeBtn = modal.querySelector('.video-modal__close')

  // Открытие модального окна
  function openModal(videoId) {
    iframe.src = `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1&iv_load_policy=3&disablekb=1`
    modal.classList.add('is-open')
    document.body.style.overflow = 'hidden' // блокируем прокрутку
  }

  // Закрытие модального окна
  function closeModal() {
    iframe.src = ''
    modal.classList.remove('is-open')
    document.body.style.overflow = '' // разблокируем прокрутку
  }

  closeBtn.addEventListener('click', closeModal)
  overlay.addEventListener('click', closeModal)

  return openModal
}
