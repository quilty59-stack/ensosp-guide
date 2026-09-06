# Guide AP COND — ENSOSP

PWA d'aide-mémoire pour l'adjoint pédagogique conduite du plateau technique
ENSOSP. Installable sur mobile et **entièrement consultable hors connexion**
(tout le shell est précaché par le service worker).

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
postcss.config.js          tailwindcss + autoprefixer
vercel.json                framework, build et en-têtes de cache
index.html                 métadonnées PWA + application du thème avant rendu
src/
  main.jsx
  index.css                directives Tailwind + utilitaires safe-area
  App.jsx                  thème, navigation 7 pages, bandeau hors ligne
  components/
    Navigation.jsx         barre fixe 7 onglets + bascule clair/sombre + TABS
    ui.jsx                 briques partagées (Card, Collapsible, Callout…)
    HomePage.jsx           7 cartes d'accès + zone bleue de 5 infos rapides
    FicheTaches.jsx        horaires + 27 tâches (10 lundi / 6 quotidien / 11 vendredi)
    Sites.jsx              Pavillon D2, Immeuble C3, Zone urbaine E3
    Radio.jsx              6 CS sur TGK 269, TGK 278 et 218, maintenance TPH 700
    Organigramme.jsx       contacts urgents + 5 sections dépliantes
    Accident.jsx           arbre de décision 7 étapes, OUI vert / NON rouge
    NEXIS.jsx              51 motifs, 9 catégories, recherche et filtres
    Emulator.jsx           cadre iPhone / iPad / Android (encoche, barre d'état,
                           safe area, barre de geste, feuille de partage iOS)
    EmulatePage.jsx        page /emulator : sélecteurs d'appareil, orientation,
                           app ou navigateur, bouton Installer, URL servie
```

## Émulateur intégré

```bash
npm run dev   # puis http://localhost:5173/emulator
```

Accessible aussi depuis le lien « Tester en émulateur » en bas de l'accueil, et
par deux écritures de repli qui n'exigent aucune configuration serveur :
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

Chaque écran expose ses données en constantes en tête de fichier, sans base ni
API : `INFOS_RAPIDES` (HomePage), `HORAIRES` et `SECTIONS` (FicheTaches),
`SITES` (Sites), `CANAUX_CS` et `CANAUX_SPECIALISES` (Radio), `SECTIONS` et
`URGENCES` (Organigramme), `ETAPES` (Accident), `CATEGORIES` et `MOTIFS` (NEXIS).

**À compléter / valider avant diffusion** : noms des personnels et postes
téléphoniques de l'organigramme (champs `nom` et `tel` — un `tel` rempli devient
un appel direct), attribution définitive des canaux par le service
transmissions, et correspondance des motifs NEXIS avec le règlement
opérationnel départemental.

Numéros déjà intégrés : secours 18 / 112, urgence interne **333**, astreinte
plateau **06 71 23 95 52**, standard ENSOSP **04 42 39 06 66**, SAMU 15,
police 17. Magasin : **magasin-central@ensosp.fr** (lien direct depuis la tâche
d'inventaire du vendredi).

## Données locales

Trois clés `localStorage`, propres à l'appareil : `apcond:theme` (thème),
`apcond:tab` (dernière rubrique consultée), `apcond:taches` (checklist).
