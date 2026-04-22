import {
	IDataObject,
	IExecuteFunctions,
	IHttpRequestOptions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	NodeOperationError,
} from 'n8n-workflow';

export class TelegramReaction implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Telegram Reaction',
		name: 'telegramReaction',
		icon: 'file:telegramReaction.svg',
		group: ['output'],
		version: 1,
		subtitle: '={{$parameter["operation"]}}',
		description: 'Send reactions to Telegram messages (setMessageReaction)',
		defaults: {
			name: 'Telegram Reaction',
		},
		// Use string literals for inputs/outputs to keep compatibility
		// across n8n v1.x versions where NodeConnectionType may differ.
		inputs: ['main'],
		outputs: ['main'],
		credentials: [
			{
				name: 'telegramReactionApi',
				required: true,
			},
		],
		properties: [
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Set Reaction',
						value: 'setReaction',
						description: 'Set or remove a reaction on a message',
						action: 'Set a reaction on a message',
					},
				],
				default: 'setReaction',
			},
			{
				displayName: 'Chat ID',
				name: 'chatId',
				type: 'string',
				default: '',
				required: true,
				description:
					'Unique identifier for the target chat or username of the target channel (e.g. @channelusername)',
			},
			{
				displayName: 'Message ID',
				name: 'messageId',
				type: 'number',
				default: 0,
				required: true,
				description: 'Identifier of the target message',
			},
			{
				displayName: 'Reaction Type',
				name: 'reactionType',
				type: 'options',
				options: [
					{ name: 'Emoji', value: 'emoji' },
					{ name: 'Custom Emoji', value: 'custom_emoji' },
					{ name: 'None (Remove Reactions)', value: 'none' },
				],
				default: 'emoji',
			},
			{
				displayName: 'Emoji',
				name: 'emoji',
				type: 'options',
				displayOptions: {
					show: {
						reactionType: ['emoji'],
					},
				},
				options: [
					{ name: '👍 Thumbs Up', value: '👍' },
					{ name: '👎 Thumbs Down', value: '👎' },
					{ name: '❤ Heart', value: '❤' },
					{ name: '🔥 Fire', value: '🔥' },
					{ name: '🥰 Smiling Face With Hearts', value: '🥰' },
					{ name: '👏 Clapping Hands', value: '👏' },
					{ name: '😁 Beaming Face', value: '😁' },
					{ name: '🤔 Thinking Face', value: '🤔' },
					{ name: '🤯 Mind Blown', value: '🤯' },
					{ name: '😱 Screaming', value: '😱' },
					{ name: '🤬 Cursing', value: '🤬' },
					{ name: '😢 Crying', value: '😢' },
					{ name: '🎉 Party Popper', value: '🎉' },
					{ name: '🤩 Star-Struck', value: '🤩' },
					{ name: '🤮 Vomiting', value: '🤮' },
					{ name: '💩 Pile of Poo', value: '💩' },
					{ name: '🙏 Folded Hands', value: '🙏' },
					{ name: '👌 OK Hand', value: '👌' },
					{ name: '🕊 Dove', value: '🕊' },
					{ name: '🤡 Clown', value: '🤡' },
					{ name: '🥱 Yawning', value: '🥱' },
					{ name: '🥴 Woozy', value: '🥴' },
					{ name: '😍 Heart Eyes', value: '😍' },
					{ name: '🐳 Whale', value: '🐳' },
					{ name: '❤‍🔥 Heart on Fire', value: '❤‍🔥' },
					{ name: '🌚 New Moon Face', value: '🌚' },
					{ name: '🌭 Hot Dog', value: '🌭' },
					{ name: '💯 Hundred', value: '💯' },
					{ name: '🤣 ROFL', value: '🤣' },
					{ name: '⚡ High Voltage', value: '⚡' },
					{ name: '🍌 Banana', value: '🍌' },
					{ name: '🏆 Trophy', value: '🏆' },
					{ name: '💔 Broken Heart', value: '💔' },
					{ name: '🤨 Raised Eyebrow', value: '🤨' },
					{ name: '😐 Neutral Face', value: '😐' },
					{ name: '🍓 Strawberry', value: '🍓' },
					{ name: '🍾 Champagne', value: '🍾' },
					{ name: '💋 Kiss Mark', value: '💋' },
					{ name: '🖕 Middle Finger', value: '🖕' },
					{ name: '😈 Smiling Devil', value: '😈' },
					{ name: '😴 Sleeping', value: '😴' },
					{ name: '😭 Loudly Crying', value: '😭' },
					{ name: '🤓 Nerd', value: '🤓' },
					{ name: '👻 Ghost', value: '👻' },
					{ name: '👨‍💻 Technologist', value: '👨‍💻' },
					{ name: '👀 Eyes', value: '👀' },
					{ name: '🎃 Jack-O-Lantern', value: '🎃' },
					{ name: '🙈 See-No-Evil Monkey', value: '🙈' },
					{ name: '😇 Halo', value: '😇' },
					{ name: '😨 Fearful', value: '😨' },
					{ name: '🤝 Handshake', value: '🤝' },
					{ name: '✍ Writing Hand', value: '✍' },
					{ name: '🤗 Hugging', value: '🤗' },
					{ name: '🫡 Saluting Face', value: '🫡' },
					{ name: '🎅 Santa Claus', value: '🎅' },
					{ name: '🎄 Christmas Tree', value: '🎄' },
					{ name: '☃ Snowman', value: '☃' },
					{ name: '💅 Nail Polish', value: '💅' },
					{ name: '🤪 Zany', value: '🤪' },
					{ name: '🗿 Moai', value: '🗿' },
					{ name: '🆒 Cool Button', value: '🆒' },
					{ name: '💘 Heart With Arrow', value: '💘' },
					{ name: '🙉 Hear-No-Evil Monkey', value: '🙉' },
					{ name: '🦄 Unicorn', value: '🦄' },
					{ name: '😘 Kiss', value: '😘' },
					{ name: '💊 Pill', value: '💊' },
					{ name: '🙊 Speak-No-Evil Monkey', value: '🙊' },
					{ name: '😎 Smiling With Sunglasses', value: '😎' },
					{ name: '👾 Alien Monster', value: '👾' },
					{ name: '🤷‍♂ Man Shrugging', value: '🤷‍♂' },
					{ name: '🤷 Person Shrugging', value: '🤷' },
					{ name: '🤷‍♀ Woman Shrugging', value: '🤷‍♀' },
					{ name: '😡 Pouting Face', value: '😡' },
				],
				default: '👍',
				description:
					'Emoji to set as reaction. Only emojis allowed by Telegram are listed (see Bot API docs).',
			},
			{
				displayName: 'Custom Emoji ID',
				name: 'customEmojiId',
				type: 'string',
				default: '',
				required: true,
				displayOptions: {
					show: {
						reactionType: ['custom_emoji'],
					},
				},
				description:
					'Identifier of the custom emoji. The bot must be a chat administrator, or the custom emoji must already be in the message.',
			},
			{
				displayName: 'Big Animation',
				name: 'isBig',
				type: 'boolean',
				default: false,
				displayOptions: {
					show: {
						reactionType: ['emoji', 'custom_emoji'],
					},
				},
				description: 'Whether to set the reaction with a big animation',
			},
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];

		const credentials = await this.getCredentials('telegramReactionApi');
		const baseUrl = ((credentials.baseUrl as string) || 'https://api.telegram.org').replace(
			/\/+$/,
			'',
		);
		const accessToken = credentials.accessToken as string;

		for (let i = 0; i < items.length; i++) {
			try {
				const chatId = this.getNodeParameter('chatId', i) as string;
				const messageId = this.getNodeParameter('messageId', i) as number;
				const reactionType = this.getNodeParameter('reactionType', i) as string;
				const isBig = this.getNodeParameter('isBig', i, false) as boolean;

				const body: IDataObject = {
					chat_id: chatId,
					message_id: messageId,
					is_big: isBig,
				};

				if (reactionType === 'none') {
					body.reaction = [];
				} else if (reactionType === 'emoji') {
					const emoji = this.getNodeParameter('emoji', i) as string;
					body.reaction = [{ type: 'emoji', emoji }];
				} else if (reactionType === 'custom_emoji') {
					const customEmojiId = this.getNodeParameter('customEmojiId', i) as string;
					body.reaction = [{ type: 'custom_emoji', custom_emoji_id: customEmojiId }];
				}

				const options: IHttpRequestOptions = {
					method: 'POST',
					url: `${baseUrl}/bot${accessToken}/setMessageReaction`,
					body,
					json: true,
				};

				const response = await this.helpers.httpRequest(options);

				if (response && response.ok === false) {
					throw new NodeOperationError(
						this.getNode(),
						`Telegram API error: ${response.description || JSON.stringify(response)}`,
						{ itemIndex: i },
					);
				}

				returnData.push({
					json: response as IDataObject,
					pairedItem: { item: i },
				});
			} catch (error) {
				if (this.continueOnFail()) {
					returnData.push({
						json: { error: (error as Error).message },
						pairedItem: { item: i },
					});
					continue;
				}
				throw new NodeOperationError(this.getNode(), error as Error, { itemIndex: i });
			}
		}

		return [returnData];
	}
}
