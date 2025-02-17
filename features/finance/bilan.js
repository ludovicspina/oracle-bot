const { SlashCommandBuilder } = require('discord.js');
const { Salary, Subscription } = require('../../database/models/finance');
const { Op } = require('sequelize');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('bilan')
        .setDescription('Affiche un bilan financier du mois.'),
    async execute(interaction) {
        const userId = interaction.user.id;
        const today = new Date();
        const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
        const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);

        // Calculer le salaire total de l'utilisateur pour ce mois
        const totalSalary = await Salary.sum('amount', {
            where: {
                userId,
                date: { [Op.between]: [startOfMonth, endOfMonth] }
            }
        }) || 0;

        // Calculer les abonnements personnels et communs
        const totalPersonalSubscriptions = await Subscription.sum('amount', {
            where: { userId }
        }) || 0;

        const totalSharedSubscriptions = await Subscription.sum('amount', {
            where: { userId: 'shared' }
        }) || 0;

        // Part égale pour les abonnements communs
        const sharedPortion = totalSharedSubscriptions / 2;

        // Bilan final
        const balance = totalSalary - (totalPersonalSubscriptions + sharedPortion);

        await interaction.reply(`
        📊 **Bilan du mois :**
        💰 Salaire total : **${totalSalary.toFixed(2)}€**
        📌 Abonnements personnels : **-${totalPersonalSubscriptions.toFixed(2)}€**
        🤝 Abonnements communs (partagée) : **-${sharedPortion.toFixed(2)}€**
        💵 **Solde restant : ${balance.toFixed(2)}€**
        `);
    },
};
