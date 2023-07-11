import Redis from 'ioredis'

import { RedisConnectionOptions, BaseProvider, MessageFromEvent } from '../interfaces'

export class RedisProvider implements BaseProvider {
  readonly providerName = 'redis'
  private provider: Redis

  constructor(opts: RedisConnectionOptions) {
    this.provider = new Redis({
      port: opts.port,
      host: opts.host,
      family: opts.family,
      password: opts.password,
      db: opts.db,
    })
  }

  async subscribe(topics: string[]): Promise<void> {
    await this.provider.subscribe(...topics)
  }

  async readMessagesFromTopics(callback: (data: MessageFromEvent) => void): Promise<void> {
    this.provider.on('message', async (topic: string, message: string) => {
      const data = JSON.parse(message) as unknown as Record<string, unknown>
      callback({ data, provider: this.providerName, topic })
    })
  }

  async testPublisher(topic: string, message: string): Promise<void> {
    this.provider.publish(topic, JSON.stringify({ message }))
  }
}