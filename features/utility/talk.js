const { SlashCommandBuilder } = require('discord.js');
const { joinVoiceChannel, createAudioPlayer, createAudioResource } = require('@discordjs/voice');
const prism = require('prism-media');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('talk')
        .setDescription('Retransmet l\'audio écouté vers d\'autres salons vocaux.')
        .addChannelOption(option =>
            option
                .setName('source')
                .setDescription('Salon vocal source.')
                .setRequired(true)
                .addChannelTypes(2) // Type 2 : salon vocal
        )
        .addStringOption(option =>
            option
                .setName('targets')
                .setDescription('IDs des salons vocaux cibles, séparés par des virgules.')
                .setRequired(true)
        ),
    async execute(interaction) {
        const sourceChannel = interaction.options.getChannel('source'); // Type: Channel
        const targetChannelsString = interaction.options.getString('targets'); // Type: String

        if (!sourceChannel || !targetChannelsString) {
            return interaction.reply({
                content: 'Veuillez spécifier un salon source et au moins un salon cible.',
                ephemeral: true,
            });
        }

        // Conversion des IDs cibles en tableau
        const targetChannelIds = targetChannelsString.split(',').map(id => id.trim());

        try {
            // Connexion au salon source
            const sourceConnection = joinVoiceChannel({
                channelId: sourceChannel.id,
                guildId: sourceChannel.guild.id,
                adapterCreator: sourceChannel.guild.voiceAdapterCreator,
            });

            const audioPlayer = createAudioPlayer();

            // Connexion aux salons cibles
            const targetConnections = [];
            for (const channelId of targetChannelIds) {
                const targetChannel = interaction.guild.channels.cache.get(channelId);

                if (!targetChannel || !targetChannel.isVoice()) {
                    await interaction.followUp({
                        content: `Le salon ID ${channelId} est invalide ou n'est pas un salon vocal.`,
                        ephemeral: true,
                    });
                    continue;
                }

                const targetConnection = joinVoiceChannel({
                    channelId: targetChannel.id,
                    guildId: targetChannel.guild.id,
                    adapterCreator: targetChannel.guild.voiceAdapterCreator,
                });

                targetConnections.push(targetConnection);
                targetConnection.subscribe(audioPlayer);
            }

            // Capturer et retransmettre l'audio du salon source
            const receiver = sourceConnection.receiver;
            receiver.speaking.on('start', (userId) => {
                const audioStream = receiver.subscribe(userId, {
                    end: { behavior: 'silence' },
                });

                const transcoder = new prism.opus.Decoder({
                    rate: 48000,
                    channels: 2,
                    frameSize: 960,
                });

                const audioResource = createAudioResource(audioStream.pipe(transcoder));
                audioPlayer.play(audioResource);
            });

            interaction.reply(`Retransmission de **${sourceChannel.name}** vers les salons : ${targetChannelIds.join(', ')}`);
        } catch (error) {
            console.error(error);
            interaction.reply({
                content: 'Une erreur est survenue lors de la retransmission.',
                ephemeral: true,
            });
        }
    },
};
