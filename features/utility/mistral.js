const { SlashCommandBuilder } = require('discord.js');
const { Mistral } = require('@mistralai/mistralai');
require('dotenv').config();

const MISTRAL_API_KEY = process.env.MISTRAL_API_KEY;

const client = new Mistral({ apiKey: MISTRAL_API_KEY });

const FAQ_FWC = {
    "serveur_FWC": {
        "description": "FWC signifie Flyff World Championships. Les serveurs FWC permettent aux joueurs d'améliorer rapidement leurs personnages pour une compétition à venir."
    },
    "inscription": {
        "nouveau_compte": "Non, vous pouvez utiliser votre compte actuel pour créer un personnage sur le serveur FWC.",
        "transfert_personnage": "Non, il faut créer un nouveau personnage sur FWC.",
        "nom_personnage": "Oui, vous pouvez utiliser le même nom que sur votre serveur principal si celui-ci est disponible.",
        "preenregistrement_nom": "Oui, le nom sera réservé jusqu'à la création du personnage avec ce compte. Une boîte cadeau est offerte contenant : Parchemin Spécial d'Amplification x3, Boisson énergisante ou Fiole de mana x5, Secret de puissance x5, Boîte de carafes x5, Sac d'inventaire (15 jours) x1."
    },
    "jeu": {
        "taux_spawn": "Aucun changement, sauf si afflux de joueurs nécessitant une augmentation des taux pour les quêtes.",
        "taux_amelioration": "Oui, taux d'amélioration x2 par rapport aux autres serveurs.",
        "niveau_max": "160, comme sur les autres serveurs.",
        "hebergement": "Serveurs américains.",
        "avantages": [
            "x2 taux d'EXP, x2 taux de drop, x2 taux d'amélioration.",
            "Événements spéciaux.",
            "Titres spéciaux.",
            "Classement JcE et tournoi JcJ."
        ],
        "evenements_speciaux": "Pas de projets spécifiques pour l'instant.",
        "echange_equipement": "Échange possible pour ensembles d'armes et armures +10 de Coral Island.",
        "sets_et_armes": "Consulter l'article de l'événement pour plus d'informations.",
        "recompense_joueurs_serveurs_principaux": "FWC Golden exclusif à FWC. Possibilité d'ajustements futurs pour les joueurs des serveurs principaux."
    },
    "tournois": {
        "regles": "Similaires au dernier FWC, détails à venir.",
        "selection_participants": "Participation à l'événement et classement parmi les meilleurs ou victoire au tournoi.",
        "absence_joueur": "Les 4 participants doivent se rendre en personne aux Philippines, plus de détails à venir."
    },
    "transfert_personnage": {
        "possibilite_transfert": "Oui, un transfert aura lieu après la fin du FWC.",
        "limitations": [
            "Penya non transféré.",
            "Objets gardent leurs attributs.",
            "Parchemins rendus pour objets non transférés avec effets spéciaux.",
            "Progrès, missions, Battle Pass transférés.",
            "Bienfaits transférés sauf restriction spécifique.",
            "Garde-robe transférée telle quelle.",
            "Accomplissements et quêtes transférés.",
            "Guildes, listes d'amis, groupes non transférés."
        ],
        "transfert_objets": {
            "possibilite": "Oui, avec des restrictions.",
            "objets_transferables": [
                "Achats en boutique (sauf objets spéciaux FWC).",
                "Armures, armes et bijoux équipés.",
                "Objets FWC liés.",
                "Cosmétiques et titres FWC."
            ],
            "liste_complete": "Sera fournie ultérieurement."
        },
        "liaison_objets": "Objets liés au compte, certains liés à l'âme pour éviter les abus.",
        "choix_serveur": "Oui, possible de choisir un serveur, mais limitation à 8 personnages par serveur.",
        "caracteristiques_preservees": [
            "Cartes percées et bonus d'armes et armures maintenus.",
            "Garde-robe transférée sans changement.",
            "Logement personnel transféré.",
            "Titres liés au compte fusionnés sur le serveur du personnage de plus haut niveau."
        ],
        "guildes": "Objets et banques de guilde non transférés, à répartir avant transfert.",
        "stockage_items": "Banque et boîte postale transférées, selon les règles précédentes.",
        "limite_niveau": "Possibilité de limiter les transferts aux personnages de niveau 140+ pour éviter les bots.",
        "conflit_noms": "Nom modifié avec un numéro aléatoire, parchemin de renommage offert.",
        "processus_transfert": "Durée non garantie, transfert séquentiel, détails à venir."
    }
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('mistral')
        .setDescription('Pose une question à Mistral.ai concernant le serveur FWC')
        .addStringOption(option =>
            option.setName('question')
                .setDescription('La question que tu veux poser à Mistral.ai')
                .setRequired(true)
        ),
    async execute(interaction) {
        const question = interaction.options.getString('question');

        await interaction.deferReply(); // Permet au bot de prendre du temps pour répondre

        try {
            const chatResponse = await client.chat.complete({
                model: 'mistral-tiny', // Remplacez par le modèle approprié si nécessaire
                messages: [{ role: 'user', content: `Réponds en fonction de ces informations : ${JSON.stringify(FAQ_FWC)} \n\nQuestion: ${question}` }],
            });

            const answer = chatResponse.choices[0].message.content;

            await interaction.editReply(`**Question :** ${question}\n\n${answer}`);
        } catch (error) {
            console.error(error);
            await interaction.editReply("Une erreur est survenue lors de la requête à l'API Mistral.");
        }
    },
};
