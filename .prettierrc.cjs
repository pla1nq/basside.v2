// npm install --save-dev prettier

// Prettier configuration
module.exports = {
  // Строки и кавычки
  singleQuote: true, // Использовать одинарные кавычки вместо двойных
  jsxSingleQuote: true, // Использовать одинарные кавычки в JSX атрибутах
  semi: false, // Не ставить точки с запятой в конце строк
  trailingComma: 'es5', // Добавлять висящие запятые в объектах и массивах

  // Отступы и табуляция
  tabWidth: 2, // Использовать 2 пробела для отступа
  useTabs: false, // Использовать пробелы вместо табов для отступов

  // Длина и переносы
  printWidth: 80, // Максимальная длина строки перед переносом (80 символов)

  // Скобки и форматирование
  bracketSpacing: true, // Добавлять пробелы между фигурными скобками и содержимым
  arrowParens: 'avoid', // Не использовать скобки для одного параметра стрелочной функции
  bracketSameLine: false, // Размещать закрывающую скобку на новой строке для JSX/HTML

  // JSX/HTML форматирование
  proseWrap: 'preserve', // Сохранять переносы строк в JSX
  htmlWhitespaceSensitivity: 'css', // Чувствительность к пробелам как в CSS

  // Встроенные языки
  embeddedLanguageFormatting: 'auto', // Автоматически форматировать встроенные языки (CSS в JS)
}
