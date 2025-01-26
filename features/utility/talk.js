const { SlashCommandBuilder, ChannelType } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('talk')
        .setDescription('Redirige les transcriptions vers plusieurs salons texte.')
        .addChannelOption(option =>
            option
                .setName('salons')
                .setDescription('Salon texte où envoyer les transcriptions')
                .setRequired(true)),
    async execute(interaction) {
        const targetChannel = interaction.options.getChannel('salons');

        // Vérifier que le salon est bien un salon texte
        if (targetChannel.type !== ChannelType.GuildText) {
            return interaction.reply({
                content: 'Le salon sélectionné n\'est pas un salon texte.',
                ephemeral: true,
            });
        }

        try {
            // Simule une transcription
            await targetChannel.send('🔊 **Transcription en cours...**');
            interaction.reply(`Les transcriptions seront redirigées vers : ${targetChannel.name}`);
        } catch (error) {
            console.error(error);
            interaction.reply({
                content: 'Une erreur est survenue lors de l\'envoi des transcriptions.',
                ephemeral: true,
            });
        }
    },
};
