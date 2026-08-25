import './style.css'

const catImage = document.querySelector<HTMLImageElement>('#cat-img')
const nextCatButton = document.querySelector<HTMLButtonElement>('#next-cat')

if (!catImage || !nextCatButton) {
  throw new Error('Cat image or button is missing from the page')
}

nextCatButton.addEventListener('click', () => {
  const catUrl = new URL('https://cataas.com/cat')
  catUrl.searchParams.set('t', Date.now().toString())
  catImage.src = catUrl.toString()
})
