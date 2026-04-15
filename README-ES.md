# n8n-nodes-telegram-reactions

Community node para [n8n](https://n8n.io) que añade el método `setMessageReaction` de la Bot API de Telegram (que el nodo oficial no expone). Permite enviar reacciones a mensajes de un chat o canal.

## Características

- Operación **Set Reaction** sobre cualquier mensaje (chat o canal donde el bot tenga acceso).
- Tipos de reacción soportados:
  - **Emoji** (lista de emojis permitidos por Telegram).
  - **Custom Emoji** (vía `custom_emoji_id`).
  - **None** → elimina las reacciones del bot en el mensaje (envía `reaction: []`).
- Soporte para `is_big` (animación grande).
- Credencial propia con test integrado (`getMe`).

## Requisitos

- n8n (self-hosted).
- Node.js >= 18.10 (lo exige n8n).
- Un bot de Telegram creado con [@BotFather](https://t.me/botfather) que esté en el chat/canal donde quieras reaccionar.

## Instalación

### Opción A — Desde la UI de n8n (recomendada cuando lo publiques en npm)

1. En n8n: **Settings → Community Nodes → Install**.
2. Escribe el nombre del paquete: `n8n-nodes-telegram-reactions`.
3. Acepta el aviso y reinicia si te lo pide.

> Nota: esta opción solo está disponible en n8n self-hosted (no en n8n Cloud salvo que tengas el plan que lo permite) y tienes que aceptar la advertencia de "use of community nodes".

### Opción B — Desarrollo local / instalación manual

```bash
# 1. Clonar el repo
git clone https://github.com/Papela/n8n-nodes-telegram-reactions.git
# (mete aquí la carpeta del paquete)
cd n8n-nodes-telegram-reactions

# 2. Instalar dependencias y compilar
npm install
npm run build

# 3. Enlazar globalmente
npm link

# 4. En la carpeta donde n8n busca custom nodes (por defecto ~/.n8n/custom):
mkdir -p ~/.n8n/custom
cd ~/.n8n/custom
npm init -y       # solo la primera vez, si no existe package.json
npm link n8n-nodes-telegram-reactions

# 5. Reinicia n8n
n8n start
```

Si usas Docker, monta el paquete dentro del contenedor en `/home/node/.n8n/custom` o instálalo en una imagen propia.

## Configuración

1. En n8n, crea una nueva credencial de tipo **Telegram Reaction API**.
2. Pega el **Access Token** del bot (formato `123456:ABC...`).
3. Pulsa **Test** para validar (llama a `getMe` por debajo).

## Uso del nodo

Parámetros principales:

| Parámetro | Descripción |
|---|---|
| **Chat ID** | ID numérico del chat o `@username` del canal. |
| **Message ID** | ID del mensaje al que reaccionar. |
| **Reaction Type** | `Emoji`, `Custom Emoji` o `None` (para limpiar). |
| **Emoji** | Selector con todos los emojis permitidos por Telegram. |
| **Custom Emoji ID** | ID de un custom emoji (solo si el bot es admin o el emoji ya existe en el mensaje). |
| **Big Animation** | Si activas, Telegram muestra animación "grande". |

### Ejemplo típico

Trigger de Telegram → Telegram Reaction:

- **Chat ID**: `={{ $json.message.chat.id }}`
- **Message ID**: `={{ $json.message.message_id }}`
- **Reaction Type**: Emoji
- **Emoji**: 👍

## Limitaciones (de la propia Bot API)

- Los bots **no premium** solo pueden poner **una** reacción por mensaje.
- Para custom emojis el bot tiene que ser admin del chat o el emoji ya tiene que estar presente.
- Solo se pueden usar emojis de la lista oficial permitida por Telegram (los que aparecen en el desplegable).

## Referencias

- [Telegram Bot API – setMessageReaction](https://core.telegram.org/bots/api#setmessagereaction)
- [n8n – Creating nodes](https://docs.n8n.io/integrations/creating-nodes/)
- [n8n – Community nodes](https://docs.n8n.io/integrations/community-nodes/)

## Licencia
[MIT](https://github.com/Papela/n8n-nodes-telegram-reactions/blob/main/LICENSE)