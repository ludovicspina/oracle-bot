const { SlashCommandBuilder } = require('discord.js');
const { joinVoiceChannel, getVoiceConnection } = require('@discordjs/voice');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('listen')
        .setDescription('Connecte le bot à un salon vocal pour écouter.')
        .addChannelOption(option =>
            option
                .setName('salon')
                .setDescription('Le salon vocal à écouter.')
                .setRequired(true)
                .addChannelTypes(2) // Type 2 : salon vocal
        ),
    async execute(interaction) {
        const voiceChannel = interaction.options.getChannel('salon');
        if (!voiceChannel) {
            return interaction.reply({ content: 'Salon vocal invalide.', ephemeral: true });
        }

        try {
            // Connexion au salon vocal
            const connection = joinVoiceChannel({
                channelId: voiceChannel.id,
                guildId: voiceChannel.guild.id,
                adapterCreator: voiceChannel.guild.voiceAdapterCreator,
            });

            interaction.reply(`Bot connecté au salon vocal : **${voiceChannel.name}**`);
        } catch (error) {
            console.error(error);
            interaction.reply({ content: 'Erreur lors de la connexion au salon vocal.', ephemeral: true });
        }
    },
};
