import {$} from '../core/dom'

export function Loader() {
  return $.create('div', 'loader-wrapper')
      .html(`<div class="loader">Loading...</div>`)
}
