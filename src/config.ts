export const KAFKA_OPTS = {
    clientId: 'exmaple-app',
    brokers: ['broker:29092'],
    groupId: 'example',
  }
  
  export const REDIS_OPTS = {
    host: 'redis',
    port: 6379,
    db: 0,
  }
  
  export const ZEROMQ_OPTS = {
    host: 'tcp://zeromq-server',
    port: 3000,
  }