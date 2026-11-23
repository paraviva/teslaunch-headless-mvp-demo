import { ProductCategory, VehicleModel } from '../types/shopify';

export interface MegaModelCategoryGroup {
  title: string;
  mappedCategory: ProductCategory;
  thumbnailKind:
    | 'mats'
    | 'ppf'
    | 'wheel'
    | 'screen'
    | 'spoiler'
    | 'light'
    | 'charger'
    | 'camping'
    | 'starlink';
  links: {
    label: string;
    productHandle?: string;
    mappedCategory?: ProductCategory;
  }[];
}

export interface MegaModelTab {
  id: string;
  label: string;
  years: string;
  filterModel: VehicleModel;
  featuredHandle: string;
  categories: MegaModelCategoryGroup[];
}

export interface MegaCollectionCard {
  title: string;
  mappedCategory: ProductCategory;
  productHandle?: string;
  localThumb?: string;
  badgeCode: string;
}

export interface MegaCollectionTab {
  id: string;
  label: string;
  mappedCategory: ProductCategory;
  cards: MegaCollectionCard[];
}

export interface MegaSupportColumn {
  title: string;
  links: {
    label: string;
    anchor?: string;
    productHandle?: string;
    action?: 'track' | 'architecture' | 'catalog';
  }[];
}

export interface BlogNavLink {
  label: string;
  mappedCategory: ProductCategory;
  productHandle?: string;
}

