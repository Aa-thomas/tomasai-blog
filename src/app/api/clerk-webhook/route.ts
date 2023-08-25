import type { IncomingHttpHeaders } from 'http';
import type { NextApiRequest, NextApiResponse } from 'next';
import type { WebhookRequiredHeaders } from 'svix';
import type { WebhookEvent } from '@clerk/nextjs/server';
import { Webhook } from 'svix';
import { headers } from 'next/headers';
import { User, type UserJSON } from '@clerk/clerk-sdk-node';
import { buffer } from 'micro';
import { prisma } from '../../../../prisma/prisma';
import { type } from 'os';

type NextApiRequestWithSvixRequiredHeaders = NextApiRequest & {
	headers: IncomingHttpHeaders & WebhookRequiredHeaders;
};

type Event = {
	data: UserJSON;
	object: 'event';
	type: EventType;
};

type EventType = 'user.created' | 'user.updated' | '*';

const webhookSecret: string = process.env.WEBHOOK_SECRET || '';

export const config = {
	api: {
		bodyParser: false,
	},
};

export async function POST(
	req: NextApiRequestWithSvixRequiredHeaders,
	res: NextApiResponse
) {
	const payload = (await buffer(req)).toString();
	const headers = req.headers;
	console.log('Request body:', payload);

	// Create a new Webhook instance with your webhook secret
	const wh = new Webhook(webhookSecret);

	let evt: Event | null = null;
	try {
		// Verify the webhook payload and headers
		evt = wh.verify(payload, headers) as Event;
	} catch (_) {
		console.log('error');
		return res.status(400).json({ message: 'Invalid webhook' });
	}
	// Handle the webhook
	const eventType: EventType = evt.type;
	if (eventType === 'user.created') {
		const user = User.fromJSON(evt.data);

		if (
			!user.emailAddresses ||
			user.emailAddresses.length === 0 ||
			!user.emailAddresses[0].emailAddress
		) {
			return res
				.status(400)
				.json({ success: false, message: 'Email address not found' });
		}

		try {
			await prisma.user.create({
				data: {
					id: user.id,
					email: user.emailAddresses[0].emailAddress,
					name: `${user.firstName} ${user.lastName}`,
				},
			});
		} catch (error) {
			if (error instanceof Error) {
				return res.status(500).json({
					success: false,
					message: 'Failed to create user',
					error: error.message,
				});
			} else {
				return res.status(500).json({
					success: false,
					message: 'Failed to create user',
					error: 'Unknown error',
				});
			}
		}
	}

	res.json({ message: 'ok' });
}
