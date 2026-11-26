export type ContactStatus = "official" | "credible" | "needs_confirmation" | "unverified";
export type GroupKey = "national" | "labogon" | "city";
export type FacilityTypeKey = "hospital" | "health" | "fire" | "police" | "evacuation" | "rescue" | "office";

export interface Agency {
  id: string;
  order: number;
  name: string;
  contactPerson: string | null;
  group: GroupKey;
  status: ContactStatus;
}

export interface Contact {
  id: string;
  agencyId: string;
  group: GroupKey;
  name: string;
  typeLabel: string;
  number: string;
  status: ContactStatus;
  sourceId: string;
  checkedOn: string;
}

export interface Facility {
  id: string;
  name: string;
  type: FacilityTypeKey;
  scope: "labogon" | "city";
  address: string | null;
  lat: number | null;
  lng: number | null;
  contactIds: string[];
  sourceId: string;
  note: string;
}

export const DATA_META = {
  lastReviewed: "2026-11-25"
};

/* Approximate center of Barangay Labogon (PhilAtlas, ~10.3495, 123.9582).
   This is a rough point for the map, NOT an official boundary. */
export const MAP_CENTER = { lat: 10.3495, lng: 123.9582 };

export const FACILITY_TYPES: Record<FacilityTypeKey, { icon: string }> = {
  hospital:   { icon: "🏥" },
  health:     { icon: "🩺" },
  fire:       { icon: "🚒" },
  police:     { icon: "🚓" },
  evacuation: { icon: "🏫" },
  rescue:     { icon: "🚑" },
  office:     { icon: "🏛️" }
};

export const SOURCES: Record<string, { label: string; url: string | null; date: string }> = {
  researcher_directory: {
    label: "Emergency Hotlines – Labogon and Mandaue City (compiled directory)",
    url: null,
    date: "25 Nov 2026"
  },
  student: {
    label: "Initial facility data supplied by the researcher (address pending verification)",
    url: null,
    date: "—"
  },
  chonghua: {
    label: "Chong Hua Hospital – Contact Us (official hospital website)",
    url: "https://chonghua.com.ph/contact/",
    date: "Website checked 24 Nov 2026"
  },
  dromic_gym: {
    label: "DSWD DROMIC Report #1 – Fire in Brgy. Labogon (families sheltered at Barangay Labogon Gymnasium)",
    url: "https://dromic.dswd.gov.ph/wp-content/uploads/2025/06/DSWD-DROMIC-Report-1-on-the-Fire-Incident-in-Brgy.-Labogon-Mandaue-City-as-of-13-June-2025-6AM.pdf",
    date: "13 Jun 2025"
  },
  sunstar_fire_centro: {
    label: "SunStar – Hose mapping system saves homes in Mandaue City fire (Mandaue City Fire Station in Barangay Centro)",
    url: "https://www.sunstar.com.ph/cebu/hose-mapping-system-saves-homes-in-mandaue-city-fire",
    date: "Undated in search result"
  },
  philstar_command: {
    label: "Philstar – Mandaue launches emergency hotline number (command center beside City Hall)",
    url: "https://www.philstar.com/metro-cebu/2013/09/14/1209411/mandaue-launches-emergency-hotline-number",
    date: "14 Sep 2013 (location should be re-confirmed)"
  },
  barangaydirectory: {
    label: "Barangay Directory – Barangay Labogon (says contact information is still being collected)",
    url: "https://www.barangaydirectory.com/barangay/city-of-mandaue/labogon",
    date: "Checked 24 Nov 2026"
  },
  philatlas: {
    label: "PhilAtlas – Labogon, City of Mandaue (approximate coordinates)",
    url: "https://www.philatlas.com/visayas/r07/mandaue/labogon.html",
    date: "Checked 24 Nov 2026"
  }
};

