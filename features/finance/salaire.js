const { SlashCommandBuilder } = require('discord.js');
const { Salary } = require('../../database/models/finance');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ajouter_salaire')
        .setDescription('Ajoute ton salaire du mois.')
        .addNumberOption(option =>
            option.setName('montant')
                .setDescription('Le montant de ton salaire.')
                .setRequired(true)
        ),
    async execute(interaction) {
        const amount = interaction.options.getNumber('montant');
        const userId = interaction.user.id;

        await Salary.create({ userId, amount });

        await interaction.reply(`💰 Salaire de **${amount}€** ajouté avec succès !`);
    },
};
