const cols = document.querySelectorAll('.col')
const closeButton = document.querySelector('.fa-times');
const hint = document.querySelector('.hint');

closeButton.addEventListener('click', () => {
    hint.style.display = 'none';
});

document.addEventListener('keydown', event => {
    event.preventDefault()
    if (event.code.toLowerCase() === 'space') {
        setRandomColors()
    }
})

document.addEventListener('click', event => {
    const type = event.target.dataset.type

    if (type === 'lock') {
        const node = event.target.tagName.toLowerCase() === 'i'
            ? event.target 
            : event.target.children[0]

        node.classList.toggle('fa-lock-open')
        node.classList.toggle('fa-lock')
    } else if (type === 'copy') {
        copyToClipboard(event.target.textContent)
    }
})

function generateRandomColor() {
    let color = ''
    const hexCodes = '0123456789ABCDEF'

    for (let i = 0; i < 6; i++) {
        color += hexCodes[Math.floor(Math.random() * hexCodes.length)].toLowerCase()
    }
    return '#' + color
}

function setRandomColors(isInitial) {
    const colors = isInitial ? getColorsFromHash() : []

    cols.forEach((col, index) => {
        const isLocked = col.querySelector('i').classList.contains('fa-lock')
        const text = col.querySelector('h2')
        const button = col.querySelector('button')

        if (isLocked) {
            colors.push(text.textContent)
            return
        }

        const color = isInitial
         ? colors[index]
          ? colors[index] 
          : generateRandomColor() 
        : generateRandomColor()

        if (!isInitial) {
            colors.push(color)
        }


        text.textContent = color
        col.style.background = color

        setTextColor(text, color)
        setTextColor(button, color)
    })

    updateColorsHash(colors)
}

function copyToClipboard(text) {
    return navigator.clipboard.writeText(text)
}

function setTextColor(text, color) {
    const luminance = chroma(color).luminance()
    text.style.color = luminance > 0.5 ? 'black' : 'white'
}

function updateColorsHash(colors = []) {
    document.location.hash = colors
      .map((col) => {
        return col.toString().substring(1)
      })
      .join('-')
  }

function getColorsFromHash() {
    if (document.location.hash.length > 1) {
        return document.location.hash.substring(1).split('-').map(col => '#' + col)
    }
    return []
}

setRandomColors(true)