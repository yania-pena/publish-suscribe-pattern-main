import { KafkaProvider, RedisProvider } from './providers'

import { KAFKA_OPTS, REDIS_OPTS } from './config'

const kafka = new KafkaProvider(KAFKA_OPTS)
const redis = new RedisProvider(REDIS_OPTS)

export const msg = () => {
  setInterval(async () => {
    await kafka.testPublisher('test', 'hola from kafka')
    await redis.testPublisher('test', 'hola from redis')
  }, 5000)
}