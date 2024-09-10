declare module 'websocket' {
    export class client {
      constructor();
      connect(url: string, protocols?: string | string[], origin?: string, headers?: { [key: string]: string }, requestOptions?: any): void;
      on(event: 'connect', cb: (connection: connection) => void): void;
      on(event: 'connectFailed', cb: (error: Error) => void): void;
    }
  
    export class connection {
      sendUTF(data: string): void;
      sendBytes(buffer: Buffer): void;
      close(reasonCode?: number, description?: string): void;
      on(event: 'message', cb: (message: IMessage) => void): void;
      on(event: 'error', cb: (error: Error) => void): void;
      on(event: 'close', cb: (code: number, desc: string) => void): void;
    }
  
    export interface IMessage {
      type: 'utf8' | 'binary';
      utf8Data?: string;
      binaryData?: Buffer;
    }
  }
  