export const AGENCIES: Agency[] = [
  {
    id: "national-911",
    order: 1,
    name: "National Emergency Hotline",
    contactPerson: null,
    group: "national",
    status: "official"
  },
  {
    id: "labogon-ert",
    order: 2,
    name: "Brgy. Labogon Emergency Response Team (ERT)",
    contactPerson: "Contact: Nejana Cares",
    group: "labogon",
    status: "official"
  },
  {
    id: "bantay-mandaue",
    order: 3,
    name: "Bantay Mandaue – CDRRMO",
    contactPerson: null,
    group: "city",
    status: "official"
  },
  {
    id: "bfp-mandaue",
    order: 4,
    name: "Bureau of Fire Protection (Mandaue City)",
    contactPerson: null,
    group: "city",
    status: "official"
  },
  {
    id: "mcpo",
    order: 5,
    name: "Mandaue City Police Office",
    contactPerson: null,
    group: "city",
    status: "official"
  },
  {
    id: "cebu-pdrrmo",
    order: 6,
    name: "Cebu Provincial Disaster Risk Reduction and Management Office",
    contactPerson: null,
    group: "city",
    status: "official"
  },
  {
    id: "redcross-cebu",
    order: 7,
    name: "Philippine Red Cross (Cebu City)",
    contactPerson: null,
    group: "city",
    status: "official"
  },
  {
    id: "eruf",
    order: 8,
    name: "Emergency Rescue Unit Foundation (ERUF)",
    contactPerson: null,
    group: "city",
    status: "official"
  }
];

