const { SlashCommandBuilder } = require('discord.js');
const { joinVoiceChannel, createAudioPlayer } = require('@discordjs/voice');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('listen')
        .setDescription('Connecte le bot à un salon vocal.')
        .addChannelOption(option =>
            option.setName('salon')
                .setDescription('ID du salon vocal à connecter')
                .setRequired(true)),
    async execute(interaction) {
        const voiceChannel = interaction.options.getChannel('salon');
        if (!voiceChannel || voiceChannel.type !== 2) { // Vérifie si le salon est vocal
            return interaction.reply({
                content: 'Veuillez fournir un salon vocal valide.',
                ephemeral: true,
            });
        }

        try {
            const connection = joinVoiceChannel({
                channelId: voiceChannel.id,
                guildId: voiceChannel.guild.id,
                adapterCreator: voiceChannel.guild.voiceAdapterCreator,
            });

            interaction.reply(`Connecté au salon vocal : **${voiceChannel.name}**`);

            // Vous pouvez ajouter un lecteur audio ici si nécessaire
            const player = createAudioPlayer();
            connection.subscribe(player);
        } catch (error) {
            console.error(error);
            interaction.reply({
                content: 'Une erreur est survenue lors de la connexion au salon vocal.',
                ephemeral: true,
            });
        }
    },
};
