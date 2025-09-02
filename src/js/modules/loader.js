function loaderModule() {
  return new Promise(resolve => {
    const loader = document.querySelector('#loader');

    // Показываем лоадер
    loader.classList.add('is-active');
    document.body.style.overflow = 'hidden'; // блокируем скролл

    function hideLoader() {
      setTimeout(() => {
        loader.classList.remove('is-active');
        document.body.style.overflow = ''; // восстанавливаем скролл

        resolve(); // сигнал, что лоадер завершился
      }, 800);
    }

    window.addEventListener('load', hideLoader);
  });
}

export default loaderModule;