const STANDARD_VEHICLE_CATEGORIES: MegaModelCategoryGroup[] = [
  {
    title: 'New Owner Essentials',
    mappedCategory: 'Interior Trim',
    thumbnailKind: 'mats',
    links: [
      { label: 'Floor Mats', productHandle: 'all-weather-3d-tpe-floor-liner-system', mappedCategory: 'Interior Trim' },
      { label: 'Paint Protect Films', productHandle: 'matte-tpu-full-car-ppf-model-y-juniper', mappedCategory: 'Exterior Aero' },
      { label: 'Organizers', mappedCategory: 'Interior Trim' },
      { label: 'Phone Holders', mappedCategory: 'Cockpit Tech' },
      { label: 'Sunshades', mappedCategory: 'Interior Trim' },
      { label: 'Wheel Covers', productHandle: 'turbine-19-aero-wheel-covers-set', mappedCategory: 'Wheel & Chassis' },
      { label: 'Rim Protectors', mappedCategory: 'Wheel & Chassis' },
    ],
  },
  {
    title: 'Interior Accessories',
    mappedCategory: 'Interior Trim',
    thumbnailKind: 'light',
    links: [
      { label: 'Center Console Accessories', mappedCategory: 'Interior Trim' },
      { label: 'Dashboard Accessories', productHandle: 'dynamic-oem-dash-ambient-light-kit', mappedCategory: 'Interior Trim' },
      { label: 'Floor Mats', productHandle: 'all-weather-3d-tpe-floor-liner-system', mappedCategory: 'Interior Trim' },
      { label: 'Interior Door Accessories', mappedCategory: 'Interior Trim' },
      { label: 'Screen Accessories', productHandle: 'oem-rear-86-climate-entertainment-screen', mappedCategory: 'Cockpit Tech' },
      { label: 'Seat Accessories', mappedCategory: 'Interior Trim' },
      { label: 'Steering Wheel Covers', mappedCategory: 'Cockpit Tech' },
      { label: 'Steering Wheel', productHandle: 'forged-carbon-alcantara-sport-wheel', mappedCategory: 'Cockpit Tech' },
    ],
  },
  {
    title: 'Exterior Accessories',
    mappedCategory: 'Exterior Aero',
    thumbnailKind: 'spoiler',
    links: [
      { label: 'Door Handle Trims', mappedCategory: 'Exterior Aero' },
      { label: 'Exterior Camera Trims', mappedCategory: 'Exterior Aero' },
      { label: 'Fog Light Trims', mappedCategory: 'Exterior Aero' },
      { label: 'Front License Plates', mappedCategory: 'Exterior Aero' },
      { label: 'Mesh Grill Panels', mappedCategory: 'Exterior Aero' },
      { label: 'Mud Flaps', mappedCategory: 'Exterior Aero' },
      { label: 'Paint Protect Films', productHandle: 'matte-tpu-full-car-ppf-model-y-juniper', mappedCategory: 'Exterior Aero' },
      { label: 'Side Mirror Covers', mappedCategory: 'Exterior Aero' },
      { label: 'Spoilers', productHandle: '3k-dry-carbon-aero-rear-spoiler', mappedCategory: 'Exterior Aero' },
      { label: 'Chrome Delete', mappedCategory: 'Exterior Aero' },
    ],
  },
  {
    title: 'Storage & Organization',
    mappedCategory: 'Interior Trim',
    thumbnailKind: 'mats',
    links: [
      { label: 'Organizers', mappedCategory: 'Interior Trim' },
      { label: 'Console Safes', mappedCategory: 'Interior Trim' },
      { label: 'Cup Holders', mappedCategory: 'Interior Trim' },
      { label: 'Sunglass Holder', mappedCategory: 'Interior Trim' },
      { label: 'Trash Cans', mappedCategory: 'Interior Trim' },
      { label: 'Phone Holders', mappedCategory: 'Cockpit Tech' },
      { label: 'Tablet Holders', mappedCategory: 'Cockpit Tech' },
    ],
  },
  {
    title: 'Comfort & Convenience',
    mappedCategory: 'Interior Trim',
    thumbnailKind: 'light',
    links: [
      { label: 'Noise Reduction Kits', mappedCategory: 'Interior Trim' },
      { label: 'Sunshades', mappedCategory: 'Interior Trim' },
      { label: 'Air Freshener', mappedCategory: 'Interior Trim' },
      { label: 'Neck Pillows', mappedCategory: 'Interior Trim' },
      { label: 'Armrest Covers', mappedCategory: 'Interior Trim' },
      { label: 'Seat Covers', mappedCategory: 'Interior Trim' },
      { label: 'Seat Cushions', mappedCategory: 'Interior Trim' },
    ],
  },
  {
    title: 'Frunk & Trunk',
    mappedCategory: 'Interior Trim',
    thumbnailKind: 'mats',
    links: [
      { label: 'Frunk Trunk Mats', productHandle: 'all-weather-3d-tpe-floor-liner-system', mappedCategory: 'Interior Trim' },
      { label: 'Frunk Trunk Organizers', mappedCategory: 'Interior Trim' },
      { label: 'Frunk Trunk Protectors', mappedCategory: 'Interior Trim' },
    ],
  },
  {
    title: 'Wheels & Tires',
    mappedCategory: 'Wheel & Chassis',
    thumbnailKind: 'wheel',
    links: [
      { label: 'Wheel Covers', productHandle: 'turbine-19-aero-wheel-covers-set', mappedCategory: 'Wheel & Chassis' },
      { label: 'Caliper Covers', mappedCategory: 'Wheel & Chassis' },
      { label: 'Center Caps', mappedCategory: 'Wheel & Chassis' },
      { label: 'Wheel Touch Up Paint', mappedCategory: 'Wheel & Chassis' },
      { label: 'Rim Protectors', mappedCategory: 'Wheel & Chassis' },
    ],
  },
  {
    title: 'Tech & Electronics',
    mappedCategory: 'Cockpit Tech',
    thumbnailKind: 'screen',
    links: [
      { label: 'Game Controllers', mappedCategory: 'Cockpit Tech' },
      { label: 'Gear Shifts', mappedCategory: 'Cockpit Tech' },
      { label: 'Interior Lights', productHandle: 'dynamic-oem-dash-ambient-light-kit', mappedCategory: 'Interior Trim' },
      { label: 'Puddle Lights', mappedCategory: 'Interior Trim' },
      { label: 'USB Hubs', mappedCategory: 'Cockpit Tech' },
      { label: 'Head Up Display', productHandle: 'ultrawide-9-hud-instrument-cluster', mappedCategory: 'Cockpit Tech' },
      { label: 'Rear Screen', productHandle: 'oem-rear-86-climate-entertainment-screen', mappedCategory: 'Cockpit Tech' },
      { label: 'Smart Buttons', mappedCategory: 'Cockpit Tech' },
      { label: 'Ambient Lights', productHandle: 'dynamic-oem-dash-ambient-light-kit', mappedCategory: 'Interior Trim' },
    ],
  },
  {
    title: 'Charging & Power',
    mappedCategory: 'Cockpit Tech',
    thumbnailKind: 'charger',
    links: [
      { label: 'Charger Box & Organizers', mappedCategory: 'Exterior Aero' },
      { label: 'Charging Adapters', mappedCategory: 'Cockpit Tech' },
      { label: 'EV Chargers', mappedCategory: 'Cockpit Tech' },
      { label: 'V2L Adapter', mappedCategory: 'Cockpit Tech' },
    ],
  },
  {
    title: 'Care & Maintenance',
    mappedCategory: 'Exterior Aero',
    thumbnailKind: 'ppf',
    links: [
      { label: 'Interior Cleaner', mappedCategory: 'Interior Trim' },
      { label: 'Air Filters', mappedCategory: 'Interior Trim' },
      { label: 'Touch Up Paint', mappedCategory: 'Exterior Aero' },
      { label: 'Wiper Blades', mappedCategory: 'Exterior Aero' },
      { label: 'Car Covers', mappedCategory: 'Exterior Aero' },
    ],
  },
  {
    title: 'Road Trip & Camping',
    mappedCategory: 'Interior Trim',
    thumbnailKind: 'camping',
    links: [
      { label: 'Mattresses', mappedCategory: 'Interior Trim' },
      { label: 'Tents', mappedCategory: 'Exterior Aero' },
      { label: 'Roof Racks', mappedCategory: 'Exterior Aero' },
      { label: 'Refrigerator', mappedCategory: 'Cockpit Tech' },
    ],
  },
  {
    title: 'Styles & Finishes',
    mappedCategory: 'Exterior Aero',
    thumbnailKind: 'spoiler',
    links: [
      { label: 'Alcantara', productHandle: 'forged-carbon-alcantara-sport-wheel', mappedCategory: 'Cockpit Tech' },
      { label: 'Real Carbon Fiber', productHandle: '3k-dry-carbon-aero-rear-spoiler', mappedCategory: 'Exterior Aero' },
      { label: 'Carbon Fiber Style', mappedCategory: 'Exterior Aero' },
      { label: 'White Interior', mappedCategory: 'Interior Trim' },
    ],
  },
  {
    title: 'Others',
    mappedCategory: 'Interior Trim',
    thumbnailKind: 'mats',
    links: [
      { label: 'Scale Diecast Models', mappedCategory: 'Interior Trim' },
      { label: 'Key Fob Cases', mappedCategory: 'Interior Trim' },
      { label: 'Pet Accessories', mappedCategory: 'Interior Trim' },
    ],
  },
];

