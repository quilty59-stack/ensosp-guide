/**
 * Contenu du Guide AP COND (ENSOSP, plateau technique de Vitrolles).
 * Toutes les données proviennent du PDF « GUIDE AP COND — Assistant
 * pédagogique conducteur », dont la pagination est rappelée en commentaire.
 */

/** Rôle de l'assistant pédagogique — page 6. */
export const ROLE_AP = [
  'Se positionner comme référent du ou des centres de secours de formation auxquels l’AP est affecté.',
  'Dispenser les consignes logistiques (inventaire, EPI, ARI…) aux stagiaires et manœuvrants ; l’AP est responsable de leur bonne application.',
  'Dispenser les consignes opérationnelles (guidage, MEA, changement de bouteille ARI, plein de la tonne…).',
  'Assurer la conduite et la mise en œuvre des engins spécialisés (MEA, SR, robot…), sous les ordres du DIREX pour le déroulé de la MSP.',
  'Assurer le suivi matériel de ses CS (ticketing maintenance, magasin central, mécanique).',
  'Assurer le reconditionnement intégral des engins et des CS.',
]

/** Fiche de tâches — pages 7 et 8. */
export const FICHE_TACHES = [
  {
    id: 'lundi',
    titre: 'Lundi matin',
    sous: 'Rassemblement 07h30, puis présentation en remise et en salle CS',
    creneaux: [
      {
        heure: '07h30',
        intitule: 'Rassemblement général',
        detail:
          'Participation au rassemblement au sein de son CS d’affectation pour prise en compte des consignes de la semaine.',
      },
      {
        heure: '08h00 – 08h45',
        intitule: 'Présentation en remise',
        detail:
          'L’AP récupère les stagiaires et les manœuvrants au sein de son CS. Si l’AP est sur 2 CS, faire la présentation en plénière ou en 2 temps.',
        taches: [
          'Contrôle complet des EPI avec les stagiaires',
          'Présentation des ARI',
          'Démonstration du démontage et remontage des bouteilles ARI',
          'Contrôle des dossards',
          'Consigne : changement des bouteilles ARI dès que la pression est inférieure à 100 bars, pour des raisons logistiques',
          'Démonstration de la descente de l’échelle à coulisse des FPT',
          'Présentation des MEA avec mise en place du harnais et des points d’ancrage sur la plate-forme',
          'Présentation des VSR et mise en œuvre du matériel',
          'Présentation de la pompe et des vannes aux COD 1 : distinction entre vanne sauterelle et vanne électropneumatique, ne pas utiliser les caméléons ni l’autorégulation',
          'Plein systématique de la tonne sur les poteaux relais (ne pas utiliser le PI à proximité de la pompe à essence)',
        ],
      },
      {
        heure: '08h00 – 08h45',
        intitule: 'Consignes d’ordre général',
        taches: [
          'Mettre les engins en charge',
          'Par vent fort, bien maintenir les portes des engins à la descente et à la montée ; si le vent est trop fort, ouvrir un peu les fenêtres pour limiter la prise au vent',
          'Ranger les chasubles sur le portant',
          'Ne pas utiliser les portes des véhicules comme séchoirs',
          'Ne pas poser les casques en appui sur le pare-brise des engins',
          'Tuyau percé pendant une MSP : le rouler sur lui-même, identifier le percement avec de la rubalise et procéder à l’échange au magasin incendie par l’intermédiaire de l’AP',
          'Matériel incendie défectueux (division, lance…) : identifier la panne et le ramener au magasin incendie par l’intermédiaire de l’AP à la fin de chaque MSP',
          'Guider systématiquement lors du remisage des engins et pour toute marche arrière (le chef d’agrès)',
        ],
      },
      {
        heure: '08h45 – 09h00',
        intitule: 'Présentation en salle CS',
        taches: [
          'Présentation des radios (batteries, charge) de l’OCT en lien avec les formateurs',
          'Présentation des armoires et de leur rangement',
          'Consigne : ranger les tabourets sur les tables en fin d’après-midi pour faciliter le ménage du matin',
        ],
      },
    ],
  },
  {
    id: 'semaine',
    titre: 'Tout au long de la semaine',
    sous: 'Contrôles quotidiens de l’AP COND',
    taches: [
      'Participer au rassemblement de 07h30 dans son CS',
      'Mettre en œuvre les engins spécialisés (MEA, SR) en garantissant un niveau optimum de sécurité',
      'Contrôler quotidiennement la bonne application des consignes dispensées le lundi matin',
      'Contrôler le bon rangement des salles CS et des radios',
      'Contrôler les vitesses de déplacement des engins dans la remise (entrée – sortie)',
      'Assurer le lien avec les services supports (MI, atelier…)',
    ],
  },
  {
    id: 'vendredi',
    titre: 'Vendredi matin (ou jeudi après-midi)',
    sous: 'Clôture de semaine : carburant, lavage, inventaires et restitution',
    taches: [
      'Faire le complément de carburant des engins utilisés — présence d’un AP pour le code chauffeur, ne pas donner son code qui est confidentiel',
      'Contrôler le lavage des véhicules, intérieur et extérieur',
      'Réaliser les inventaires avec les stagiaires et manœuvrants (scan du QR code)',
      'Remonter les problématiques par courriel à magasin-central@ensosp.fr',
      'Contrôler le nettoyage des remises par les stagiaires et les manœuvrants du centre de secours (faire le tri sélectif)',
      'Contrôler la propreté des centres de secours : poubelles vides et retournées, tabourets sur les tables, inventaire des armoires CS avec QR code',
      'Contrôler le bon rangement du matériel dans l’armoire de nettoyage après utilisation',
      'Nettoyer les casques : pulvériser de l’eau sur chaque casque, les déposer dans l’armoire, mettre en fonction l’armoire séchante (cycle de 45 min)',
      'Remettre 4 bouteilles ARI de réserve dans les 2 FPT',
      'Accompagner la restitution des EPI avec le conditionnement adapté',
      'Contrôler le rangement et la propreté des salles CS en collaboration avec les opérateurs de la tour',
      'Contrôler avec les opérateurs de la tour le nombre de radios Antares TPH 700, parcellaires, baudriers, housses radio, caméras thermiques, câbles et doubles prises',
    ],
  },
]

