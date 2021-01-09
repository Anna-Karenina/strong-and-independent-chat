import Service from './Service';
import {Store} from '@core/store';
import {IStoreState} from '@/store';
import {Channel, WEBSOCKET_CHATS_URL} from '@core/http';
import {chatMessagesAPI} from '@core/api'
import {omit} from '@core/utils'
import {IChat} from '@/types';

interface IConnectOptions {
  store: Store<IStoreState>,
}

class MessageService extends Service<IConnectOptions> {
  private store: Store<IStoreState>
  private channels: Record<string, Channel>

  connect(opts: IConnectOptions): void {
    this.store = opts.store;
    this.channels = {};

    this.store.select(['chats'], (_, chats: IChat[]) => {
      const userId = this.store.state.user?.id || 0;
      this.onChatsUpdate(chats, userId);
    });
  }

  sendMessage(chatId: number, message: string) {
    const channel = this.channels[chatId];
    if (!channel) {
      throw new Error(`No channel for chat ${chatId}`);
    }

    channel.send(JSON.stringify({
      content: message,
      type: 'message',
    }));
  }

  private async onChatsUpdate(chats: IChat[], userId: number) {
    await Promise.all(
      chats
        .filter(({id}) => !this.channels[id])
        .map(({id}) => this.createChatChannel(id, userId))
    );

    const chatsMap: Record<string, boolean> = chats.reduce((acc, {id}) => ({...acc, [id]: true}), {});
    Object.keys(this.channels).forEach((chatId) => {
      if (!chatsMap[chatId]) {
        this.removeChatChannel(chatId);
      }
    });
  }

  private async createChatChannel(chatId: number, userId: number) {
    const {token} = await chatMessagesAPI.createChatToken(chatId) as {token: string};
    const wsUrl = getChatWsUrl(chatId, userId, token);

    const channel = new Channel(wsUrl);
    this.channels[chatId] = channel;
  }

  private removeChatChannel(chatId: string) {
    const channel = this.channels[chatId];
    channel.disconnect();

    this.channels = omit(this.channels, [chatId]) as Record<string, Channel>;
  }
}

const getChatWsUrl = (chatId: number, userId: number, token: string) => {
  return `${WEBSOCKET_CHATS_URL}/${userId}/${chatId}/${token}`;
}

export const messageService = new MessageService();
