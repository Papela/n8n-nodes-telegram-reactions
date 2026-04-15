# n8n-nodes-telegram-reactions
Community node for [n8n](https://n8n.io) that adds the `setMessageReaction` method from the Telegram Bot API (which the official node does not expose). Allows sending reactions to messages in a chat or channel.

## Features
- **Set Reaction** operation on any message (chat or channel where the bot has access).
- Supported reaction types:
  - **Emoji** (list of emojis allowed by Telegram).
  - **Custom Emoji** (via `custom_emoji_id`).
  - **None** → removes the bot's reactions from the message (sends `reaction: []`).
- Support for `is_big` (large animation).
- Custom credential with integrated test (`getMe`).

## Requirements
- n8n (self-hosted).
- Node.js >= 18.10 (required by n8n).
- A Telegram bot created with [@BotFather](https://t.me/botfather) that is in the chat/channel where you want to react.

## Installation

### Option A — From n8n UI (recommended once published to npm)
1. In n8n: **Settings → Community Nodes → Install**.
2. Enter the package name: `n8n-nodes-telegram-reactions`.
3. Accept the warning and restart if prompted.
> Note: This option is only available in n8n self-hosted (not n8n Cloud unless you have the plan that allows it) and you must accept the "use of community nodes" warning.

### Option B — Local development / manual installation
```bash
# 1. Clone this repo
git clone https://github.com/Papela/n8n-nodes-telegram-reactions.git
# (place the package folder here)
cd n8n-nodes-telegram-reactions

# 2. Install dependencies and build
npm install
npm run build

# 3. Link globally
npm link

# 4. In the folder where n8n looks for custom nodes (default ~/.n8n/custom):
mkdir -p ~/.n8n/custom
cd ~/.n8n/custom
npm init -y       # only the first time, if package.json doesn't exist
npm link n8n-nodes-telegram-reactions

# 5. Restart n8n
n8n start
```

If you use Docker, mount the package inside the container at `/home/node/.n8n/custom` or install it in your own image.

## Configuration
1. In n8n, create a new credential of type **Telegram Reaction API**.
2. Paste the bot's **Access Token** (format `123456:ABC...`).
3. Click **Test** to validate (calls `getMe` under the hood).

## Node Usage
Main parameters:

| Parameter | Description |
|---|---|
| **Chat ID** | Numeric ID of the chat or `@username` of the channel. |
| **Message ID** | ID of the message to react to. |
| **Reaction Type** | `Emoji`, `Custom Emoji` or `None` (to clear). |
| **Emoji** | Selector with all emojis allowed by Telegram. |
| **Custom Emoji ID** | ID of a custom emoji (only if the bot is admin or the emoji already exists in the message). |
| **Big Animation** | If enabled, Telegram shows a "large" animation. |

### Typical Example
Telegram Trigger → Telegram Reaction:
- **Chat ID**: `={{ $json.message.chat.id }}`
- **Message ID**: `={{ $json.message.message_id }}`
- **Reaction Type**: Emoji
- **Emoji**: 👍

## Limitations (from the Bot API itself)
- **Non-premium** bots can only place **one** reaction per message.
- For custom emojis the bot must be admin of the chat or the emoji must already be present in the message.
- Only emojis from the official list allowed by Telegram can be used (the ones that appear in the dropdown).

## References
- [Telegram Bot API – setMessageReaction](https://core.telegram.org/bots/api#setmessagereaction)
- [n8n – Creating nodes](https://docs.n8n.io/integrations/creating-nodes/)
- [n8n – Community nodes](https://docs.n8n.io/integrations/community-nodes/)

## License
[MIT](https://github.com/Papela/n8n-nodes-telegram-reactions/blob/main/LICENSE)