/** Horaires des MSP — page 9. */
export const HORAIRES_MSP = {
  colonnes: ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi'],
  matin: [
    ['Rassemblement général 07h30', 'Rassemblement 07h45', 'Rassemblement 07h45', 'Rassemblement 07h45', 'Rassemblement 07h45'],
    ['Perception des effets', 'MSP 07h50 – 08h30', 'MSP 07h50 – 08h30', 'MSP 07h50 – 08h30', 'MSP 07h50 – 08h30'],
    ['Inventaire des matériels', 'Débriefing 08h50', 'Débriefing 08h50', 'Débriefing 08h50', 'Restitution des effets'],
    ['MSP 09h00 ou 10h15 – 10h55', 'MSP 09h10 – 09h50', 'MSP 09h10 – 09h50', 'MSP 09h10 – 09h50', 'Inventaire des matériels'],
    ['Débriefing 11h15', 'Débriefing 10h10', 'Débriefing 10h10', 'Débriefing 10h10', 'Nettoyage et plein d’essence'],
    ['Bus 11h30 · cérémonie des couleurs', 'MSP 10h35 – 11h15', 'MSP 10h35 – 11h15', 'MSP 10h35 – 11h15', 'Rassemblement général 11h30'],
    ['', 'Débriefing 11h35 · Bus 11h45', 'Débriefing 11h35 · Bus 11h45', 'Débriefing 11h35 · Bus 11h45', 'Bus 11h45'],
  ],
  apresMidi: [
    ['Rassemblement 13h45', 'Rassemblement 13h45', 'Rassemblement 13h45', 'Rassemblement 13h45', '—'],
    ['MSP 13h50 – 14h30', 'MSP 13h50 – 14h30', 'MSP 13h50 – 14h30', 'MSP 13h50 – 14h30', '—'],
    ['Débriefing 14h50', 'Débriefing 14h50', 'Débriefing 14h50', 'Débriefing 14h50', '—'],
    ['MSP 15h10 – 15h50', 'MSP 15h10 – 15h50', 'MSP 15h10 – 15h50', 'MSP 15h10 – 15h50', '—'],
    ['Débriefing 16h10', 'Débriefing 16h10', 'Débriefing 16h10', 'Débriefing 16h10', '—'],
    ['Bus 17h00', 'Bus 17h00', 'Bus 17h00', 'Bus 17h00', '—'],
  ],
}

