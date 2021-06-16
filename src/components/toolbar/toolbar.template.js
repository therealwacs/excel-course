function toButton(button) {
  const meta = `
    data-type="button"
    data-value='${JSON.stringify(button.value)}'
    `
  return `
    <div class="button ${button.active ? 'active' : ''}"
         ${meta}>
       <i class="material-icons"
         ${meta}>
          ${button.icon}
       </i>
    </div>
  `
}

export function createToolbar(s) {
  const buttons = [
    {
      value: {textAlign: 'left'},
      icon: 'format_align_left',
      active: s['textAlign'] === 'left'
    },
    {
      value: {textAlign: 'center'},
      icon: 'format_align_center',
      active: s['textAlign'] === 'center'
    },
    {
      value: {textAlign: 'right'},
      icon: 'format_align_right',
      active: s['textAlign'] === 'right'
    },
    {
      value: {fontWeight: s['fontWeight'] === 'bold' ? 'normal' : 'bold'},
      active: s['fontWeight'] === 'bold',
      icon: 'format_bold'
    },
    {
      value: {textDecoration: s['textDecoration'] === 'underline'
          ? 'none'
          : 'underline'},
      active: s['textDecoration'] === 'underline',
      icon: 'format_underline'
    },
    {
      value: {fontStyle: s['fontStyle'] === 'italic' ? 'normal' : 'italic'},
      active: s['fontStyle'] === 'italic',
      icon: 'format_italic'
    }
  ]

  return buttons.map(toButton).join('')
}
