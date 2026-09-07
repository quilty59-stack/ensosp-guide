import { SCENARIOS } from './data/guide.js'
import {
  Building,
  Building2,
  CalendarClock,
  Car,
  ClipboardList,
  Factory,
  Home,
  House,
  ListChecks,
  Map,
  Phone,
  RadioTower,
  Shirt,
  TriangleAlert,
  Users,
  Warehouse,
} from 'lucide-react'

/**
 * Les seize rubriques du guide, dans l'ordre du sommaire papier.
 * `page` renvoie à la page du PDF, ce qui permet de retrouver la rubrique
 * dans le document imprimé.
 */
export const PAGES = [
  { id: 'accueil', titre: 'Accueil', icone: Home, page: 6 },
  { id: 'taches', titre: 'Fiche de tâches', icone: ListChecks, page: 7 },
  { id: 'horaires', titre: 'MSP & horaires', icone: CalendarClock, page: 9 },
  { id: 'dotation', titre: 'Dotation EPI', icone: Shirt, page: 11 },
  { id: 'radio', titre: 'Radio', icone: RadioTower, page: 12 },
  { id: 'sites', titre: 'Sites de manœuvre', icone: Building2, page: 13, liste: true },
  { id: 'pavillon', titre: 'Pavillon', repere: 'D2', icone: House, page: 13, site: true, parent: 'sites' },
  { id: 'immeuble', titre: 'Immeuble', repere: 'C3', icone: Building2, page: 15, site: true, parent: 'sites' },
  { id: 'zone-urbaine', titre: 'Zone urbaine', repere: 'E3', icone: Building, page: 17, site: true, parent: 'sites' },
  { id: 'pme', titre: 'PME', repere: 'E3', icone: Warehouse, page: 19, site: true, parent: 'sites' },
  { id: 'saphire', titre: 'Saphire', repere: 'C3', icone: Factory, page: 21, site: true, parent: 'sites' },
  { id: 'avp', titre: 'Scénarios AVP', icone: Car, page: 23 },
  { id: 'plan', titre: 'Plan du site', icone: Map, page: 2 },
  { id: 'organigramme', titre: 'Organigramme', icone: Users, page: 30 },
  { id: 'accident', titre: 'Conduite à tenir', icone: TriangleAlert, page: 31 },
  { id: 'nexis', titre: 'NEXIS', icone: ClipboardList, page: 32 },
  { id: 'contacts', titre: 'Contacts', icone: Phone, page: 41 },
]

/** Accès direct par identifiant, utilisé par le routage et le menu. */
export const PAGE_PAR_ID = Object.fromEntries(PAGES.map((p) => [p.id, p]))

/** Les cinq sites de manœuvre, listés par la page « Sites de manœuvre ». */
export const SITES_NAV = PAGES.filter((p) => p.site)

/**
 * Les sept scénarios d'accident, listés par la page « Scénarios AVP ».
 * Leurs fiches se rejoignent depuis la liste, pas depuis le menu : elles
 * l'allongeraient sans rien apporter.
 */
export const SCENARIOS_NAV = SCENARIOS.map((s) => ({
  id: s.id,
  titre: s.nom,
  repere: s.coordonnees,
  icone: Car,
  page: s.page ?? 23,
  parent: 'avp',
}))

/** Chaque fiche connaît la liste dont elle est issue : le retour y ramène. */
export const PARENT = Object.fromEntries(
  [...PAGES, ...SCENARIOS_NAV]
    .filter((p) => p.parent)
    .map((p) => [p.id, p.parent]),
)

/** Toutes les destinations atteignables, fiches de scénario comprises. */
export const TOUTES_PAGES = [...PAGES, ...SCENARIOS_NAV]
export const PAGE_PAR_ID_COMPLET = Object.fromEntries(
  TOUTES_PAGES.map((p) => [p.id, p]),
)

/**
 * Barre du bas : les quatre rubriques ouvertes le plus souvent en manœuvre,
 * de part et d'autre du retour à l'accueil.
 */
export const RACCOURCIS = [
  { id: 'taches', libelle: 'Tâches', icone: ListChecks },
  { id: 'horaires', libelle: 'Horaires', icone: CalendarClock },
  { id: 'accueil', libelle: 'Accueil', icone: Home, principal: true },
  { id: 'sites', libelle: 'Sites', icone: Building2 },
  { id: 'radio', libelle: 'Radio', icone: RadioTower },
]