/** Planification des CS et des MSP — page 10. */
export const PLANIFICATION = {
  intro:
    'La « feuille de garde » hebdomadaire constitue l’outil central de suivi et d’organisation des activités sur le plateau technique. Elle présente la planification hebdomadaire des personnels encadrants et la répartition des agents dans les centres de secours.',
  cs: ['Alpha', 'Bravo', 'Charlie', 'Echo', 'Golf', 'India'],
  csNote: 'Six centres de secours, un 7e est disponible au besoin.',
  blocs: [
    {
      titre: 'Encadrants et intervenants',
      detail:
        'Officiers mobilisés avec mention des fonctions exercées (DIREX, APSEC, AP) et les coordonnées utiles, dont les téléphones des CS.',
    },
    {
      titre: 'Apprenants',
      detail: 'Stagiaires engagés dans les séquences de formation : FILT, CDG (chefs de groupe en formation).',
      liste: ['FILT', 'CDG — chefs de groupe en formation'],
    },
    {
      titre: 'Manœuvrants',
      detail: 'Effectifs affectés aux exercices, disponibles pour les mises en situation.',
      liste: ['FI', 'BMPM', 'Militaires bases', 'SPV', 'Élèves en Bac Pro Sécurité'],
    },
  ],
  missions: ['DIREX — direction des exercices', 'Officiers sécurité', 'Assistants de sécurité', 'Assistants pédagogiques'],
}

/** Dotation EPI et matériels — page 11. */
export const DOTATION = {
  intro:
    'Après le rassemblement du lundi matin, vous vous rendez au magasin habillement afin de percevoir votre tenue de feu complète. Cette dotation constitue votre équipement individuel de protection, obligatoire pour toutes les activités sur le plateau technique.',
  epi: ['Casque F1', 'Cagoule', 'Gants de protection', 'Veste de feu', 'Surpantalon'],
  local:
    'Dans le local « AP », vous prenez en charge le matériel opérationnel correspondant à votre centre de secours (Alpha, Bravo…).',
  materiel: ['Radio TPH 700', 'Lampe', 'Masque ARI'],
  consigne:
    'Il vous appartient de vérifier l’état général et le bon fonctionnement de chaque matériel avant utilisation, puis d’en assurer le nettoyage, le rangement et la restitution en fin de journée ou de semaine.',
}

/** Procédures radio — page 12. */
export const RADIO = {
  terminal: 'Terminal portatif ANTARES TPH 700',
  intro:
    'Le TPH 700 est utilisé principalement pour déclencher vos séquences pédagogiques (MSP). Vous devez le régler sur le canal correspondant à votre CS d’affectation.',
  cs: ['ALPHA', 'BRAVO', 'CHARLIE', 'ECHO', 'GOLF', 'INDIA'],
  exemple: { cs: 'CS ALPHA', canal: 'TGK 269' },
  reference:
    'Reportez-vous à la feuille de garde de la semaine pour déterminer le canal de communication correspondant à votre CS d’affectation.',
  speciaux: [
    { canal: 'Canal 278', affectation: 'Service maintenance', detail: 'Problème sur un simulateur : s’adresser au service maintenance via le canal 278 / OPE4.' },
    { canal: 'Canal 218', affectation: 'Assistants pédagogiques', detail: 'Canal de liaison entre assistants pédagogiques.' },
  ],
  mgx: 'Service MGX : fréquence radio dédiée OP4 pour la mise en place et l’évacuation des véhicules.',
}