export const CONTACTS: Contact[] = [
  {
    id: "nat-911",
    agencyId: "national-911",
    group: "national",
    name: "National Emergency Hotline",
    typeLabel: "National Emergency Hotline",
    number: "911",
    status: "official",
    sourceId: "researcher_directory",
    checkedOn: "2026-11-25"
  },
  {
    id: "labogon-ert-globe-1",
    agencyId: "labogon-ert",
    group: "labogon",
    name: "Brgy. Labogon ERT – Globe",
    typeLabel: "Globe",
    number: "09274012389",
    status: "official",
    sourceId: "researcher_directory",
    checkedOn: "2026-11-25"
  },
  {
    id: "labogon-ert-globe-2",
    agencyId: "labogon-ert",
    group: "labogon",
    name: "Brgy. Labogon ERT – Globe",
    typeLabel: "Globe",
    number: "09956400351",
    status: "official",
    sourceId: "researcher_directory",
    checkedOn: "2026-11-25"
  },
  {
    id: "labogon-ert-suntnt-1",
    agencyId: "labogon-ert",
    group: "labogon",
    name: "Brgy. Labogon ERT – Sun/TNT",
    typeLabel: "Sun/TNT",
    number: "09227557184",
    status: "official",
    sourceId: "researcher_directory",
    checkedOn: "2026-11-25"
  },
  {
    id: "labogon-ert-suntnt-2",
    agencyId: "labogon-ert",
    group: "labogon",
    name: "Brgy. Labogon ERT – Sun/TNT",
    typeLabel: "Sun/TNT",
    number: "09810000259",
    status: "official",
    sourceId: "researcher_directory",
    checkedOn: "2026-11-25"
  },
  {
    id: "cdrrmo-tel",
    agencyId: "bantay-mandaue",
    group: "city",
    name: "Bantay Mandaue – CDRRMO (Telephone)",
    typeLabel: "Telephone",
    number: "383-1658",
    status: "official",
    sourceId: "researcher_directory",
    checkedOn: "2026-11-25"
  },
  {
    id: "cdrrmo-globe",
    agencyId: "bantay-mandaue",
    group: "city",
    name: "Bantay Mandaue – CDRRMO (Globe)",
    typeLabel: "Globe",
    number: "09454330054",
    status: "official",
    sourceId: "researcher_directory",
    checkedOn: "2026-11-25"
  },
  {
    id: "cdrrmo-smart",
    agencyId: "bantay-mandaue",
    group: "city",
    name: "Bantay Mandaue – CDRRMO (Smart)",
    typeLabel: "Smart",
    number: "09384765461",
    status: "official",
    sourceId: "researcher_directory",
    checkedOn: "2026-11-25"
  },
  {
    id: "bfp-tel-1",
    agencyId: "bfp-mandaue",
    group: "city",
    name: "Bureau of Fire Protection (Mandaue City) – Telephone",
    typeLabel: "Telephone",
    number: "344-4747",
    status: "official",
    sourceId: "researcher_directory",
    checkedOn: "2026-11-25"
  },
  {
    id: "bfp-tel-2",
    agencyId: "bfp-mandaue",
    group: "city",
    name: "Bureau of Fire Protection (Mandaue City) – Telephone",
    typeLabel: "Telephone",
    number: "344-3364",
    status: "official",
    sourceId: "researcher_directory",
    checkedOn: "2026-11-25"
  },
  {
    id: "bfp-mobile",
    agencyId: "bfp-mandaue",
    group: "city",
    name: "Bureau of Fire Protection (Mandaue City) – Mobile",
    typeLabel: "Mobile",
    number: "09491622565",
    status: "official",
    sourceId: "researcher_directory",
    checkedOn: "2026-11-25"
  },
  {
    id: "mcpo-tel",
    agencyId: "mcpo",
    group: "city",
    name: "Mandaue City Police Office – Telephone",
    typeLabel: "Telephone",
    number: "340-3401",
    status: "official",
    sourceId: "researcher_directory",
    checkedOn: "2026-11-25"
  },
  {
    id: "mcpo-mobile-1",
    agencyId: "mcpo",
    group: "city",
    name: "Mandaue City Police Office – Mobile",
    typeLabel: "Mobile",
    number: "09985986300",
    status: "official",
    sourceId: "researcher_directory",
    checkedOn: "2026-11-25"
  },
  {
    id: "mcpo-mobile-2",
    agencyId: "mcpo",
    group: "city",
    name: "Mandaue City Police Office – Mobile",
    typeLabel: "Mobile",
    number: "09985986302",
    status: "official",
    sourceId: "researcher_directory",
    checkedOn: "2026-11-25"
  },
  {
    id: "mcpo-mobile-3",
    agencyId: "mcpo",
    group: "city",
    name: "Mandaue City Police Office – Mobile",
    typeLabel: "Mobile",
    number: "09175909366",
    status: "official",
    sourceId: "researcher_directory",
    checkedOn: "2026-11-25"
  },
  {
    id: "mcpo-station3",
    agencyId: "mcpo",
    group: "city",
    name: "Mandaue City Police Office – Station 3",
    typeLabel: "Station 3",
    number: "09985986305",
    status: "official",
    sourceId: "researcher_directory",
    checkedOn: "2026-11-25"
  },
  {
    id: "pdrrmo-tel",
    agencyId: "cebu-pdrrmo",
    group: "city",
    name: "Cebu Provincial DRRMO – Telephone",
    typeLabel: "Telephone",
    number: "255-0046",
    status: "official",
    sourceId: "researcher_directory",
    checkedOn: "2026-11-25"
  },
  {
    id: "prc-mobile",
    agencyId: "redcross-cebu",
    group: "city",
    name: "Philippine Red Cross (Cebu City) – Mobile",
    typeLabel: "Mobile",
    number: "09155839829",
    status: "official",
    sourceId: "researcher_directory",
    checkedOn: "2026-11-25"
  },
  {
    id: "eruf-tel-1",
    agencyId: "eruf",
    group: "city",
    name: "ERUF – Telephone",
    typeLabel: "Telephone",
    number: "233-9300",
    status: "official",
    sourceId: "researcher_directory",
    checkedOn: "2026-11-25"
  },
  {
    id: "eruf-tel-2",
    agencyId: "eruf",
    group: "city",
    name: "ERUF – Telephone",
    typeLabel: "Telephone",
    number: "255-7287",
    status: "official",
    sourceId: "researcher_directory",
    checkedOn: "2026-11-25"
  },
  {
    id: "eruf-mobile-1",
    agencyId: "eruf",
    group: "city",
    name: "ERUF – Mobile",
    typeLabel: "Mobile",
    number: "09189210000",
    status: "official",
    sourceId: "researcher_directory",
    checkedOn: "2026-11-25"
  },
  {
    id: "eruf-mobile-2",
    agencyId: "eruf",
    group: "city",
    name: "ERUF – Mobile",
    typeLabel: "Mobile",
    number: "09985458526",
    status: "official",
    sourceId: "researcher_directory",
    checkedOn: "2026-11-25"
  }
];

