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
  { id: 'pavillon', titre: 'Pavillon', repere: 'D2', icone: House, page: 13, site: true },
  { id: 'immeuble', titre: 'Immeuble', repere: 'C3', icone: Building2, page: 15, site: true },
  { id: 'zone-urbaine', titre: 'Zone urbaine', repere: 'E3', icone: Building, page: 17, site: true },
  { id: 'pme', titre: 'PME', repere: 'E3', icone: Warehouse, page: 19, site: true },
  { id: 'saphire', titre: 'Saphire', repere: 'C3', icone: Factory, page: 21, site: true },
  { id: 'avp', titre: 'Scénarios AVP', icone: Car, page: 23 },
  { id: 'plan', titre: 'Plan du site', icone: Map, page: 2 },
  { id: 'organigramme', titre: 'Organigramme', icone: Users, page: 30 },
  { id: 'accident', titre: 'Conduite à tenir', icone: TriangleAlert, page: 31 },
  { id: 'nexis', titre: 'NEXIS', icone: ClipboardList, page: 32 },
  { id: 'contacts', titre: 'Contacts', icone: Phone, page: 41 },
]

/** Accès direct par identifiant, utilisé par le routage et le menu. */
export const PAGE_PAR_ID = Object.fromEntries(PAGES.map((p) => [p.id, p]))

/** Les cinq sites de manœuvre, listés sur la page « Plan du site ». */
export const SITES_NAV = PAGES.filter((p) => p.site)

/**
 * Barre du bas : les quatre rubriques ouvertes le plus souvent en manœuvre,
 * de part et d'autre du retour à l'accueil.
 * « Sites » ouvre le plan général, d'où l'on choisit son site.
 */
export const RACCOURCIS = [
  { id: 'taches', libelle: 'Tâches', icone: ListChecks },
  { id: 'horaires', libelle: 'Horaires', icone: CalendarClock },
  { id: 'accueil', libelle: 'Accueil', icone: Home, principal: true },
  { id: 'plan', libelle: 'Sites', icone: Map },
  { id: 'radio', libelle: 'Radio', icone: RadioTower },
]