/** Index des rues du plateau — page 3. */
export const RUES = [
  'Abès', 'Acacias', 'Argelas', 'Bas', 'Bruyères', 'Buissons', 'Châtaigniers',
  'Cyprès', 'Ficus', 'Garrigue', 'Marronniers', 'Mimosas', 'Oliviers', 'Palmiers',
  'Peupliers', 'Pins', 'Platanes', 'Sycomores', 'Tamaris',
]

/** Sites de manœuvre — pages 13 à 29. */
export const SITES = [
  {
    id: 'pavillon',
    nom: 'Pavillon',
    coordonnees: 'D2',
    type: 'RdC – 1 + combles',
    accent: 'emerald',
    photo: '/images/pavillon-photo.jpg',
    vue3d: '/images/pavillon-3d.jpg',
    plan: '/images/pavillon-plan.jpg',
    adresses: [
      { libelle: 'Entrée principale', valeur: '9 bis rue des Pins' },
      { libelle: 'Entrée latérale', valeur: '13 rue des Pins' },
      { libelle: 'Salon d’esthétique (R-1)', valeur: '9 rue des Pins' },
    ],
    points: ['Garage avec VL', 'Bouteille acétylène', 'Salon d’esthétique en R-1'],
  },
  {
    id: 'immeuble',
    nom: 'Immeuble',
    coordonnees: 'C3',
    type: 'R + 4 – 1',
    accent: 'blue',
    photo: '/images/immeuble-photo.jpg',
    vue3d: '/images/immeuble-3d.jpg',
    plan: '/images/immeuble-plan.jpg',
    adresses: [
      { libelle: 'Entrée principale', valeur: '1 rue des Pins' },
      { libelle: 'Pizzeria — ERP de type N', valeur: '1 bis rue des Pins' },
      { libelle: 'Garage, parking et caves', valeur: '2 rue des Pins' },
    ],
    points: ['Sous-sol avec simulateur feu de VL', 'Pizzeria en pied d’immeuble (ERP de type N)'],
    alerte: 'Une zone du bâtiment est interdite d’accès aux stagiaires et aux manœuvrants.',
  },
  {
    id: 'zone-urbaine',
    nom: 'Zone urbaine',
    coordonnees: 'E3',
    type: 'R + 2 – 1',
    accent: 'violet',
    photo: '/images/zone-urbaine-photo.jpg',
    vue3d: '/images/zone-urbaine-3d.jpg',
    plan: '/images/zone-urbaine-plan.jpg',
    galerie: ['/images/zone-urbaine-detail.jpg', '/images/zone-urbaine-laverie.jpg'],
    adresses: [
      { libelle: 'Entrée 1', valeur: '7 rue des Châtaigniers' },
      { libelle: 'Entrée 2 — ERP de type M', valeur: '3 voie Lazare Ponticelli' },
      { libelle: 'Entrée 3 — ERP de type U', valeur: '4 rue des Palmiers' },
      { libelle: 'Entrée 4 — ERP de type O', valeur: '5 rue des Palmiers' },
    ],
    points: ['Hôtel', 'Laboratoire d’analyses médicales', 'Laverie', 'Aire réfractaire'],
  },
  {
    id: 'pme',
    nom: 'PME',
    coordonnees: 'E3',
    type: 'R + 1',
    accent: 'amber',
    photo: '/images/pme-photo.jpg',
    vue3d: '/images/pme-3d.jpg',
    plan: '/images/pme-plan.jpg',
    adresses: [
      { libelle: 'Entrée 1', valeur: '1 rue des Mimosas' },
      { libelle: 'Entrée 2', valeur: '3 rue des Mimosas' },
      { libelle: 'Entrée 3', valeur: '7 rue des Châtaigniers' },
    ],
    points: ['Accessoires et mannequins au 6 rue des Châtaigniers'],
  },
  {
    id: 'saphire',
    nom: 'Saphire',
    coordonnees: 'C3',
    type: 'Site de manœuvre',
    accent: 'red',
    photo: '/images/saphire-photo.jpg',
    vue3d: '/images/saphire-3d.jpg',
    plan: '/images/saphire-plan.jpg',
    galerie: ['/images/saphire-gaz.jpg'],
    adresses: [
      { libelle: 'Entrée 1', valeur: 'Rue des Sycomores, angle RD 89' },
      { libelle: 'Entrée 2', valeur: 'Rue des Sycomores' },
      { libelle: 'Entrée 3', valeur: 'Chemin des Oliviers' },
    ],
    points: [
      'Mannequins : caisson maritime RD',
      'Accessoires : caisson maritime RD, signalétique TMD « voie Lazare Ponticelli »',
      'Tableau électrique marche / arrêt',
      'Ouverture des bouteilles de gaz : tirer la bague pour manœuvrer la vanne',
    ],
  },
]

