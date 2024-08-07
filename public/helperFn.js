
const input = document.querySelector('#brand')

input.addEventListener('change', async(event) => {
  const res = await fetch(`/api/brand/${event.target.value}`)
  const data = await res.json()
  console.log(data)
})

