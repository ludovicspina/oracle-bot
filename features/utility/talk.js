const { SlashCommandBuilder } = require('discord.js');
const { joinVoiceChannel, getVoiceConnection, createAudioPlayer, createAudioResource, AudioPlayerStatus } = require('@discordjs/voice');
const { pipeline } = require('stream');
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
                .addChannelTypes(2)
        )
        .addChannelOption(option =>
            option
                .setName('targets')
                .setDescription('Salons vocaux cibles (séparés par des virgules).')
                .setRequired(true)
                .addChannelTypes(2)
        ),
    async execute(interaction) {
        const sourceChannel = interaction.options.getChannel('source');
        const targetChannels = interaction.options.getChannel('targets');

        if (!sourceChannel || !targetChannels) {
            return interaction.reply({ content: 'Veuillez spécifier des salons valides.', ephemeral: true });
        }

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
            for (const targetChannel of targetChannels) {
                const targetConnection = joinVoiceChannel({
                    channelId: targetChannel.id,
                    guildId: targetChannel.guild.id,
                    adapterCreator: targetChannel.guild.voiceAdapterCreator,
                });

                targetConnections.push(targetConnection);
                targetConnection.subscribe(audioPlayer);
            }

            // Capturer l'audio du salon source
            const receiver = sourceConnection.receiver;
            const userId = interaction.user.id;

            receiver.speaking.on('start', (userId) => {
                const audioStream = receiver.subscribe(userId, {
                    end: {
                        behavior: "silence", // Arrêter après un moment de silence
                    },
                });

                const transcoder = new prism.opus.Decoder({
                    rate: 48000,
                    channels: 2,
                    frameSize: 960,
                });

                const audioResource = createAudioResource(pipeline(audioStream, transcoder, () => {}));
                audioPlayer.play(audioResource);
            });

            interaction.reply(`Retransmission en cours du salon **${sourceChannel.name}** vers ${targetChannels.map(ch => ch.name).join(', ')}`);
        } catch (error) {
            console.error(error);
            interaction.reply({ content: 'Une erreur est survenue lors de la retransmission.', ephemeral: true });
        }
    },
};