/** Scénarios AVP et accident aérien — pages 23 à 29. */
export const SCENARIOS = [
  {
    id: 'avp-2roues',
    nom: 'AVP véhicule avec ou sans 2 roues',
    coordonnees: 'E2',
    photo: '/images/avp-2roues.jpg',
    plan: '/images/avp-2roues-plan.jpg',
    acces: ['Accès 1 : Square des Peupliers'],
    mannequins: 'Caisson maritime RD',
    accessoires: 'Caisson maritime RD',
    vigilance: 'Pas de stationnement rue des Peupliers, route à sens unique.',
  },
  {
    id: 'avp-tmd',
    nom: 'AVP véhicule TMD, avec ou sans fuite',
    coordonnees: 'D2',
    photo: '/images/avp-tmd.jpg',
    plan: '/images/avp-tmd-plan.jpg',
    acces: ['Accès 1 : rue des Oliviers'],
    mannequins: 'Caisson maritime RD',
    accessoires: 'Caisson maritime RD, signalétique MD 1 « voie Lazare Ponticelli »',
    detail: 'Fuite en phase gazeuse et/ou liquide.',
  },
  {
    id: 'avp-voie-rapide',
    nom: 'AVP sur voie rapide avec véhicule en feu',
    coordonnees: 'B3 · C3 · D2 · D1',
    photo: '/images/avp-voie-rapide.jpg',
    plan: '/images/avp-voie-rapide-plan.jpg',
    acces: ['Accès 1 : autoroute A13 — indiquer le sens de circulation et le PK 34'],
    mannequins: 'Caisson maritime RD',
    accessoires: 'Caisson maritime RD, feu à main (VL sécu)',
  },
  {
    id: 'avp-bus',
    nom: 'AVP bus / autocar, seul ou contre 1 VL',
    coordonnees: 'A3',
    photo: '/images/avp-bus.jpg',
    plan: '/images/avp-bus-plan.jpg',
    acces: ['Accès 1 : route départementale 89'],
    mannequins: 'Caisson maritime RD',
    accessoires: 'Caisson maritime RD',
    vigilance:
      'S’informer au préalable de la disponibilité du véhicule à positionner (service MGX, fréquence radio dédiée OP4 pour mise en place et évacuation). Utiliser des plastrons « victimes » et/ou des mannequins.',
  },
  {
    id: 'avp-poteau',
    nom: 'AVP VL contre poteau EDF / téléphonique',
    coordonnees: 'C2',
    photo: '/images/avp-poteau.jpg',
    plan: '/images/avp-poteau-plan.jpg',
    acces: ['Accès 1 : route départementale 89'],
    mannequins: 'Caisson maritime RD',
    accessoires: 'Caisson maritime RD',
  },
  {
    id: 'avp-feu-vl',
    nom: 'AVP VL suivi de feu',
    coordonnees: 'B2',
    photo: '/images/avp-feu-vl.jpg',
    plan: '/images/avp-feu-vl-plan.jpg',
    acces: ['Accès 1 : RD 89'],
    mannequins: 'Caisson maritime RD',
    accessoires: 'Caisson maritime RD, feu à main (VL sécu)',
  },
  {
    id: 'accident-aerien',
    nom: 'Accident aéronef',
    coordonnees: 'E2',
    photo: '/images/accident-aerien.jpg',
    plan: '/images/accident-aerien-plan.jpg',
    acces: ['Accès 1 : autoroute A13, casse automobile'],
    mannequins: 'Caisson maritime RD',
    accessoires: 'Caisson maritime RD, machine à fumée',
  },
]

