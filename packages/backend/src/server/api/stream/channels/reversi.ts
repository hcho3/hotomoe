/*
 * SPDX-FileCopyrightText: syuilo and misskey-project
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import { Injectable } from '@nestjs/common';
import { bindThis } from '@/decorators.js';
import Channel, { type MiChannelService } from '../channel.js';

class ReversiChannel extends Channel {
	public readonly chName = 'reversi';
	public static readonly shouldShare = true;
	public static readonly requireCredential = true as const;
	public static readonly kind = 'read:account';

	@bindThis
	public async init(params: any) {
		this.subscriber.on(`reversiStream:${this.user!.id}`, this.send);
	}

	@bindThis
	public dispose() {
		// Unsubscribe events
		this.subscriber.off(`reversiStream:${this.user!.id}`, this.send);
	}
}

@Injectable()
export class ReversiChannelService implements MiChannelService<true> {
	public readonly shouldShare = ReversiChannel.shouldShare;
	public readonly requireCredential = ReversiChannel.requireCredential;
	public readonly kind = ReversiChannel.kind;

	@bindThis
	public create(id: string, connection: Channel['connection']): ReversiChannel {
		return new ReversiChannel(
			id,
			connection,
		);
	}
}
