const { SlashCommandBuilder } = require('discord.js');
const { Subscription } = require('../../database/models/finance');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('supprimer_abonnement')
        .setDescription('Supprime un abonnement.')
        .addStringOption(option =>
            option.setName('nom')
                .setDescription("Nom de l'abonnement à supprimer")
                .setRequired(true)
        ),
    async execute(interaction) {
        const name = interaction.options.getString('nom');
        const userId = interaction.user.id;

        const deleted = await Subscription.destroy({ where: { name, userId } });

        if (deleted) {
            await interaction.reply(`🗑️ Abonnement **${name}** supprimé.`);
        } else {
            await interaction.reply(`⚠️ Aucun abonnement trouvé avec le nom **${name}**.`);
        }
    },
};
