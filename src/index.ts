import { serve } from '@hono/node-server'
import { Hono } from 'hono'

const app = new Hono()

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.get('/slow', (c) => {

  // generate random number from 0 to 900000
  const random = Math.floor(Math.random() * 4)
  const times = [
    50000,
    100,
    100,
    100,
    100,
  ]
  const sleepTime = times[random]

  console.log('wait for', sleepTime, 'ms')
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(c.text(`waited for ${sleepTime}ms\n`))
    }, sleepTime)
  })
})

app.get('/fast', (c) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(c.text('Fast response'))
    }, 500)
  })
})


const port = 3000
console.log(`Server is running on port ${port}\n`)

serve({
  fetch: app.fetch,
  port
})
