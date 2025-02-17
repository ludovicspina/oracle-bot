const { SlashCommandBuilder } = require('discord.js');
const { Subscription } = require('../../database/models/finance');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ajouter_abonnement')
        .setDescription('Ajoute un abonnement personnel ou commun.')
        .addStringOption(option =>
            option.setName('nom')
                .setDescription("Nom de l'abonnement")
                .setRequired(true)
        )
        .addNumberOption(option =>
            option.setName('montant')
                .setDescription("Prix mensuel de l'abonnement")
                .setRequired(true)
        )
        .addStringOption(option =>
            option.setName('type')
                .setDescription("Type d'abonnement (personnel ou commun)")
                .setRequired(true)
                .addChoices(
                    { name: 'Personnel', value: 'personnel' },
                    { name: 'Commun', value: 'commun' }
                )
        ),
    async execute(interaction) {
        const name = interaction.options.getString('nom');
        const amount = interaction.options.getNumber('montant');
        const type = interaction.options.getString('type');
        const userId = type === 'commun' ? 'shared' : interaction.user.id;

        await Subscription.create({ userId, name, amount });

        await interaction.reply(`📌 Abonnement **${name}** ajouté (${type}) : **${amount}€**`).ephemeral;
    },
};
