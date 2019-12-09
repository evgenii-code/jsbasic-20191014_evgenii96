const END = 'завершенно'; // данные текст нужно выводить если событие прошло
const MS_IN_SEC = 1000; // количество миллисекнуд в секнуден
const MS_IN_MINUTE = 60 * MS_IN_SEC;
const MS_IN_HOUR = 60 * MS_IN_MINUTE;
const MS_IN_DAY = 24 * MS_IN_HOUR;


class TimeLeft {
  /**
   * @param el {Element} - ссылка на корневой элемент
   */
  constructor(el) {
    this.el = el;
    let result = ``;

    let from = this.el.dataset.from;
    let to = this.el.dataset.to;

    if (!from || !to) {
      result = END;
    } else {
      let timeLeft = this.parseDate(to) - this.parseDate(from);
      let arrayOfLeftTime = [];

      if (timeLeft < 0) {
        result = END;
      } else {
        arrayOfLeftTime[0] = `${Math.floor(timeLeft / MS_IN_DAY)}`;
        arrayOfLeftTime[1] = `${Math.floor((timeLeft / MS_IN_HOUR) - +arrayOfLeftTime[0] * 24)}`;
        arrayOfLeftTime[2] = `${Math.floor((timeLeft / MS_IN_MINUTE) - ((+arrayOfLeftTime[0] * 24 * 60) + (+arrayOfLeftTime[1] * 60)))}`;
        arrayOfLeftTime[3] = `${Math.floor((timeLeft / MS_IN_SEC) - ((+arrayOfLeftTime[0] * 24 * 60 * 60) + (+arrayOfLeftTime[1] * 60 * 60) + (arrayOfLeftTime[2] * 60)))}`;

        let resultTime = [];

        let timeWords = [
          [` день`, ` дня`, ` дней`],
          [` час`, ` часа`, ` часов`],
          [` минута`, ` минуты`, ` минут`],
          [` секунда`, ` секунды`, ` секунд`],
        ];

        for (let j = 0; j < arrayOfLeftTime.length; j++) {
          switch (arrayOfLeftTime[j][arrayOfLeftTime[j].length - 1]) {
          case `1`:
            resultTime[j] = arrayOfLeftTime[j] + timeWords[j][0];
            break;
          case `2`:
          case `3`:
          case `4`:
            resultTime[j] = arrayOfLeftTime[j] + timeWords[j][1];
            break;
          default:
            resultTime[j] = arrayOfLeftTime[j] + timeWords[j][2];
            break;
          }

          switch (arrayOfLeftTime[j]) {
          case `11`:
          case `12`:
          case `13`:
          case `14`:
            resultTime[j] = arrayOfLeftTime[j] + timeWords[j][2];
            break;
          }
        }

        resultTime = resultTime.filter(item => item[0] != `0`);

        result = resultTime.join(`, `);
      }
    }

    el.textContent = result;
  }

  /**
   * Форматируем строку в дату. Чтобы написать данный метод нужно почитать главу http://learn.javascript.ru/datetime
   * @param {string} str - строка с датой в формате `year.month.day hours:minutes:second`
   * @return {Date} - возвращаем объект даты
   */
  parseDate(str) {
    return new Date(Date.parse(str
      .split('.')
      .join('-')
      .split(' ')
      .join('T')));
  }

  /**
   * Статчный метод, который можно вызывать не посредственно от класса, а не от объекта.
   * Подробнее здесь http://learn.javascript.ru/es-class#staticheskie-svoystva
   * @param el
   */
  static create(el) {
    return new TimeLeft(el);
  }
}

window.TimeLeft = TimeLeft;