/** Organigramme du plateau technique — page 30. */
export const ORGANIGRAMME = [
  {
    id: 'direction',
    titre: 'Direction du site',
    accent: 'violet',
    membres: [
      { nom: 'Commandant Frédéric PUEL', fonction: 'Chef du site du plateau technique', rattachement: 'DOPS' },
      {
        nom: 'Lieutenant John MARGUET',
        fonction: 'Chef du bureau planning, adjoint au chef de service du plateau technique',
      },
    ],
  },
  {
    id: 'ap',
    titre: 'Assistants pédagogiques',
    accent: 'red',
    membres: [
      { nom: 'M. Thierry IGNAM', fonction: 'Assistant pédagogique' },
      { nom: 'M. Stéphane POULLY', fonction: 'Assistant pédagogique' },
      { nom: 'M. Ludovic COLOMBINI', fonction: 'Assistant pédagogique' },
      { nom: 'M. Hugo LECOQ', fonction: 'Assistant pédagogique' },
    ],
  },
  {
    id: 'magasin',
    titre: 'Magasin central',
    accent: 'amber',
    courriel: 'magasin-central@ensosp.fr',
    membres: [
      { nom: 'M. Willy HONORINE', fonction: 'Assistant technique' },
      { nom: 'M. Arnaud STEINBECHER', fonction: 'Assistant technique' },
      { nom: 'M. Christophe FRISSOLE', fonction: 'Assistant technique' },
    ],
  },
  {
    id: 'maintenance',
    titre: 'Maintenance des outils de simulation',
    accent: 'emerald',
    membres: [
      {
        nom: 'M. Christophe MICHEL',
        fonction: 'Chef du bureau de la gestion et de la maintenance des outils de simulation',
      },
      { nom: 'M. Stéphane BERARDI', fonction: 'Chef de cellule maintenance' },
      { nom: 'M. Olivier GIRARDOT', fonction: 'Assistant technique' },
      { nom: 'M. Brice MICHEL', fonction: 'Assistant technique' },
    ],
  },
  {
    id: 'mgx',
    titre: 'MGX — atelier mécanique',
    accent: 'blue',
    membres: [
      { nom: 'M. Philippe MERCIER', fonction: 'Atelier mécanique' },
      { nom: 'Adjudant-chef Pascal BOURDEIL', fonction: 'Atelier mécanique' },
    ],
  },
]

/** Conduite à tenir en cas d'accident — page 31. */
export const CONDUITE_ACCIDENT = [
  {
    n: 1,
    qui: 'Témoins',
    quoi: 'Informe le DIREX et/ou l’officier sécurité.',
    avec: ['Radio OP/SPE', 'TPH 700'],
  },
  {
    n: 2,
    type: 'decision',
    question: 'Détresse vitale ?',
    oui: {
      actions: [
        'Assure les 1ers soins',
        'Transmet un bilan au CRRA 15 qui engage les secours',
      ],
      avec: ['Secouristes sur place', 'Fiche bilan'],
    },
    non: {
      actions: ['Transmet un bilan au cadre SSSM d’astreinte'],
      avec: ['Tél. 666 ou 04 42 39 06 66'],
    },
  },
  {
    n: 3,
    qui: 'DIREX / officier sécurité',
    quoi: 'Désigne un CA SUAP, informe la tour de contrôle, passe un bilan circonstanciel, informe l’astreinte SSSM et le chef du plateau ou son représentant.',
  },
  { n: 4, qui: 'Astreinte SSSM', quoi: 'Donne la conduite à tenir.' },
  {
    n: 5,
    type: 'decision',
    question: 'Victime valide ?',
    oui: { actions: ['Départ VLR avec référent CS'], avec: ['VLR', '1 équipier'] },
    non: {
      actions: [
        'Déclenchement départ VSAV OP plateau avec référent CS',
        'Déclenchement départ VSAV plateau avec référent CS',
      ],
      avec: ['VSAV', '2 équipiers'],
    },
  },
  { n: 6, qui: 'Référent CS', quoi: 'Prend en charge la victime.' },
  {
    n: 7,
    qui: 'Chef de plateau ou son représentant',
    quoi: 'Prévient l’officier de permanence verbalement, puis en cas de transfert vers un centre hospitalier adresse un courriel à l’OSA chef division DOSIM DOPS, au chef de département et au médecin-chef.',
    avec: ['Tél. 333 ou 06 71 23 95 52'],
  },
  {
    n: 8,
    qui: 'Le CA VSAV',
    quoi: 'Renseigne le fichier accidentologie PLT.',
    avec: ['Fichier « BAL Vitrolles »'],
  },
  { n: 9, qui: 'DIREX', quoi: 'Rédige un compte rendu.', avec: ['Repérage secouriste'] },
]

