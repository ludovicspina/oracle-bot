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
                messages: [{ role: 'user', content: "Répond à la question en te reposant là-dessus, si tu n'a pas la réponse, répond simplement : je ne sais pas" + "Foire aux questions :\n" +
                        "\n" +
                        " \n" +
                        "\n" +
                        "Q. Qu'est-ce que le serveur FWC ?\n" +
                        "\n" +
                        "A. FWC est l'abréviation de Flyff World Championships et les serveurs FWC sont des serveurs où les joueurs peuvent rapidement améliorer leurs personnages pour se préparer à la grande compétition qui aura lieu plus tard dans l'année.\n" +
                        "\n" +
                        " \n" +
                        "\n" +
                        "[FAQ sur l'inscription]\n" +
                        "\n" +
                        " \n" +
                        "\n" +
                        "Q. Faut-il un tout nouveau compte pour créer un personnage sur le serveur FWC ?\n" +
                        "\n" +
                        "A. Non. Vous pouvez utiliser votre compte actuel et créer un personnage sur le serveur FWC.\n" +
                        "\n" +
                        " \n" +
                        "\n" +
                        "Q. Puis-je transférer mon personnage du serveur principal au serveur FWC ?\n" +
                        "\n" +
                        "A. Non. Vous devez créer un nouveau personnage sur le serveur FWC.\n" +
                        "\n" +
                        " \n" +
                        "\n" +
                        "Q. Je veux utiliser le nom de mon personnage de mon serveur sur le serveur FWC - est-ce possible ?\n" +
                        "\n" +
                        "A. Oui, à condition qu'il n'ait pas été pris par quelqu'un d'autre.\n" +
                        "\n" +
                        " \n" +
                        "\n" +
                        "Q. J'ai préenregistré un nom de jeu pour le serveur FWC. Ce nom sera-t-il réservé lorsque je créerai mon personnage ?\n" +
                        "\n" +
                        "A. Oui. Ce nom sera réservé jusqu'à ce que vous créiez un personnage portant le même nom sur le compte avec lequel vous vous êtes préenregistré. Vous recevrez également une boîte cadeau contenant les éléments suivants :\n" +
                        "\n" +
                        " \n" +
                        "\n" +
                        "- Parchemin Spécial d'Amplification x3\n" +
                        "\n" +
                        "- Boisson énérgetiqe ou Fiole de mana x5\n" +
                        "\n" +
                        "- Secret de puissance x5\n" +
                        "\n" +
                        "- Boîte de carafes x5\n" +
                        "\n" +
                        "- Sac d'inventaire (15 jours) x1\n" +
                        "\n" +
                        " \n" +
                        "\n" +
                        "[FAQ sur les jeux]\n" +
                        "\n" +
                        " \n" +
                        "\n" +
                        "Q. Y a-t-il des changements dans les taux de reproduction des monstres, des géants et des attrapeurs ?\n" +
                        "\n" +
                        "A. Non, il n'y a pas de changement dans les taux de spawn généraux, cependant, s'il y a un grand afflux de joueurs, nous pourrons augmenter les taux de spawn des monstres liés aux quêtes pour le confort des joueurs.\n" +
                        "\n" +
                        " \n" +
                        "\n" +
                        "Q. Y a-t-il des changements dans les taux d'amélioration ? (Améliorations, Améliorations élémentaires, Piercings et Améliorations ultimes)\n" +
                        "\n" +
                        "A. Oui, le taux est deux fois plus élevé que sur les autres serveurs.\n" +
                        "\n" +
                        " \n" +
                        "\n" +
                        "Q. Quel sera le niveau maximum des personnages sur FWC ?\n" +
                        "\n" +
                        "A. Le même que sur les autres serveurs, le niveau 160.\n" +
                        "\n" +
                        " \n" +
                        "\n" +
                        "Q. Où sera hébergé le serveur FWC ?\n" +
                        "\n" +
                        "A. Le serveur FWC est hébergé sur des serveurs américains.\n" +
                        "\n" +
                        " \n" +
                        "\n" +
                        "Q. Quels sont les avantages du FWC par rapport aux serveurs principaux ?\n" +
                        "\n" +
                        "A. Voici quelques avantages à jouer sur le serveur FWC\n" +
                        "\n" +
                        " \n" +
                        "\n" +
                        "- Des bienfaits spéciaux tels que x2 taux d'EXP, x2 taux de chute, X2 chance d'amélioration (Note : Penya obtenu dans les magasins est la moitié (x0.5) de ce qui est obtenu sur d'autres serveurs).\n" +
                        "\n" +
                        "- Événements spéciaux\n" +
                        "\n" +
                        "- Obtention de titres spéciaux\n" +
                        "\n" +
                        "- Enfin, vous pouvez participer au classement JcE et/ou au tournoi JcJ.\n" +
                        "\n" +
                        " \n" +
                        "\n" +
                        "Vous pouvez consulter tous les détails sur notre site web : (Link)\n" +
                        "\n" +
                        " \n" +
                        "\n" +
                        "Q. Y a-t-il des événements exclusifs de recharge, des événements Exp/Drop/Enhancement ou des événements en jeu prévus spécifiquement pour FWC ?\n" +
                        "\n" +
                        "A. Nous n'avons pas de projets spécifiques dans l'immédiat.\n" +
                        "\n" +
                        " \n" +
                        "\n" +
                        "Q. Comment fonctionne l'échange d'équipement amélioré ?  Quels équipements les joueurs pourront-ils échanger ?\n" +
                        "\n" +
                        "A. Vous devez échanger des ensembles d'armes et d'armures +10 de Coral Island. Veuillez vous référer à l'actualité de l'événement : (Link)\n" +
                        "\n" +
                        " \n" +
                        "\n" +
                        "Q. Le serveur FWC inclura-t-il les ensembles PvE/ Wilds de niveau 150 et les armes en cristal de Corail/Lusaka/Lusaka ? Si oui, est-ce que l'un d'entre eux sera l'ensemble FWC et l'arme FWC avec des statistiques supplémentaires lorsqu'ils seront convertis en FWC Golden ?\n" +
                        "\n" +
                        "A. Veuillez vous référer à l'article sur l'événement : (Link)\n" +
                        "\n" +
                        " \n" +
                        "\n" +
                        "Q. Si le serveur FWC dispose de sets et d'armes de niveau 150 (avec des statistiques supplémentaires lors de la conversion en FWC doré), existe-t-il un plan pour les utilisateurs qui ont travaillé dur pour obtenir leur équipement sur les serveurs principaux ?\n" +
                        "\n" +
                        "A. Les équipements FWC Golden seront exclusifs aux serveurs FWC. Cependant, nous envisageons de faire quelque chose avec les équipements actuels sur les serveurs principaux dans un contenu futur, alors restez à l'écoute de nos futures mises à jour.\n" +
                        "\n" +
                        " \n" +
                        "\n" +
                        "[FAQ sur les tournois]\n" +
                        "\n" +
                        " \n" +
                        "\n" +
                        "Q. Quelles sont les règles des tournois JcJ et JcE ?  Seront-elles les mêmes que celles du dernier FWC ?  \n" +
                        "\n" +
                        "A. Elles seront en grande partie similaires à celles du dernier FWC, mais les détails complets seront publiés ultérieurement.\n" +
                        "\n" +
                        " \n" +
                        "\n" +
                        "Q. Comment les participants seront-ils choisis ?\n" +
                        "\n" +
                        "A. Vous devrez participer à l'événement en question et soit vous classer parmi les meilleurs, soit gagner le tournoi.\n" +
                        "\n" +
                        " \n" +
                        "\n" +
                        "Q. Que se passe-t-il si l'un des participants d'une équipe refuse de se rendre aux Philippines pour le tournoi ?\n" +
                        "\n" +
                        "A. En principe, les 4 participants devront participer en personne. Plus de détails seront fournis dans l'annonce du tournoi JcJ lui-même.\n" +
                        "\n" +
                        " \n" +
                        "\n" +
                        "[Poster la FAQ de la FWC]\n" +
                        "\n" +
                        " \n" +
                        "\n" +
                        "Q. Y aura-t-il un transfert de personnages après la date de fin du FWC ?\n" +
                        "\n" +
                        "A. Oui, il y aura un transfert de personnages après la fin du FWC.\n" +
                        "\n" +
                        " \n" +
                        "\n" +
                        "Q. Si le transfert de caractères a lieu, y a-t-il des limitations dont nous devons être conscients ?\n" +
                        "\n" +
                        "A. Oui, ce sera similaire au dernier transfert de FWC, en voici une brève liste :\n" +
                        "\n" +
                        " \n" +
                        "\n" +
                        "- Penya ne sera pas transféré.\n" +
                        "\n" +
                        "- Les objets transférés conserveront tous leurs attributs (transmutation, niveau d'amélioration, élément, etc.).\n" +
                        "\n" +
                        "- Si un objet a des effets de baisse de niveau ou d'amélioration alternative appliqués mais n'est pas transféré, un parchemin sera rendu.\n" +
                        "\n" +
                        "- Tous les progrès, missions et états de revendication du Battle Pass seront transférés.\n" +
                        "\n" +
                        "- Tout Bienfait sera transféré si l'information de transfert de l'objet associé n'est pas « Pas de transfert » sur la liste de transfert des objets (qui sera annoncée à une date ultérieure).\n" +
                        "\n" +
                        "- La garde-robe sera transférée telle quelle et comprendra tous les objets.\n" +
                        "\n" +
                        "- Les accomplissements et les quêtes seront transférés. Les accomplissements liés au compte ne seront fusionnés que sur le serveur où se trouve le personnage transféré au plus haut niveau du compte.\n" +
                        "\n" +
                        "- Les parties, guildes et listes d'amis ne seront pas transférées.\n" +
                        "\n" +
                        " \n" +
                        "\n" +
                        "Q. En plus de la demande de transfert de personnage, les objets acquis sur le serveur FWC seront-ils également transférés sur le serveur choisi ?\n" +
                        "\n" +
                        "A. Oui, mais avec des limitations.\n" +
                        "\n" +
                        " \n" +
                        "\n" +
                        "- Tout ce qui a été acheté dans la boutique d'objets, à condition qu'il existe sur les serveurs principaux (à l'exception des objets de bienfaits spéciaux de FWC). Gardez à l'esprit que nous nous réservons le droit de prendre des mesures contre tout abus et RMT lié à ce sujet, y compris, mais sans s'y limiter, le refus du transfert de votre personnage.\n" +
                        "\n" +
                        "- Armures, armes et bijoux équipés.\n" +
                        "\n" +
                        "- Armures, armes et bijoux liés au FWC.\n" +
                        "\n" +
                        "- Les cosmétiques FWC tels que les titres spéciaux.\n" +
                        "\n" +
                        " \n" +
                        "\n" +
                        "Q. En cas de transfert d'articles, y aura-t-il une liste d'articles pouvant être transférés et une liste d'articles ne pouvant pas l'être ?\n" +
                        "\n" +
                        "A. Oui, elle sera fournie ultérieurement, comme lors de la précédente conférence de la FWC.\n" +
                        "\n" +
                        " \n" +
                        "\n" +
                        "Q. Si le transfert de personnage et d'objet a lieu, nos objets seront-ils liés à l'âme ou au compte ?\n" +
                        "\n" +
                        "A. La plupart des objets, y compris les objets de l'événement FWC Exchange, seront convertis en objets liés au compte, comme nous l'avons fait lors du dernier FWC, mais certains resteront liés à l'âme pour éviter les abus.\n" +
                        "\n" +
                        " \n" +
                        "\n" +
                        "Q. Si le transfert de personnages et d'objets a lieu, pourrons-nous choisir un serveur préféré pour nos personnages créés lors du FWC ?\n" +
                        "\n" +
                        "A. Oui, vous pourrez choisir votre serveur préféré. Cependant, comme lors du dernier FWC, si votre compte possède déjà un maximum de 8 personnages sur ce serveur, vous devrez supprimer un personnage pour faire de la place.\n" +
                        "\n" +
                        " \n" +
                        "\n" +
                        "Q. Si le transfert de personnages et d'objets a lieu, qu'advient-il des cartes percées et des bonus d'armes et d'armures ?\n" +
                        "\n" +
                        "A. Tout sera maintenu.\n" +
                        "\n" +
                        " \n" +
                        "\n" +
                        "Q. En cas de transfert de personnage et d'objet, qu'advient-il de la garde-robe du personnage ?\n" +
                        "\n" +
                        "A. La garde-robe sera transférée telle quelle.\n" +
                        "\n" +
                        " \n" +
                        "\n" +
                        "Q. En cas de transfert de personnage et d'objet, qu'advient-il de mon logement personnel ? Sera-t-il toujours disponible une fois transféré sur les serveurs principaux ?\n" +
                        "\n" +
                        "A. Les objets liés au logement personnel devraient tous être transférés tels quels.\n" +
                        "\n" +
                        " \n" +
                        "\n" +
                        "Q. En cas de transfert de personnage et d'objet, qu'advient-il des titres gagnés ? Seront-ils utilisables par d'autres personnages du compte transféré si le titre est lié au compte ?\n" +
                        "\n" +
                        "A. Les succès liés à un compte ne seront fusionnés que sur le serveur où se trouve le personnage de plus haut niveau transféré sur le compte.\n" +
                        "\n" +
                        " \n" +
                        "\n" +
                        "Q. Si le transfert de personnages et d'objets a lieu, qu'arrive-t-il aux guildes créées, aux vaisseaux de guilde et à leurs banques de guilde ?\n" +
                        "\n" +
                        "A. Les objets des guildes, des bateaux de guilde et des banques de guilde ne seront pas transférés car les gens peuvent choisir d'aller sur des serveurs différents. C'est au membre de la guilde de distribuer les objets de la banque entre eux avant le transfert.\n" +
                        "\n" +
                        " \n" +
                        "\n" +
                        "Q. Si le transfert de personnage et le transfert d'objets ont lieu, les objets transférables seront-ils également transférés depuis la banque du personnage ou de la boîte postale ? Ou devons-nous nous assurer d'avoir ces objets dans l'inventaire de nos personnages ?\n" +
                        "\n" +
                        "A. Oui, ils seront transférés tels quels dans la banque et/ou la boîte postale. Les objets transférés suivront les mêmes règles que celles énoncées ci-dessus.\n" +
                        "\n" +
                        " \n" +
                        "\n" +
                        "Q. Des nuées de bots venant du FWC ont été transférés sur le serveur normal (Retour dans le FWC 2023), la plupart d'entre eux ont un niveau inférieur à 120. Si le transfert de personnage est possible, avons-nous une limite de niveau pour le transfert - disons 140 pour être éligible au transfert du personnage vers le serveur principal choisi ?\n" +
                        "\n" +
                        "A. Il est possible que nous limitions le niveau des personnages qui peuvent demander le transfert afin d'empêcher les bots de bas niveau d'inonder les serveurs principaux.Nous communiquerons les détails exacts dans l'annonce de transfert ultérieurement.\n" +
                        "\n" +
                        " \n" +
                        "\n" +
                        "Q. Si le transfert de personnage a lieu et que le nom de mon personnage est déjà pris sur le serveur choisi, que se passera-t-il ?\n" +
                        "\n" +
                        "A. En cas de chevauchement de noms, votre personnage se verra attribuer un numéro aléatoire et recevra un parchemin de renommage gratuit.\n" +
                        "\n" +
                        " \n" +
                        "\n" +
                        "Q. Si un transfert de personnage a lieu, combien de temps durera le processus de transfert ? Quelles sont les étapes nécessaires pour que le transfert se déroule sans encombre ?\n" +
                        "\n" +
                        "A. Nous ne pouvons pas garantir la durée du transfert car il nécessite une copie physique des données sur nos serveurs. Tous les transferts seront effectués de manière séquentielle et nous ferons de notre mieux pour qu'ils aient lieu le plus rapidement possible." + question }],
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
