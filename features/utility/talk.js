const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('talk')
        .setDescription('Redirige les transcriptions vers plusieurs salons texte.')
        .addChannelOption(option =>
            option.setName('salons')
                .setDescription('Salons texte séparés par des virgules')
                .setRequired(true)
                .setChannelTypes([0])), // Seuls les salons texte sont autorisés
    async execute(interaction) {
        const targetChannels = interaction.options.getChannel('salons');

        try {
            if (!targetChannels || targetChannels.length === 0) {
                return interaction.reply({
                    content: 'Veuillez fournir au moins un salon texte.',
                    ephemeral: true,
                });
            }

            // Simule une transcription
            for (const channel of targetChannels) {
                await channel.send('🔊 **Transcription en cours...**');
            }

            interaction.reply(`Transcriptions redirigées vers : ${targetChannels.map(ch => ch.name).join(', ')}`);
        } catch (error) {
            console.error(error);
            interaction.reply({
                content: 'Une erreur est survenue lors de l\'envoi des transcriptions.',
                ephemeral: true,
            });
        }
    },
};
