import { Admin, Consumer, EachMessagePayload, Kafka, Producer } from 'kafkajs'

import { KafkaConnectionOptions, BaseProvider, MessageFromEvent } from '../interfaces'

export class KafkaProvider implements BaseProvider {
  readonly providerName = 'kafka'

  private provider: Kafka
  private consumer: Consumer
  private producer: Producer
  private admin: Admin

  constructor(opts: KafkaConnectionOptions) {
    this.provider = new Kafka({
      clientId: opts.clientId,
      brokers: opts.brokers,
    })

    this.consumer = this.provider.consumer({ groupId: opts.groupId })
    this.producer = this.provider.producer()
    this.admin = this.provider.admin()

    this.createTopic().then()
  }

  async subscribe(topics: string[]): Promise<void> {
    await Promise.all(
      topics.map((topic: string) => this.consumer.subscribe({ topic, fromBeginning: true }))
    )
  }

  async readMessagesFromTopics(callback: (data: MessageFromEvent) => void) {
    await this.consumer.run({
      eachMessage: async ({ topic, message }: EachMessagePayload) => {
        const data = JSON.parse(message.value.toString()) as unknown as Record<string, unknown>
        callback({ data, provider: this.providerName, topic })
      },
    })
  }

  async createTopic() {
    try {
      await this.admin.connect()
      await this.admin.createTopics({ waitForLeaders: true, topics: [{ topic: 'test' }] })
    } catch (err) {
      console.log(err)
    }
  }

  async testPublisher(topic: string, message: string): Promise<void> {
    try {
      await this.producer.connect()
      await this.producer.send({
        topic: topic,
        messages: [{ value: JSON.stringify({ message }) }]
      })

    } catch (err) {
      console.log(err, 'error')
    }
  }
}