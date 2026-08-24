import { useEffect, useRef, useState } from 'react'
import { createBotInstance } from 'kore-web-sdk/headless'
import './App.css'

const ASSERTION =
  ''

const botInfo = {
  name: 'BOT_NAME',
  _id: 'st-xxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxx',
}

const botOptions = {
  koreAPIUrl: 'https://platform.kore.ai/api/',
  userIdentity: 'USER_IDENTITY',
  botInfo: {
    chatBot: botInfo.name,
    taskBotId: botInfo._id,
    uiVersion: 'v3',
  },
  resetWindow: function () {},
  assertionFn(options: any, callback: any) {
    options.assertion = ASSERTION
    callback(null, options)
  },
  loadHistory: true,
  openSocket: true,
}

function getBotText(data: any) {
  return data.message
    .map((item: any) => {
      const component = item.component

      if (component.type === 'template') {
        return 'Template - ' + JSON.stringify(component.payload.payload, null, 2)
      }

      return component.payload.text
    })
    .join('\n')
}

function App() {
  const botRef = useRef<any>(null)
  const pingTimerRef = useRef<number | null>(null)
  const [status, setStatus] = useState('Connecting...')
  const [input, setInput] = useState('Hi')
  const [messages, setMessages] = useState<string[]>([])

  function sendMessage(text: string) {
    const message = text.trim()
    const bot = botRef.current

    if (!message || !bot) return

    bot.sendMessage(
      {
        clientMessageId: Date.now(),
        resourceid: '/bot.message',
        message: { body: message },
      },
      (err: any) => {
        if (err) setMessages((current) => [...current, 'Error: ' + err])
      },
    )

    setMessages((current) => [...current, 'You: ' + message])
  }

  useEffect(() => {
    const bot = createBotInstance()
    botRef.current = bot

    bot.on('open', () => {
      setStatus('Connected')

      // ping pong to keep socket alive
      pingTimerRef.current = window.setInterval(() => {
        bot.sendMessage({ type: 'ping' }, () => {})
      }, 30000)
    })

    bot.on('message', (msg: any) => {
      const data = typeof msg.data === 'string' ? JSON.parse(msg.data) : msg.data

      if (data.from === 'bot' && data.type === 'bot_response') {
        setMessages((current) => [...current, 'Bot: ' + getBotText(data)])
      }
    })

    bot.on('error', (err: any) => {
      setStatus('Error')
      setMessages((current) => [...current, 'Error: ' + JSON.stringify(err)])
    })

    bot.on('close', () => {
      setStatus('Disconnected')
    })

    bot.init(botOptions)

    return () => {
      if (pingTimerRef.current) window.clearInterval(pingTimerRef.current)
      if (typeof bot.close === 'function') bot.close()
      if (typeof bot.disconnect === 'function') bot.disconnect()
    }
  }, [])

  function handleSubmit(event: any) {
    event.preventDefault()
    sendMessage(input)
    setInput('')
  }

  return (
    <main className="app">
      <section className="sample">
        <h1>Kore.ai Headless React Sample</h1>
        <p>Status: {status}</p>

        <form onSubmit={handleSubmit}>
          <input
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder="Type a message"
          />
          <button type="submit">Send</button>
        </form>

        <div className="messages">
          {messages.map((message, index) => (
            <pre key={index}>{message}</pre>
          ))}
        </div>
        <footer className="copyright">kore.ai 2026</footer>
      </section>
    </main>
  )
}

export default App