const STARLINK_CATEGORIES: MegaModelCategoryGroup[] = [
  'Starlink Mini',
  'Starlink V5',
  'Starlink Standard 4/4X',
  'Starlink Gen 2',
  'Starlink Performance',
].map((tier) => ({
  title: tier,
  mappedCategory: 'Exterior Aero',
  thumbnailKind: 'starlink',
  links: [
    { label: 'Roof & Suction Mounts', mappedCategory: 'Exterior Aero' },
    { label: '12V/DC Power Cables', mappedCategory: 'Cockpit Tech' },
    { label: 'Carrying Cases', mappedCategory: 'Interior Trim' },
    { label: 'Protective Bumpers', mappedCategory: 'Exterior Aero' },
    { label: 'Mobile Power Solutions', mappedCategory: 'Cockpit Tech' },
    { label: 'Complete Setup Kits', mappedCategory: 'Exterior Aero' },
  ],
}));

export const MEGA_MENU_MODELS: MegaModelTab[] = [
  {
    id: 'tl-mdl-panel-1',
    label: '2025+ Model Y Juniper',
    years: '2025–2026 Refresh',
    filterModel: 'Model Y',
    featuredHandle: 'matte-tpu-full-car-ppf-model-y-juniper',
    categories: STANDARD_VEHICLE_CATEGORIES,
  },
  {
    id: 'tl-mdl-panel-2',
    label: '2020–2024 Model Y',
    years: '2020–2024 Chassis',
    filterModel: 'Model Y',
    featuredHandle: 'oem-rear-86-climate-entertainment-screen',
    categories: STANDARD_VEHICLE_CATEGORIES,
  },
  {
    id: 'tl-mdl-panel-3',
    label: '2024+ Model 3 Highland',
    years: '2024–2026 Refresh',
    filterModel: 'Model 3 Highland',
    featuredHandle: 'forged-carbon-alcantara-sport-wheel',
    categories: STANDARD_VEHICLE_CATEGORIES,
  },
  {
    id: 'tl-mdl-panel-4',
    label: '2017–2023 Model 3',
    years: '2017–2023 Legacy',
    filterModel: 'Model 3 Highland',
    featuredHandle: 'ultrawide-9-hud-instrument-cluster',
    categories: STANDARD_VEHICLE_CATEGORIES,
  },
  {
    id: 'tl-mdl-panel-5',
    label: 'Cybertruck',
    years: '2024–2026 AWD & Beast',
    filterModel: 'Cybertruck',
    featuredHandle: 'all-weather-3d-tpe-floor-liner-system',
    categories: STANDARD_VEHICLE_CATEGORIES,
  },
  {
    id: 'tl-mdl-panel-6',
    label: 'Model S',
    years: '2021–2026 Palladium',
    filterModel: 'Model S / X',
    featuredHandle: 'forged-carbon-alcantara-sport-wheel',
    categories: STANDARD_VEHICLE_CATEGORIES,
  },
  {
    id: 'tl-mdl-panel-7',
    label: 'Model X',
    years: '2021–2026 Palladium',
    filterModel: 'Model S / X',
    featuredHandle: 'dynamic-oem-dash-ambient-light-kit',
    categories: STANDARD_VEHICLE_CATEGORIES,
  },
  {
    id: 'tl-mdl-panel-8',
    label: 'Starlink',
    years: 'In-Motion EV Kits',
    filterModel: 'Cybertruck',
    featuredHandle: 'turbine-19-aero-wheel-covers-set',
    categories: STARLINK_CATEGORIES,
  },
];

