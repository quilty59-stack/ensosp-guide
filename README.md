# Guide AP COND — ENSOSP

Dématérialisation du **Guide AP COND** — assistant pédagogique conducteur du
plateau technique ENSOSP de Vitrolles. Les 16 rubriques du guide papier, sur
mobile, **entièrement consultables hors connexion** : le service worker
précache l'application et ses 38 planches (~4,3 Mo), le réseau n'étant pas
garanti sur le plateau.

## Démarrage

```bash
npm install
npm run dev      # développement
npm run build    # build de production dans dist/
npm run preview  # sert dist/ sur http://localhost:4173 (service worker actif)
```

Le service worker n'est actif qu'en build/preview : c'est là qu'il faut tester
l'installation et le mode hors ligne.

## Déploiement Vercel

Le dépôt est prêt à déployer tel quel : `vercel.json` déclare le framework Vite,
la commande de build et les en-têtes de cache (`sw.js` et le manifest en
`must-revalidate`, les assets hachés en `immutable`).

```bash
vercel        # préversion
vercel --prod # production
```

## Structure

```
vite.config.js             plugin React + VitePWA (manifest, workbox)
tailwind.config.js         darkMode: 'class', contenu scanné
vercel.json                framework, build et en-têtes de cache
index.html                 métadonnées PWA + application du thème avant rendu
public/
  guide_apcond.pdf         document source (41 pages), téléchargeable depuis Contacts
  images/                  38 planches extraites du PDF (JPEG, ~3,9 Mo)
src/
  navigation.js            les 16 rubriques (ordre du sommaire) + barre du bas
  data/
    guide.js               contenu rédactionnel du guide, page par page
    nexis.js               365 natures de fait (annexe, pages 32 à 40)
  ui.jsx                   briques partagées (Card, Collapsible, Callout, Photo…)
  assets/logo-ensosp.svg   marque de l'application : volant et flamme
  App.jsx                  thème, routage par ancre, écran de démarrage
  components/
    Header.jsx             bandeau fixe 60 px : logo, thème, menu
    BottomNav.jsx          barre fixe 70 px : 4 raccourcis + accueil surélevé
    HamburgerMenu.jsx      panneau des 16 rubriques (70 % de l'écran)
    SplashScreen.jsx       écran de démarrage, premier lancement seulement
    Logo.jsx
    pages/                 les 16 écrans
      Accueil, FicheTaches, Horaires, Dotation, Radio,
      FicheSite + Pavillon / Immeuble / ZoneUrbaine / PME / Saphire,
      AVP, Plan, Organigramme, Accident, NEXIS, Contacts
  dev/
    Emulator.jsx           cadre iPhone / iPad / Android
    EmulatePage.jsx        page /emulator
```

Chaque rubrique porte en pied de page le numéro de page du document source,
pour retrouver le passage dans le guide papier.

## Émulateur intégré

```bash
npm run dev   # puis http://localhost:5173/emulator
```

Accessible aussi par deux écritures de repli qui n'exigent aucune
configuration serveur :
`http://localhost:5173/#/emulator` et `http://localhost:5173/?view=emulator`.

Le repli par `#` sert quand la page est servie par un hébergement statique sans
réécriture SPA. En local, Vite gère déjà `/emulator` nativement (`appType: 'spa'`) :
il n'y a pas de `historyApiFallback` à ajouter, cette option est propre à webpack.
Le port est verrouillé (`strictPort`) pour que Vite refuse de démarrer si 5173 est
déjà pris par un autre projet, plutôt que de glisser sur 5174 sans le dire —
c'est la cause la plus fréquente d'un « 404 » sur localhost:5173.
L'application réelle est chargée dans une iframe `?embedded=1` : son viewport CSS
fait la taille de l'appareil choisi (iPhone 13 390 × 844, iPad Air 820 × 1180,
Pixel 7 412 × 915), et les marges d'encoche — absentes d'une iframe, où
`env(safe-area-inset-*)` vaut 0 — sont rejouées via les variables CSS
`--safe-top` / `--safe-bottom`, transmises par `postMessage` à chaque changement
d'appareil ou d'orientation (sans recharger l'app). Le thème suit celui de la
page hôte dans les deux sens.

Le cadre est mis à l'échelle pour tenir dans la fenêtre ; seul l'affichage est
réduit, le viewport embarqué reste à sa taille réelle. Le moteur de rendu est
celui du navigateur hôte : cet aperçu valide la mise en page, pas WebKit ni
l'installation réelle.

## Mettre à jour le contenu

Tout le contenu vit dans `src/data/`, sans base ni API :

- `guide.js` — rôle de l'AP, fiche de tâches, horaires des MSP, planification,
  dotation, procédures radio, sites de manœuvre, scénarios AVP, organigramme,
  conduite à tenir, contacts, légende du plan, coordonnées de l'École.
- `nexis.js` — les 365 natures de fait, avec pour chacune son libellé court,
  son libellé autoportant, son label et sa page.

Le tableau NEXIS a été extrait du PDF par géométrie : les séparateurs de lignes
et de colonnes du document délimitent chaque cellule, ce qui garantit que les
trois colonnes restent appariées. Quelques cellules du document source portent
un chiffre en guise de libellé court, et trois entrées ont un label vide : ces
valeurs sont conservées telles quelles.

**Non repris volontairement**

- La **feuille de garde** hebdomadaire (planche de la page 10) : elle nomme les
  encadrants, apprenants et manœuvrants de la semaine. Publier ces données
  personnelles sur une URL ouverte n'aurait pas été acceptable, et elle change
  chaque semaine. La page « MSP & horaires » décrit son rôle sans la reproduire.
- Le **logo institutionnel de l'ENSOSP** : l'application n'est pas un document
  validé par l'École. Elle porte sa propre marque (`src/assets/logo-ensosp.svg`).

Les originaux pleine résolution extraits du PDF sont conservés hors dépôt dans
`originaux/` (ignoré par git) ; ils se régénèrent depuis `public/guide_apcond.pdf`.

**À faire valider par le plateau technique avant diffusion** : l'organigramme
(15 personnes, page 30), l'attribution des canaux radio par le service
transmissions, et les numéros d'astreinte.

## Données locales

Quatre clés `localStorage`, propres à l'appareil : `apcond:theme` (thème),
`apcond:tab` (dernière rubrique consultée), `apcond:taches` (checklist de la
fiche de tâches), `apcond:splash` (écran de démarrage déjà vu).

La rubrique courante vit aussi dans l'ancre de l'URL (`#/radio`) : le bouton
retour d'Android revient à l'écran précédent au lieu de fermer l'application,
et un lien s'échange tel quel.
