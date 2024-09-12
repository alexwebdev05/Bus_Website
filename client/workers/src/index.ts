import { handleWebSocket } from './websocket';

export default {
	
	async fetch(request, env, ctx): Promise<Response> {

		const upgradeHeader = request.headers.get("Upgrade");

		if (upgradeHeader && upgradeHeader.toLowerCase() === "websocket") {
			return handleWebSocket(request);
		}

		return new Response('Hello, this is the worker of https://github.com/alexwebdev05/Bus_Website.git project.');
	},
} satisfies ExportedHandler<Env>;

