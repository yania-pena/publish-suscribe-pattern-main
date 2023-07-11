export interface MessageFromEvent {
    data: Record<string, unknown>
    topic: string
    provider: string
  }
  
  export interface BaseProvider {
    readonly providerName: string
    subscribe(topics: string[]): Promise<void>
    readMessagesFromTopics(callback: (data: MessageFromEvent) => void)
  }
  
  export interface KafkaConnectionOptions {
    clientId: string
    brokers: string[]
    groupId: string
  }
  
  export interface RedisConnectionOptions {
    host: string
    port: number
    db: number
    family?: number // 4 (IPv4) or 6 (IPv6)
    password?: string
  }
  
  export interface ZeromqConnectionOptions {
    host: string
    port: number
  }