import * as events from 'events'

import { dispatcher } from './dispatcher'

import { KafkaProvider, ZeromqProvider, RedisProvider} from './providers'

import { REDIS_OPTS, KAFKA_OPTS, ZEROMQ_OPTS } from './config'

import { MessageFromEvent } from './interfaces'

const eventName = 'main'
const topics = ['test']
const event = new events.EventEmitter()
const provider = [
  new RedisProvider(REDIS_OPTS),
  new KafkaProvider(KAFKA_OPTS),
  new ZeromqProvider(ZEROMQ_OPTS),
]

event.on(eventName, dispatcher);
const sendMessageToFromEvent = (message: MessageFromEvent) => {
  event.emit(eventName, message)
}



const main = async () => {
  await Promise.all(
    provider.map(async (p) => {
      await p.subscribe(topics)
      await p.readMessagesFromTopics(sendMessageToFromEvent)
    })
  )
}

main()

