const { SlashCommandBuilder } = require('discord.js');
const { Mistral } = require('@mistralai/mistralai');
require('dotenv').config();

const MISTRAL_API_KEY = process.env.MISTRAL_API_KEY;

const client = new Mistral({ apiKey: MISTRAL_API_KEY });

module.exports = {
    data: new SlashCommandBuilder()
        .setName('mistral')
        .setDescription('Pose une question à Mistral.ai')
        .addStringOption(option =>
            option.setName('question')
                .setDescription('La question que tu veux poser à Mistral.ai')
                .setRequired(true)),
    async execute(interaction) {
        const question = interaction.options.getString('question');

        await interaction.deferReply(); // Permet au bot de prendre du temps pour répondre

        try {
            const chatResponse = await client.chat.complete({
                model: 'mistral-tiny', // Remplacez par le modèle approprié si nécessaire
                messages: [{ role: 'user', content: "Répond à la question en te reposant là-dessus, si tu n'a pas la réponse, répond simplement : je ne sais pas" + "Serveur FWC\n" +
                        "- Serveur pour préparer les joueurs à la compétition Flyff World Championships (FWC).\n" +
                        "- Utilisation du compte actuel pour créer un personnage sur FWC.\n" +
                        "- Pas de transfert de personnages depuis le serveur principal.\n" +
                        "- Possible d'utiliser le même nom si non pris.\n" +
                        "- Pré-enregistrement : Nom réservé avec cadeaux (Parchemin Spécial d'Amplification, Boisson énergétique, etc.).\n" +
                        "\n" +
                        "Jeu\n" +
                        "- Taux de reproduction des monstres inchangés, mais ajustables en cas d'afflux.\n" +
                        "- Taux d'amélioration doublé.\n" +
                        "- Niveau Max : 160.\n" +
                        "- Serveurs américains.\n" +
                        "- Avantages : x2 EXP, x2 taux de chute, événements spéciaux, titres spéciaux, classements JcE/JcJ.\n" +
                        "\n" +
                        "Tournois\n" +
                        "- Règles similaires au dernier FWC.\n" +
                        "- Participation : Classement parmi les meilleurs ou victoire au tournoi.\n" +
                        "- Transfert Post-FWC, avec limitations (Penya non transféré, objets conservés, etc.).\n" +
                        "\n" +
                        "Transfert Post-FWC\n" +
                        "- Objets : Transfert avec limitations (objets achetés, armures, armes, bijoux).\n" +
                        "- Liste des objets transférables fournie ultérieurement.\n" +
                        "- Objets majoritairement liés au compte, certains liés à l'âme.\n" +
                        "- Choix du serveur préféré, max 8 personnages.\n" +
                        "- Garde-robe et Logement : Transférés tels quels.\n" +
                        "- Guildes : Non transférées, distribution des objets avant transfert.\n" +
                        "- Limitation possible pour éviter les bots de bas niveau.\n" +
                        "- Numéro aléatoire en cas de chevauchement de nom, parchemin de renommage gratuit.\n" +
                        "- Transfert séquentiel, durée non garantie." + question }],
            });

            const answer = chatResponse.choices[0].message.content;

            // Affiche la question avant la réponse
            await interaction.editReply(`**Question :** ${question}`);

            // Diviser la réponse en segments de 2000 caractères
            const messages = answer.match(/[\s\S]{1,2000}/g);

            for (const msg of messages) {
                await interaction.followUp(msg);
            }
        } catch (error) {
            console.error(error);
            await interaction.editReply("Une erreur est survenue lors de la requête à l'API Mistral.");
        }
    },
};