export const FACILITIES: Facility[] = [
  {
    id: "fac-labogon-hall",
    name: "Barangay Labogon Hall",
    type: "office",
    scope: "labogon",
    address: null,
    lat: null, lng: null,
    contactIds: ["labogon-ert-globe-1", "labogon-ert-globe-2", "labogon-ert-suntnt-1", "labogon-ert-suntnt-2"],
    sourceId: "barangaydirectory",
    note: "The Barangay Directory says the exact street address is still being verified."
  },
  {
    id: "fac-labogon-health",
    name: "Labogon Health Center",
    type: "health",
    scope: "labogon",
    address: null,
    lat: null, lng: null,
    contactIds: [],
    sourceId: "student",
    note: "Address not found in public sources."
  },
  {
    id: "fac-labogon-gym",
    name: "Barangay Labogon Gymnasium (evacuation center)",
    type: "evacuation",
    scope: "labogon",
    address: "Barangay Labogon, Mandaue City",
    lat: null, lng: null,
    contactIds: ["labogon-ert-globe-1", "labogon-ert-suntnt-1"],
    sourceId: "dromic_gym",
    note: "DSWD reported 55 families sheltered here after the June 2025 fire. Ask the barangay which centers are open in each emergency."
  },
  {
    id: "fac-fire",
    name: "Mandaue City Fire Station (BFP)",
    type: "fire",
    scope: "city",
    address: "Barangay Centro (Reclamation Area), Mandaue City",
    lat: null, lng: null,
    contactIds: ["bfp-tel-1", "bfp-tel-2", "bfp-mobile"],
    sourceId: "sunstar_fire_centro",
    note: "Main fire station is reported to be in Barangay Centro."
  },
  {
    id: "fac-police",
    name: "Mandaue City Police Office",
    type: "police",
    scope: "city",
    address: null,
    lat: null, lng: null,
    contactIds: ["mcpo-tel", "mcpo-mobile-1", "mcpo-mobile-2", "mcpo-mobile-3", "mcpo-station3"],
    sourceId: "student",
    note: "Mandaue has several police stations. Station addresses were not found in public sources."
  },
  {
    id: "fac-mch",
    name: "Mandaue City Hospital",
    type: "hospital",
    scope: "city",
    address: null,
    lat: null, lng: null,
    contactIds: [],
    sourceId: "student",
    note: "Address not found in the sources checked."
  },
  {
    id: "fac-chonghua",
    name: "Chong Hua Hospital Mandaue",
    type: "hospital",
    scope: "city",
    address: "Mantawi Int'l Drive, City South Economic Administrative Zone, Mandaue City 6014",
    lat: null, lng: null,
    contactIds: [],
    sourceId: "chonghua",
    note: "Address from the hospital's official website."
  },
  {
    id: "fac-command",
    name: "Bantay Mandaue Command Center",
    type: "office",
    scope: "city",
    address: "Beside Mandaue City Hall (per a 2013 report – re-confirm)",
    lat: null, lng: null,
    contactIds: ["cdrrmo-tel", "cdrrmo-globe", "cdrrmo-smart"],
    sourceId: "philstar_command",
    note: "Operates the city emergency hotline system."
  },
  {
    id: "fac-eruf",
    name: "Emergency Rescue Unit Foundation (ERUF)",
    type: "rescue",
    scope: "city",
    address: null,
    lat: null, lng: null,
    contactIds: ["eruf-tel-1", "eruf-tel-2", "eruf-mobile-1", "eruf-mobile-2"],
    sourceId: "student",
    note: "Base address not confirmed."
  },
  {
    id: "fac-redcross",
    name: "Philippine Red Cross (Cebu City)",
    type: "rescue",
    scope: "city",
    address: null,
    lat: null, lng: null,
    contactIds: ["prc-mobile"],
    sourceId: "researcher_directory",
    note: "Confirm office location before visiting."
  }
];