export const MEGA_MENU_COLLECTIONS: MegaCollectionTab[] = [
  {
    id: 'tl-col-1',
    label: 'New Owner Essentials',
    mappedCategory: 'Interior Trim',
    cards: [
      { title: 'Floor Mats', mappedCategory: 'Interior Trim', productHandle: 'all-weather-3d-tpe-floor-liner-system', localThumb: '/src/assets/images/prod_floor_mats_1795429465884.jpg', badgeCode: '3D-TPE' },
      { title: 'Mud Flaps', mappedCategory: 'Exterior Aero', badgeCode: 'EXT-MF' },
      { title: 'Paint Protect Films', mappedCategory: 'Exterior Aero', productHandle: 'matte-tpu-full-car-ppf-model-y-juniper', localThumb: '/src/assets/images/hero_tesla_aero_1795429466015.jpg', badgeCode: '8.5-MIL' },
      { title: 'Organizers', mappedCategory: 'Interior Trim', badgeCode: 'CAB-ORG' },
      { title: 'Phone Holders', mappedCategory: 'Cockpit Tech', badgeCode: 'MAG-MNT' },
      { title: 'Sunshades', mappedCategory: 'Interior Trim', badgeCode: 'UV-ROOF' },
      { title: 'Seat Covers', mappedCategory: 'Interior Trim', badgeCode: 'NAPA-ST' },
      { title: 'Wheel Covers', mappedCategory: 'Wheel & Chassis', productHandle: 'turbine-19-aero-wheel-covers-set', localThumb: '/src/assets/images/prod_wheel_covers_1795429466113.jpg', badgeCode: 'AERO-19' },
      { title: 'Rim Protectors', mappedCategory: 'Wheel & Chassis', badgeCode: 'CURB-GD' },
      { title: 'Charging Adapters', mappedCategory: 'Cockpit Tech', badgeCode: 'NACS-DC' },
    ],
  },
  {
    id: 'tl-col-2',
    label: 'Interior Accessories & Upgrades',
    mappedCategory: 'Interior Trim',
    cards: [
      { title: 'Center Console Accessories', mappedCategory: 'Interior Trim', badgeCode: 'CON-TRIM' },
      { title: 'Dashboard Accessories', mappedCategory: 'Interior Trim', productHandle: 'dynamic-oem-dash-ambient-light-kit', localThumb: '/src/assets/images/prod_ambient_lighting_1795429465437.jpg', badgeCode: 'DASH-LED' },
      { title: 'Floor Mats', mappedCategory: 'Interior Trim', productHandle: 'all-weather-3d-tpe-floor-liner-system', localThumb: '/src/assets/images/prod_floor_mats_1795429465884.jpg', badgeCode: 'TPE-MAT' },
      { title: 'Interior Door Accessories', mappedCategory: 'Interior Trim', badgeCode: 'DOOR-KICK' },
      { title: 'Screen Accessories', mappedCategory: 'Cockpit Tech', productHandle: 'oem-rear-86-climate-entertainment-screen', localThumb: '/src/assets/images/prod_rear_display_1795429466513.jpg', badgeCode: 'IPS-8.6' },
      { title: 'Seat Accessories', mappedCategory: 'Interior Trim', badgeCode: 'VENT-ST' },
      { title: 'Steering Wheel Covers', mappedCategory: 'Cockpit Tech', badgeCode: 'GRIP-CV' },
      { title: 'Steering Wheel', mappedCategory: 'Cockpit Tech', productHandle: 'forged-carbon-alcantara-sport-wheel', localThumb: '/src/assets/images/prod_yoke_wheel_1795429465969.jpg', badgeCode: 'FORGED' },
    ],
  },
  {
    id: 'tl-col-3',
    label: 'Exterior Accessories & Upgrades',
    mappedCategory: 'Exterior Aero',
    cards: [
      { title: 'Door Handle Trims', mappedCategory: 'Exterior Aero', badgeCode: 'HDL-CF' },
      { title: 'Exterior Camera Trims', mappedCategory: 'Exterior Aero', badgeCode: 'HW4-CAM' },
      { title: 'Fog Light Trims', mappedCategory: 'Exterior Aero', badgeCode: 'FOG-AB' },
      { title: 'Front License Plate', mappedCategory: 'Exterior Aero', badgeCode: 'NO-DRILL' },
      { title: 'Mesh Grill Panels', mappedCategory: 'Exterior Aero', badgeCode: 'INTK-GR' },
      { title: 'Mud Flaps', mappedCategory: 'Exterior Aero', badgeCode: 'SPLASH' },
      { title: 'Paint Protect Films', mappedCategory: 'Exterior Aero', productHandle: 'matte-tpu-full-car-ppf-model-y-juniper', localThumb: '/src/assets/images/hero_tesla_aero_1795429466015.jpg', badgeCode: 'TPU-PPF' },
      { title: 'Side Mirror Covers', mappedCategory: 'Exterior Aero', badgeCode: 'MIR-3K' },
      { title: 'Spoilers', mappedCategory: 'Exterior Aero', productHandle: '3k-dry-carbon-aero-rear-spoiler', localThumb: '/src/assets/images/prod_carbon_spoiler_1795429466247.jpg', badgeCode: 'WING-3K' },
      { title: 'Chrome Delete', mappedCategory: 'Exterior Aero', badgeCode: 'SATIN-BK' },
    ],
  },
  {
    id: 'tl-col-4',
    label: 'Storage & Organization',
    mappedCategory: 'Interior Trim',
    cards: [
      { title: 'Organizers', mappedCategory: 'Interior Trim', badgeCode: 'TRAY-3D' },
      { title: 'Console Safes', mappedCategory: 'Interior Trim', badgeCode: 'VAULT-B' },
      { title: 'Cup Holders', mappedCategory: 'Interior Trim', badgeCode: 'TPE-CUP' },
      { title: 'Sunglass Holder', mappedCategory: 'Interior Trim', badgeCode: 'MAG-CLIP' },
      { title: 'Trash Cans', mappedCategory: 'Interior Trim', badgeCode: 'BIN-SLIM' },
      { title: 'Phone Holders', mappedCategory: 'Cockpit Tech', badgeCode: 'QI2-MAG' },
      { title: 'Tablet Holders', mappedCategory: 'Cockpit Tech', badgeCode: 'REAR-TAB' },
    ],
  },
  {
    id: 'tl-col-5',
    label: 'Comfort & Convenience',
    mappedCategory: 'Interior Trim',
    cards: [
      { title: 'Noise Reduction Kits', mappedCategory: 'Interior Trim', badgeCode: 'EPDM-NVH' },
      { title: 'Sunshades', mappedCategory: 'Interior Trim', badgeCode: 'ICE-ROOF' },
      { title: 'Air Freshener', mappedCategory: 'Interior Trim', badgeCode: 'VENT-AR' },
      { title: 'Pillows', mappedCategory: 'Interior Trim', badgeCode: 'MEM-FOAM' },
      { title: 'Armrest Covers', mappedCategory: 'Interior Trim', badgeCode: 'ALC-PAD' },
      { title: 'Seat Covers', mappedCategory: 'Interior Trim', badgeCode: 'PERF-PU' },
      { title: 'Seat Cushions', mappedCategory: 'Interior Trim', badgeCode: 'ERG-GAP' },
    ],
  },
  {
    id: 'tl-col-6',
    label: 'Frunk & Trunk',
    mappedCategory: 'Interior Trim',
    cards: [
      { title: 'Frunk Trunk Mats', mappedCategory: 'Interior Trim', productHandle: 'all-weather-3d-tpe-floor-liner-system', localThumb: '/src/assets/images/prod_floor_mats_1795429465884.jpg', badgeCode: 'CARGO-3D' },
      { title: 'Frunk Trunk Organizers', mappedCategory: 'Interior Trim', badgeCode: 'SUB-BIN' },
      { title: 'Frunk Trunk Protectors', mappedCategory: 'Interior Trim', badgeCode: 'SILL-ABS' },
    ],
  },
  {
    id: 'tl-col-7',
    label: 'Wheels & Tires',
    mappedCategory: 'Wheel & Chassis',
    cards: [
      { title: 'Wheel Covers', mappedCategory: 'Wheel & Chassis', productHandle: 'turbine-19-aero-wheel-covers-set', localThumb: '/src/assets/images/prod_wheel_covers_1795429466113.jpg', badgeCode: 'TURBINE' },
      { title: 'Caliper Covers', mappedCategory: 'Wheel & Chassis', badgeCode: 'AL-6061' },
      { title: 'Center Caps', mappedCategory: 'Wheel & Chassis', badgeCode: 'LUG-KIT' },
      { title: 'Wheel Touch Up Paint', mappedCategory: 'Wheel & Chassis', badgeCode: 'RIM-PEN' },
      { title: 'Rim Protectors', mappedCategory: 'Wheel & Chassis', badgeCode: 'ALL-RIM' },
    ],
  },
  {
    id: 'tl-col-8',
    label: 'Tech & Electronics',
    mappedCategory: 'Cockpit Tech',
    cards: [
      { title: 'Game Controllers', mappedCategory: 'Cockpit Tech', badgeCode: 'BT-2.4G' },
      { title: 'Gear Shifts', mappedCategory: 'Cockpit Tech', badgeCode: 'STALK-PRO' },
      { title: 'Interior Lights', mappedCategory: 'Interior Trim', productHandle: 'dynamic-oem-dash-ambient-light-kit', badgeCode: 'LED-OEM' },
      { title: 'Puddle Lights', mappedCategory: 'Interior Trim', badgeCode: 'PROJ-HD' },
      { title: 'USB Hubs', mappedCategory: 'Cockpit Tech', badgeCode: 'PD-65W' },
      { title: 'Head Up Display', mappedCategory: 'Cockpit Tech', productHandle: 'ultrawide-9-hud-instrument-cluster', localThumb: '/src/assets/images/prod_hud_cluster_1795429466571.jpg', badgeCode: 'HUD-9.0' },
      { title: 'Rear Screen', mappedCategory: 'Cockpit Tech', productHandle: 'oem-rear-86-climate-entertainment-screen', localThumb: '/src/assets/images/prod_rear_display_1795429466513.jpg', badgeCode: 'REAR-8.6' },
      { title: 'Smart Buttons', mappedCategory: 'Cockpit Tech', badgeCode: 'CAN-CTRL' },
      { title: 'Ambient Lights', mappedCategory: 'Interior Trim', productHandle: 'dynamic-oem-dash-ambient-light-kit', localThumb: '/src/assets/images/prod_ambient_lighting_1795429465437.jpg', badgeCode: 'RGBIC' },
    ],
  },
  {
    id: 'tl-col-9',
    label: 'Charging & Power',
    mappedCategory: 'Cockpit Tech',
    cards: [
      { title: 'Charger Box & Organizers', mappedCategory: 'Exterior Aero', badgeCode: 'WALL-IP65' },
      { title: 'Charging Adapters', mappedCategory: 'Cockpit Tech', badgeCode: 'CCS1-DC' },
      { title: 'EV Chargers', mappedCategory: 'Cockpit Tech', badgeCode: '48A-L2' },
      { title: 'V2L Adapter', mappedCategory: 'Cockpit Tech', badgeCode: 'V2L-3.5K' },
    ],
  },
  {
    id: 'tl-col-10',
    label: 'Care & Maintenance',
    mappedCategory: 'Exterior Aero',
    cards: [
      { title: 'Interior Cleaner', mappedCategory: 'Interior Trim', badgeCode: 'PH-ZERO' },
      { title: 'Air Filters', mappedCategory: 'Interior Trim', badgeCode: 'HEPA-N95' },
      { title: 'Touch Up Paint', mappedCategory: 'Exterior Aero', badgeCode: 'OEM-CODE' },
      { title: 'Wiper Blades', mappedCategory: 'Exterior Aero', badgeCode: 'SIL-26' },
      { title: 'Car Covers', mappedCategory: 'Exterior Aero', badgeCode: 'OUTDOOR' },
    ],
  },
  {
    id: 'tl-col-11',
    label: 'Road Trip & Camping',
    mappedCategory: 'Interior Trim',
    cards: [
      { title: 'Mattresses', mappedCategory: 'Interior Trim', badgeCode: 'FOAM-4IN' },
      { title: 'Tents', mappedCategory: 'Exterior Aero', badgeCode: 'HATCH-UP' },
      { title: 'Roof Racks', mappedCategory: 'Exterior Aero', badgeCode: '75KG-AL' },
      { title: 'Refrigerator', mappedCategory: 'Cockpit Tech', badgeCode: 'SUB-15L' },
    ],
  },
  {
    id: 'tl-col-12',
    label: 'Styles & Finishes',
    mappedCategory: 'Exterior Aero',
    cards: [
      { title: 'Alcantara', mappedCategory: 'Cockpit Tech', productHandle: 'forged-carbon-alcantara-sport-wheel', localThumb: '/src/assets/images/prod_yoke_wheel_1795429465969.jpg', badgeCode: 'IT-ALC' },
      { title: 'Real Carbon Fiber', mappedCategory: 'Exterior Aero', productHandle: '3k-dry-carbon-aero-rear-spoiler', localThumb: '/src/assets/images/prod_carbon_spoiler_1795429466247.jpg', badgeCode: '3K-DRY' },
      { title: 'Carbon Fiber Style', mappedCategory: 'Exterior Aero', badgeCode: 'HYDRO-CF' },
      { title: 'White Interior', mappedCategory: 'Interior Trim', badgeCode: 'PURE-WHT' },
    ],
  },
  {
    id: 'tl-col-13',
    label: 'Others',
    mappedCategory: 'Interior Trim',
    cards: [
      { title: 'Toy Car', mappedCategory: 'Interior Trim', badgeCode: '1:24-DI' },
      { title: 'Key Fob', mappedCategory: 'Interior Trim', badgeCode: 'KEY-ZINC' },
      { title: 'Pet Accessories', mappedCategory: 'Interior Trim', badgeCode: 'PET-DECK' },
    ],
  },
];

