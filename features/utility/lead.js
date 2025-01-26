const { SlashCommandBuilder } = require('discord.js');
const {
    joinVoiceChannel,
    createAudioPlayer,
    createAudioResource,
    VoiceReceiver,
    AudioPlayerStatus,
    EndBehaviorType,
} = require('@discordjs/voice');
const prism = require('prism-media');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('lead')
        .setDescription('Retransmet l\'audio d\'un salon vocal à un autre.')
        .addChannelOption(option =>
            option
                .setName('source')
                .setDescription('Salon vocal source.')
                .setRequired(true)
                .addChannelTypes(2) // Type 2 : salon vocal
        )
        .addChannelOption(option =>
            option
                .setName('target')
                .setDescription('Salon vocal cible.')
                .setRequired(true)
                .addChannelTypes(2) // Type 2 : salon vocal
        ),
    async execute(interaction) {
        const sourceChannel = interaction.options.getChannel('source'); // Salon vocal source
        const targetChannel = interaction.options.getChannel('target'); // Salon vocal cible

        if (!sourceChannel || !targetChannel) {
            return interaction.reply({
                content: 'Les salons source et cible doivent être spécifiés et valides.',
                ephemeral: true,
            });
        }

        await interaction.reply({
            content: `Le bot va retransmettre l'audio de **${sourceChannel.name}** vers **${targetChannel.name}**.`,
            ephemeral: true,
        });

        try {
            // Connexion au salon source
            const sourceConnection = joinVoiceChannel({
                channelId: sourceChannel.id,
                guildId: sourceChannel.guild.id,
                adapterCreator: sourceChannel.guild.voiceAdapterCreator,
            });

            // Connexion au salon cible
            const targetConnection = joinVoiceChannel({
                channelId: targetChannel.id,
                guildId: targetChannel.guild.id,
                adapterCreator: targetChannel.guild.voiceAdapterCreator,
            });

            // Crée un lecteur audio
            const audioPlayer = createAudioPlayer();

            // Souscription au lecteur audio dans le salon cible
            targetConnection.subscribe(audioPlayer);

            // Récepteur pour écouter le salon source
            const receiver = sourceConnection.receiver;

            receiver.speaking.on('start', (userId) => {
                const userStream = receiver.subscribe(userId, {
                    end: {
                        behavior: EndBehaviorType.AfterSilence,
                        duration: 100,
                    },
                });

                // Transcode et transmet l'audio
                const transcoder = new prism.opus.Decoder({
                    rate: 48000,
                    channels: 2,
                    frameSize: 960,
                });

                const audioResource = createAudioResource(userStream.pipe(transcoder));
                audioPlayer.play(audioResource);
            });

            // Gestion des erreurs et des événements du lecteur audio
            audioPlayer.on('error', (error) => {
                console.error('Erreur du lecteur audio :', error);
            });

            audioPlayer.on(AudioPlayerStatus.Idle, () => {
                console.log('Lecteur audio en attente.');
            });

        } catch (error) {
            console.error('Une erreur est survenue :', error);
            interaction.followUp({
                content: 'Une erreur est survenue lors de la configuration de la retransmission.',
                ephemeral: true,
            });
        }
    },
};
