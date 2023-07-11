
import { MessageFromEvent } from './interfaces';

export const dispatcher = (message: MessageFromEvent) => {
  console.log(message)
}