export const MEGA_MENU_SUPPORTS: MegaSupportColumn[] = [
  {
    title: 'Customer Service',
    links: [
      { label: 'Product Installation Guide', productHandle: 'matte-tpu-full-car-ppf-model-y-juniper' },
      { label: 'Track Your Order', action: 'track' },
      { label: 'Contact Us', anchor: '#architecture' },
      { label: 'FAQs', anchor: '#architecture' },
    ],
  },
  {
    title: 'Policy',
    links: [
      { label: 'Shipping Policy', anchor: '#architecture' },
      { label: 'Refund Policy', anchor: '#architecture' },
      { label: 'Privacy Policy', anchor: '#architecture' },
      { label: 'Terms of Service', anchor: '#architecture' },
    ],
  },
  {
    title: 'About Us',
    links: [
      { label: 'Headless Shopify 落地路径 (Roadmap)', action: 'architecture' },
      { label: 'Customer Reviews', productHandle: 'forged-carbon-alcantara-sport-wheel' },
      { label: 'Creator Showcase', action: 'catalog' },
    ],
  },
  {
    title: 'Others',
    links: [
      { label: 'Partner Program', anchor: '#architecture' },
      { label: 'Community Build Gallery', action: 'catalog' },
      { label: 'Fleet & B2B Wholesale', anchor: '#architecture' },
    ],
  },
];

export const BLOG_SUBMENU_LINKS: BlogNavLink[] = [
  { label: 'EV Interior Accessories', mappedCategory: 'Interior Trim' },
  { label: 'Paint & Chassis Protection', mappedCategory: 'Exterior Aero', productHandle: 'matte-tpu-full-car-ppf-model-y-juniper' },
  { label: 'Owner Install Guides', mappedCategory: 'Cockpit Tech', productHandle: 'ultrawide-9-hud-instrument-cluster' },
];

export const TRENDING_SEARCH_TERMS = [
  '2025 Model Y Juniper',
  '2024 Model 3 Highland',
  'Cybertruck',
  'Rim Protector',
  'Touch Up Paint',
  'Seat Covers',
];
