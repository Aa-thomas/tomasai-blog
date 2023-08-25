import type { IncomingHttpHeaders } from 'http';
import type { NextApiRequest, NextApiResponse } from 'next';
import type { WebhookRequiredHeaders } from 'svix';
import type { WebhookEvent } from '@clerk/nextjs/server';
import { Webhook } from 'svix';
import { headers } from 'next/headers';
import { User } from '@clerk/clerk-sdk-node';
import { prisma } from '../../../../prisma/prisma';

const webhookSecret: string = process.env.WEBHOOK_SECRET || '';

export async function POST(req: Request, res: Response) {
	const payload = await req.json();
	const payloadString = JSON.stringify(payload);
	const headerPayload = headers();
	const svixId = headerPayload.get('svix-id');
	const svixIdTimeStamp = headerPayload.get('svix-timestamp');
	const svixSignature = headerPayload.get('svix-signature');
	if (!svixId || !svixIdTimeStamp || !svixSignature) {
		return new Response('Error occured, missing svix credentials', {
			status: 400,
		});
	}
	// Create an object of the headers
	const svixHeaders = {
		'svix-id': svixId,
		'svix-timestamp': svixIdTimeStamp,
		'svix-signature': svixSignature,
	};
	// Create a new Webhook instance with your webhook secret
	const wh = new Webhook(webhookSecret);

	let evt: WebhookEvent;
	try {
		// Verify the webhook payload and headers
		evt = wh.verify(payloadString, svixHeaders) as WebhookEvent;
	} catch (_) {
		console.log('error verifying the payload and headers');
		return new Response('Error occured verifying the payload and headers', {
			status: 400,
		});
	}

	// Handle the webhook
	const eventType = evt.type;
	if (eventType === 'user.created') {
		const { id, email_addresses, username } = evt.data;
		if (
			!email_addresses ||
			email_addresses.length === 0 ||
			!email_addresses[0].email_address
		) {
			return new Response('No Email address found in payload', {
				status: 400,
			});
		}

		try {
			await prisma.user.create({
				data: {
					id,
					email: email_addresses[0].email_address,
					name: username,
				},
			});
		} catch (error) {
			if (error instanceof Error) {
				return new Response(error.message, {
					status: 500,
				});
			} else {
				return new Response('Error creating user', {
					status: 500,
				});
			}
		}
	}
	return new Response('', {
		status: 201,
	});
}
