import { Message } from "discord.js";
import { BaseCommand } from "../structures/BaseCommand";
import { Track } from "../structures/Track";
import { createEmbed } from "../utils/createEmbed";
import { DefineCommand } from "../utils/decorators/DefineCommand";
import { isMusicQueueExists, isSameVoiceChannel, isUserInTheVoiceChannel } from "../utils/decorators/MusicHelper";

@DefineCommand({
    aliases: ["rm"],
    name: "remove",
    description: lang => lang.COMMAND_REMOVE_META_DESCRIPTION(),
    usage: lang => `{prefix}remove <${lang.COMMAND_REMOVE_META_ARGS(0)}>`
})
export class RemoveCommand extends BaseCommand {
    @isMusicQueueExists()
    @isUserInTheVoiceChannel()
    @isSameVoiceChannel()
    public execute(message: Message, args: string[]): any {
        if (isNaN(Number(args[0]))) {
            return message.channel.send({
                embeds: [createEmbed("error", this.client.lang.COMMAND_INVALID_ARGS(message.client.config.prefix, this.meta.name))]
            });
        }

        // Convert to normal array
        const { store: tracks } = message.guild!.queue!.tracks;

        const currentTrack = message.guild!.queue!.tracks.first()!;
        const track = tracks[(Number(args[0]) - 1)] as Track | undefined;

        if (track === undefined) return message.channel.send({ embeds: [createEmbed("error", message.client.lang.COMMAND_REMOVE_NOT_FOUND(Number(args[0])))] });

        if (currentTrack.id === track.id) {
            if (message.guild?.queue?.playing === false) message.guild.queue.player.unpause();
            message.guild!.queue?.player!.stop();
        } else {
            message.guild?.queue?.tracks.delete(track);
        }

        message.channel.send({
            embeds: [
                createEmbed("info", message.client.lang.COMMAND_REMOVE_SUCCESS(track.metadata.title, track.metadata.url))
                    .setThumbnail(track.metadata.thumbnail)
            ]
        }).catch(e => this.client.logger.error("REMOVE_COMMAND_ERR:", e));
    }
}
