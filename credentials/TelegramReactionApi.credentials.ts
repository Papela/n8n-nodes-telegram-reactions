import {
	IAuthenticateGeneric,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class TelegramReactionApi implements ICredentialType {
	name = 'telegramReactionApi';
	displayName = 'Telegram Reaction API';
	documentationUrl = 'https://core.telegram.org/bots/api#setmessagereaction';
	properties: INodeProperties[] = [
		{
			displayName: 'Access Token',
			name: 'accessToken',
			type: 'string',
			typeOptions: { password: true },
			default: '',
			required: true,
			description: 'Bot token obtained from @BotFather',
		},
		{
			displayName: 'Base URL',
			name: 'baseUrl',
			type: 'string',
			default: 'https://api.telegram.org',
			description: 'Telegram Bot API base URL (change only if you use a custom Bot API server)',
		},
	];

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {},
	};

	test: ICredentialTestRequest = {
		request: {
			baseURL: '={{$credentials.baseUrl}}',
			url: '=/bot{{$credentials.accessToken}}/getMe',
		},
	};
}
