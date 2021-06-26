import {storage} from '@core/utils'

function toHtml(key) {
  const pageId = key.split(':')[1]
  const model = storage(key)
  return `
    <li class="db__record">
       <a href="/#excel/${pageId}">${model.title}</a>
       <strong>
          ${new Date(model.openedDate).toLocaleDateString()}
          ${new Date(model.openedDate).toLocaleTimeString() }
       </strong>
    </li>
  `
}

function getAllKeys() {
  const keys = []
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i)
    if (!key.includes('excel')) {
      continue
    }
    keys.push(key)
  }

  return keys
}

export function createRecordsTable(records) {
  const keys = getAllKeys()
  // console.log(keys)

  if (!keys.length) {
    return `
      Вы пока  не создали ни одной таблицы
    `
  }

  return `
    <div class="db__list-header">
       <span>Название таблицы</span>
       <span>Дата открытия</span>
    </div>

    <ul class="db__list">
      ${keys.map(toHtml).join('')}
<!--      <li class="db__record">-->
<!--         <a href="#">Таблица #1</a>-->
<!--         <strong>12.06.2020</strong>-->
<!--      </li>-->
    </ul>
  `
}