/** Numéros utiles cités par le guide. */
export const CONTACTS = [
  { id: 'crra', label: 'CRRA 15', numero: '15', detail: 'Détresse vitale : transmission du bilan, engage les secours', urgent: true },
  { id: 'secours', label: 'Secours', numero: '18', detail: 'Sapeurs-pompiers — 112 depuis un mobile', urgent: true },
  { id: 'sssm', label: 'Cadre SSSM d’astreinte', numero: '0442390666', affichage: 'Tél. 666 ou 04 42 39 06 66', detail: 'Bilan en l’absence de détresse vitale' },
  { id: 'plateau', label: 'Chef du plateau ou son représentant', numero: '0671239552', affichage: 'Tél. 333 ou 06 71 23 95 52', detail: 'Information de l’officier de permanence' },
  { id: 'magasin', label: 'Magasin central', courriel: 'magasin-central@ensosp.fr', detail: 'Remontée des problématiques matériel' },
  { id: 'maintenance', label: 'Service maintenance', canal: 'Canal radio 278 / OPE4', detail: 'Problème sur un simulateur' },
  { id: 'ap', label: 'Assistants pédagogiques', canal: 'Canal radio 218', detail: 'Liaison entre AP' },
  { id: 'mgx', label: 'Service MGX', canal: 'Fréquence OP4', detail: 'Mise en place et évacuation des véhicules' },
]

/**
 * Légende du plan général du plateau — encart de la planche « Site de Vitrolles »
 * (page 2 du guide, mise à jour du 13/09/2025).
 */
export const PLAN = {
  titre: 'Site de Vitrolles',
  sousTitre: 'Plan général du plateau technique',
  miseAJour: '13/09/2025',
  quadrillage: 'Colonnes A à G, rangées 0 à 4',
  legende: [
    { couleur: '#F5A623', libelle: 'Voies de circulation' },
    { couleur: '#111827', libelle: 'Autoroute' },
    { couleur: '#8B1A1A', libelle: 'Immeubles, pavillons ERP' },
    { couleur: '#9CA3AF', libelle: 'Bâtiments, containers réservés au service' },
    { couleur: '#A7D7A7', libelle: 'Points sensibles et zones fictives' },
    { couleur: '#EF4444', libelle: 'Aire réfractaire', contour: true },
    { couleur: '#2563EB', libelle: 'PI utilisables en manœuvre' },
    { couleur: '#2563EB', libelle: 'BI utilisables en manœuvre', contour: true },
    { couleur: '#DC2626', libelle: 'PI non utilisables en manœuvre' },
    { couleur: '#FDE047', libelle: 'Citerne GAZ' },
    { couleur: '#F59E0B', libelle: 'Ligne électrique HT/THT' },
    { couleur: '#B45309', libelle: 'Sites de manœuvres' },
    { couleur: '#78350F', libelle: 'Caisson maritime' },
  ],
}

/** Coordonnées de l'École — quatrième de couverture du guide. */
export const ENSOSP = {
  nom: 'École nationale supérieure des officiers de sapeurs-pompiers',
  adresse: '1070, rue Lieutenant Parayre — BP 20316, 13798 Aix-en-Provence CEDEX 03',
  telephone: '+33 (0)4 42 39 04 00',
  site: 'ensosp.fr',
  devise: 'Une École qui forme, une École qui anticipe, une École ouverte',
  edition: 'ENSOSP — décembre 2025',
}
