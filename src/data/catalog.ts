import { ShopifyProduct, VehicleModel } from '../types/shopify';

export const HERO_MEDIA = {
  url: '/src/assets/images/hero_tesla_aero_1795429466015.jpg',
  alt: 'Pearl white performance EV fitted with forged dry carbon fiber splitter, side skirts, and satin black alloy wheels in a concrete studio',
};

export interface MegaMenuModelEntry {
  id: string;
  label: string;
  years: string;
  filterModel: VehicleModel;
  categories: {
    title: string;
    links: { label: string; category?: string; productHandle?: string }[];
  }[];
  featuredHandle: string;
}

export const MEGA_MENU_MODELS: MegaMenuModelEntry[] = [
  {
    id: 'model-y-juniper',
    label: '2025+ Model Y Juniper',
    years: '2025–2026 Refresh',
    filterModel: 'Model Y',
    featuredHandle: 'matte-tpu-full-car-ppf-model-y-juniper',
    categories: [
      {
        title: 'Exterior & Paint Protection',
        links: [
          {
            label: 'Matte TPU Full Car PPF Kit',
            productHandle: 'matte-tpu-full-car-ppf-model-y-juniper',
          },
          {
            label: '3K Dry Carbon Aero Spoiler',
            productHandle: '3k-dry-carbon-aero-rear-spoiler',
          },
          {
            label: '19" Turbine Aero Wheel Covers',
            productHandle: 'turbine-19-aero-wheel-covers-set',
          },
        ],
      },
      {
        title: 'Cabin & Cockpit Upgrades',
        links: [
          {
            label: '8.6" Rear Climate & Media Display',
            productHandle: 'oem-rear-86-climate-entertainment-screen',
          },
          {
            label: '3D All-Weather TPE Floor Liners',
            productHandle: 'all-weather-3d-tpe-floor-liner-system',
          },
          {
            label: 'Forged Carbon Sport Steering Wheel',
            productHandle: 'forged-carbon-alcantara-sport-wheel',
          },
        ],
      },
    ],
  },
  {
    id: 'model-y-legacy',
    label: 'Model Y (2020–2024)',
    years: '2020–2024 Chassis',
    filterModel: 'Model Y',
    featuredHandle: 'oem-rear-86-climate-entertainment-screen',
    categories: [
      {
        title: 'Cockpit & Displays',
        links: [
          {
            label: '8.6" Rear Climate & Media Display',
            productHandle: 'oem-rear-86-climate-entertainment-screen',
          },
          {
            label: '9.0" Wireless CarPlay HUD Cluster',
            productHandle: 'ultrawide-9-hud-instrument-cluster',
          },
          {
            label: 'Dynamic OEM Dash Ambient Light',
            productHandle: 'dynamic-oem-dash-ambient-light-kit',
          },
        ],
      },
      {
        title: 'Aero, Wheels & Protection',
        links: [
          {
            label: '19" Gemini Satin Wheel Covers',
            productHandle: 'turbine-19-aero-wheel-covers-set',
          },
          {
            label: '3K Dry Carbon Rear Spoiler',
            productHandle: '3k-dry-carbon-aero-rear-spoiler',
          },
          {
            label: '3D Laser-Measured TPE Floor Mats',
            productHandle: 'all-weather-3d-tpe-floor-liner-system',
          },
        ],
      },
    ],
  },
  {
    id: 'model-3-highland',
    label: '2024+ Model 3 Highland',
    years: '2024–2026 Refresh',
    filterModel: 'Model 3 Highland',
    featuredHandle: 'forged-carbon-alcantara-sport-wheel',
    categories: [
      {
        title: 'Driver Interface',
        links: [
          {
            label: 'Forged Carbon & Alcantara Wheel',
            productHandle: 'forged-carbon-alcantara-sport-wheel',
          },
          {
            label: '9.0" Highland HUD Instrument Screen',
            productHandle: 'ultrawide-9-hud-instrument-cluster',
          },
        ],
      },
      {
        title: 'Exterior & Cabin Fitment',
        links: [
          {
            label: '3K Dry Carbon Performance Wing',
            productHandle: '3k-dry-carbon-aero-rear-spoiler',
          },
          {
            label: '18" Photon Aero Wheel Covers',
            productHandle: 'turbine-19-aero-wheel-covers-set',
          },
          {
            label: 'Highland 3D TPE Floor Liners',
            productHandle: 'all-weather-3d-tpe-floor-liner-system',
          },
        ],
      },
    ],
  },
  {
    id: 'cybertruck',
    label: 'Cybertruck (2024+)',
    years: '2024–2026 Foundation & AWD',
    filterModel: 'Cybertruck',
    featuredHandle: 'all-weather-3d-tpe-floor-liner-system',
    categories: [
      {
        title: 'Utility & Chassis',
        links: [
          {
            label: 'Crew Cab 3D TPE Floor Armor',
            productHandle: 'all-weather-3d-tpe-floor-liner-system',
          },
          {
            label: '20" Core Gunmetal Aero Covers',
            productHandle: 'turbine-19-aero-wheel-covers-set',
          },
        ],
      },
    ],
  },
  {
    id: 'model-s-x',
    label: 'Model S / Model X',
    years: '2021–2026 Palladium',
    filterModel: 'Model S / X',
    featuredHandle: 'forged-carbon-alcantara-sport-wheel',
    categories: [
      {
        title: 'Performance Cockpit',
        links: [
          {
            label: 'Forged Carbon Heated Sport Wheel',
            productHandle: 'forged-carbon-alcantara-sport-wheel',
          },
          {
            label: 'Dynamic Cabin Ambient Lighting',
            productHandle: 'dynamic-oem-dash-ambient-light-kit',
          },
        ],
      },
    ],
  },
];

export const MEGA_MENU_COLLECTIONS = [
  {
    title: 'Cockpit Tech & Displays',
    category: 'Cockpit Tech' as const,
    summary: 'Linux RTOS driver clusters, rear climate screens, and heated steering cores.',
    items: [
      {
        label: '8.6" Rear Climate & Media Display',
        handle: 'oem-rear-86-climate-entertainment-screen',
      },
      {
        label: '9.0" Wireless CarPlay HUD Cluster',
        handle: 'ultrawide-9-hud-instrument-cluster',
      },
      {
        label: 'Forged Carbon & Alcantara Wheel',
        handle: 'forged-carbon-alcantara-sport-wheel',
      },
    ],
  },
  {
    title: 'Exterior Aero & PPF',
    category: 'Exterior Aero' as const,
    summary: 'Autoclave pre-preg dry carbon aero wings and pre-cut 8.5-mil TPU paint protection.',
    items: [
      {
        label: 'Matte TPU Full Car PPF (Model Y Juniper)',
        handle: 'matte-tpu-full-car-ppf-model-y-juniper',
      },
      {
        label: '3K Autoclave Dry Carbon Spoiler',
        handle: '3k-dry-carbon-aero-rear-spoiler',
      },
    ],
  },
  {
    title: 'Interior Trim & Protection',
    category: 'Interior Trim' as const,
    summary: 'Laser-scanned TPE cabin liners and flush RGBIC acrylic ambient light blades.',
    items: [
      {
        label: 'Laser-Measured 3D TPE Floor Liners',
        handle: 'all-weather-3d-tpe-floor-liner-system',
      },
      {
        label: 'OEM-Flush Dash Ambient Light Kit',
        handle: 'dynamic-oem-dash-ambient-light-kit',
      },
    ],
  },
  {
    title: 'Wheel & Chassis',
    category: 'Wheel & Chassis' as const,
    summary: 'Curb-guard aerodynamic wheel covers engineered for highway Wh/mi gains.',
    items: [
      {
        label: '19" Satin Turbine Aero Wheel Covers',
        handle: 'turbine-19-aero-wheel-covers-set',
      },
    ],
  },
];

export const MEGA_MENU_SUPPORT = [
  {
    title: 'Installation & Fitment',
    items: [
      {
        label: 'Model Y Juniper PPF Fitment Specs',
        handle: 'matte-tpu-full-car-ppf-model-y-juniper',
      },
      {
        label: 'CAN-Bus Plug & Play Harness Guide',
        handle: 'oem-rear-86-climate-entertainment-screen',
      },
      {
        label: 'Steering Wheel Torque & Safety Steps',
        handle: 'forged-carbon-alcantara-sport-wheel',
      },
    ],
  },
  {
    title: 'Fulfillment & Coverage',
    items: [
      {
        label: '24h CA & EU Dispatch Policy',
        anchor: '#architecture',
      },
      {
        label: '24-Month Hardware Warranty',
        anchor: '#architecture',
      },
      {
        label: 'Headless Storefront Benchmark',
        anchor: '#architecture',
      },
    ],
  },
];

export const STOREFRONT_PRODUCTS: ShopifyProduct[] = [
  {
    id: 'gid://shopify/Product/9171483295967',
    handle: 'matte-tpu-full-car-ppf-model-y-juniper',
    title: 'Matte TPU Full Car Paint Protection Film (PPF) — Model Y Juniper 2025+',
    subtitle: '8.5-Mil Self-Healing Aliphatic TPU · Pre-Cut Computer Pattern',
    category: 'Exterior Aero',
    tagline:
      'Satin stealth transformation with hydrophobic self-healing topcoat and pre-wrapped edges.',
    availabilityNote: 'In Stock',
    rating: 4.9,
    reviewCount: 78,
    images: [
      {
        url: '/src/assets/images/hero_tesla_aero_1795429466015.jpg',
        alt: '2025+ Model Y Juniper transformed with stealth matte TPU full-body paint protection film',
        caption: 'Full-Body Satin Stealth Matte Finish',
      },
      {
        url: '/src/assets/images/prod_carbon_spoiler_1795429466247.jpg',
        alt: 'Precision rear trunk panel protection paired with matte carbon aero spoiler',
        caption: 'Rear Decklid & Edge-Wrap Precision',
      },
    ],
    options: [
      {
        name: 'Option',
        values: ['Buy in set', 'Buy in separate'],
      },
      {
        name: 'Package',
        values: [
          'Set A – Front Bumper',
          'Set B – Four Doors & Pillars',
          'Set C – Hood & Front Fenders',
          'Set D – Trunk & Rear Bumper',
          'Set E – Full Body (A + B + C + D)',
        ],
      },
    ],
    variants: [
      {
        id: 'gid://shopify/ProductVariant/47510584623327',
        sku: 'ACC-EW-0296-0005-C1',
        title: 'Buy in set / Set A – Front Bumper',
        selectedOptions: {
          Option: 'Buy in set',
          Package: 'Set A – Front Bumper',
        },
        price: 139,
        compareAtPrice: 179,
        availableForSale: true,
        inventoryQuantity: 46,
        imageIndex: 0,
      },
      {
        id: 'gid://shopify/ProductVariant/47510584623328',
        sku: 'ACC-EW-0296-0006-C1',
        title: 'Buy in set / Set B – Four Doors & Pillars',
        selectedOptions: {
          Option: 'Buy in set',
          Package: 'Set B – Four Doors & Pillars',
        },
        price: 299,
        compareAtPrice: 369,
        availableForSale: true,
        inventoryQuantity: 31,
        imageIndex: 0,
      },
      {
        id: 'gid://shopify/ProductVariant/47510584623329',
        sku: 'ACC-EW-0296-0007-C1',
        title: 'Buy in set / Set C – Hood & Front Fenders',
        selectedOptions: {
          Option: 'Buy in set',
          Package: 'Set C – Hood & Front Fenders',
        },
        price: 229,
        compareAtPrice: 289,
        availableForSale: true,
        inventoryQuantity: 28,
        imageIndex: 0,
      },
      {
        id: 'gid://shopify/ProductVariant/47510584623330',
        sku: 'ACC-EW-0296-0008-C1',
        title: 'Buy in set / Set D – Trunk & Rear Bumper',
        selectedOptions: {
          Option: 'Buy in set',
          Package: 'Set D – Trunk & Rear Bumper',
        },
        price: 219,
        compareAtPrice: 279,
        availableForSale: true,
        inventoryQuantity: 22,
        imageIndex: 1,
      },
      {
        id: 'gid://shopify/ProductVariant/47510584623331',
        sku: 'ACC-EW-0296-0012-C1',
        title: 'Buy in set / Set E – Full Body (A + B + C + D)',
        selectedOptions: {
          Option: 'Buy in set',
          Package: 'Set E – Full Body (A + B + C + D)',
        },
        price: 799,
        compareAtPrice: 999,
        availableForSale: true,
        inventoryQuantity: 19,
        imageIndex: 0,
      },
      {
        id: 'gid://shopify/ProductVariant/47510584623332',
        sku: 'ACC-EW-0296-0013-C1',
        title: 'Buy in separate / Set A – Front Bumper',
        selectedOptions: {
          Option: 'Buy in separate',
          Package: 'Set A – Front Bumper',
        },
        price: 149,
        compareAtPrice: 189,
        availableForSale: true,
        inventoryQuantity: 50,
        imageIndex: 0,
      },
      {
        id: 'gid://shopify/ProductVariant/47510584623333',
        sku: 'ACC-EW-0296-0014-C1',
        title: 'Buy in separate / Set E – Full Body (A + B + C + D)',
        selectedOptions: {
          Option: 'Buy in separate',
          Package: 'Set E – Full Body (A + B + C + D)',
        },
        price: 829,
        compareAtPrice: 1029,
        availableForSale: true,
        inventoryQuantity: 14,
        imageIndex: 0,
      },
    ],
    metafields: {
      compatibleModels: ['Model Y'],
      fitmentYears: ['2025–2026 Model Y Juniper'],
      installTimeMinutes: 180,
      difficulty: 'Intermediate',
      material: '8.5-Mil Japanese Aliphatic TPU',
      harnessType: 'Pre-Cut CAD Pattern + Squeegee Kit Included',
      warrantyMonths: 60,
    },
    highlights: [
      'True 8.5-mil aliphatic TPU resists rock chips, road salt, and UV yellowing for 5+ years.',
      'Laser-digitized specifically for 2025+ Model Y Juniper front lightbar and rear diffuser.',
      'Heat-activated topcoat heals swirl marks and light abrasions under sunlight or warm water.',
    ],
    specs: [
      { label: 'Film Thickness', value: '8.5 Mil (215 µm) Multi-Layer TPU' },
      { label: 'Surface Finish', value: 'Non-Reflective Satin Stealth Matte' },
      { label: 'Elongation at Break', value: '> 380% Conformable Stretch' },
      { label: 'Adhesive System', value: 'Ashland Repositionable Low-Tack' },
      { label: 'Included Tools', value: 'Felt Squeegees, Slip Concentrate, Spray Bottle' },
    ],
    installationSteps: [
      {
        step: 1,
        title: 'Decontaminate & Clay-Bar Clearcoat',
        detail: 'Wash panel thoroughly and wipe edges with isopropyl prep solution inside a dust-free garage.',
      },
      {
        step: 2,
        title: 'Mist Slip Solution & Float Panel',
        detail: 'Saturate adhesive side and body panel, align headlight/sensor cutouts, and tack anchor points.',
      },
      {
        step: 3,
        title: 'Squeegee Outward & Wrap Edges',
        detail: 'Work from center outward in overlapping strokes, then heat-set tucked panel edges.',
      },
    ],
    reviews: [
      {
        id: 'rev-ppf-1',
        author: 'Kenji Takahashi',
        vehicle: '2025 Model Y Juniper Dual Motor',
        date: 'Nov 2026',
        rating: 5,
        title: 'Cutouts around the Juniper lightbar aligned dead-on',
        body: 'Ordered Set E with my brother over a weekend. Having pre-cut panels with extra wrap margin saved us over $3,500 vs shop quotes.',
        verifiedOwner: true,
      },
    ],
  },
  {
    id: 'gid://shopify/Product/8901421001',
    handle: 'forged-carbon-alcantara-sport-wheel',
    title: 'Forged Carbon & Alcantara Sport Steering Wheel',
    subtitle: 'OEM Heated Core · Non-Destructive Plug & Play',
    category: 'Cockpit Tech',
    tagline: 'Hand-laid forged carbon weave paired with perforated Italian Alcantara.',
    availabilityNote: 'In Stock',
    rating: 4.9,
    reviewCount: 184,
    images: [
      {
        url: '/src/assets/images/prod_yoke_wheel_1795429465969.jpg',
        alt: 'Forged carbon fiber and perforated black Alcantara flat-bottom steering wheel with crimson center stripe',
        caption: 'Forged Carbon / Crimson 12-O-Clock Marker',
      },
      {
        url: '/src/assets/images/prod_hud_cluster_1795429466571.jpg',
        alt: 'Sport steering wheel mounted in EV cabin paired with digital instrument cluster',
        caption: 'Installed Cabin Perspective',
      },
      {
        url: '/src/assets/images/prod_ambient_lighting_1795429465437.jpg',
        alt: 'Nighttime interior cockpit lighting paired with ergonomic steering geometry',
        caption: 'Low-Light Cabin Integration',
      },
    ],
    options: [
      {
        name: 'Carbon Finish',
        values: ['Forged Matte Carbon', '3K Gloss Twill Carbon'],
      },
      {
        name: 'Core Heating',
        values: ['Heated OEM Core', 'Standard OEM Core'],
      },
    ],
    variants: [
      {
        id: 'gid://shopify/ProductVariant/44101',
        sku: 'TL-SW-H3-FC-HT',
        title: 'Forged Matte Carbon / Heated OEM Core',
        selectedOptions: {
          'Carbon Finish': 'Forged Matte Carbon',
          'Core Heating': 'Heated OEM Core',
        },
        price: 589,
        compareAtPrice: 699,
        availableForSale: true,
        inventoryQuantity: 18,
        imageIndex: 0,
      },
      {
        id: 'gid://shopify/ProductVariant/44102',
        sku: 'TL-SW-H3-FC-ST',
        title: 'Forged Matte Carbon / Standard OEM Core',
        selectedOptions: {
          'Carbon Finish': 'Forged Matte Carbon',
          'Core Heating': 'Standard OEM Core',
        },
        price: 519,
        compareAtPrice: 619,
        availableForSale: true,
        inventoryQuantity: 24,
        imageIndex: 0,
      },
      {
        id: 'gid://shopify/ProductVariant/44103',
        sku: 'TL-SW-H3-TW-HT',
        title: '3K Gloss Twill Carbon / Heated OEM Core',
        selectedOptions: {
          'Carbon Finish': '3K Gloss Twill Carbon',
          'Core Heating': 'Heated OEM Core',
        },
        price: 569,
        compareAtPrice: 679,
        availableForSale: true,
        inventoryQuantity: 11,
        imageIndex: 1,
      },
      {
        id: 'gid://shopify/ProductVariant/44104',
        sku: 'TL-SW-H3-TW-ST',
        title: '3K Gloss Twill Carbon / Standard OEM Core',
        selectedOptions: {
          'Carbon Finish': '3K Gloss Twill Carbon',
          'Core Heating': 'Standard OEM Core',
        },
        price: 499,
        compareAtPrice: 599,
        availableForSale: true,
        inventoryQuantity: 15,
        imageIndex: 1,
      },
    ],
    metafields: {
      compatibleModels: ['Model 3 Highland', 'Model Y', 'Model S / X'],
      fitmentYears: ['2024–2026 Model 3 Highland', '2021–2026 Model Y', '2021–2026 Model S / X'],
      installTimeMinutes: 30,
      difficulty: 'Intermediate',
      material: 'Toray 3K Carbon + Alcantara',
      harnessType: 'Transfers Original OEM Airbag & Clockspring',
      warrantyMonths: 24,
    },
    highlights: [
      'Built directly on a genuine OEM magnesium-alloy steering core for factory airbag tolerances.',
      'Retains 100% of factory scroll wheels, haptic buttons, and heated rim elements.',
      'Ergonomic flat-bottom contour increases knee clearance without obstructing cabin displays.',
    ],
    specs: [
      { label: 'Core Architecture', value: 'Genuine OEM Magnesium Alloy Frame' },
      { label: 'Grip Material', value: 'Perforated Anthracite Alcantara' },
      { label: 'Top Marker', value: '6mm Recessed Crimson Leather Band' },
      { label: 'Airbag Compatibility', value: 'Direct Transfer (Factory Module)' },
      { label: 'Weight', value: '2.15 kg (Complete Assembly)' },
    ],
    installationSteps: [
      {
        step: 1,
        title: 'Power Down Low-Voltage System',
        detail: 'Access Service > Safety > Power Off from the main touchscreen and wait 3 minutes before touching column connectors.',
      },
      {
        step: 2,
        title: 'Release Dual Airbag Retaining Springs',
        detail: 'Insert a 4mm hex key into the left and right rear access slots to unclip the OEM airbag module.',
      },
      {
        step: 3,
        title: 'Swap Hub Nut & Transfer Controls',
        detail: 'Remove the 10mm hex center bolt, transfer the switch bezel and harness onto the Teslaunch forged core, and torque to 80 Nm.',
      },
    ],
    reviews: [
      {
        id: 'rev-1',
        author: 'Marcus Vance',
        vehicle: '2024 Model 3 Highland Performance',
        date: 'Oct 2026',
        rating: 5,
        title: 'Factory heating works instantaneously, zero rattles',
        body: 'Swapped it in 28 minutes in my driveway. The Alcantara stitching aligns seamlessly with the Highland door cards and the OEM heating element hits temp just as fast as stock.',
        verifiedOwner: true,
      },
      {
        id: 'rev-2',
        author: 'Elena Rostova',
        vehicle: '2025 Model Y Long Range',
        date: 'Sep 2026',
        rating: 5,
        title: 'Night-and-day steering feel on canyon drives',
        body: 'Thumb bolsters lock your hands at 9-and-3 without feeling bulky. Zero error codes on boot and the forged matte finish avoids windshield glare.',
        verifiedOwner: true,
      },
    ],
  },
  {
    id: 'gid://shopify/Product/8901421002',
    handle: 'oem-rear-86-climate-entertainment-screen',
    title: '8.6-Inch Rear Climate & Media Display',
    subtitle: 'Android 13 OTA · Dual-Zone Seat & AC Control',
    category: 'Cockpit Tech',
    tagline: 'Brings Model 3 Highland rear console functionality to Model Y & earlier Model 3.',
    availabilityNote: 'In Stock',
    rating: 4.8,
    reviewCount: 249,
    images: [
      {
        url: '/src/assets/images/prod_rear_display_1795429466513.jpg',
        alt: '8.6-inch rear seat climate and entertainment touchscreen module in matte charcoal ABS bezel',
        caption: 'OEM-Flush Rear Console Module',
      },
      {
        url: '/src/assets/images/prod_hud_cluster_1795429466571.jpg',
        alt: 'Synchronized interior infotainment display ecosystem',
        caption: 'Synced Cabin Telemetry UI',
      },
    ],
    options: [
      {
        name: 'Processor Platform',
        values: ['AMD Ryzen (2022–2026)', 'Intel Atom (2019–2021)'],
      },
      {
        name: 'Connectivity',
        values: ['4GB RAM / 64GB Storage', '8GB RAM / 128GB Storage'],
      },
    ],
    variants: [
      {
        id: 'gid://shopify/ProductVariant/44201',
        sku: 'TL-RD-86-AMD-64',
        title: 'AMD Ryzen (2022–2026) / 4GB RAM / 64GB Storage',
        selectedOptions: {
          'Processor Platform': 'AMD Ryzen (2022–2026)',
          Connectivity: '4GB RAM / 64GB Storage',
        },
        price: 349,
        compareAtPrice: 429,
        availableForSale: true,
        inventoryQuantity: 32,
        imageIndex: 0,
      },
      {
        id: 'gid://shopify/ProductVariant/44202',
        sku: 'TL-RD-86-AMD-128',
        title: 'AMD Ryzen (2022–2026) / 8GB RAM / 128GB Storage',
        selectedOptions: {
          'Processor Platform': 'AMD Ryzen (2022–2026)',
          Connectivity: '8GB RAM / 128GB Storage',
        },
        price: 399,
        compareAtPrice: 479,
        availableForSale: true,
        inventoryQuantity: 14,
        imageIndex: 0,
      },
      {
        id: 'gid://shopify/ProductVariant/44203',
        sku: 'TL-RD-86-INT-64',
        title: 'Intel Atom (2019–2021) / 4GB RAM / 64GB Storage',
        selectedOptions: {
          'Processor Platform': 'Intel Atom (2019–2021)',
          Connectivity: '4GB RAM / 64GB Storage',
        },
        price: 349,
        compareAtPrice: 429,
        availableForSale: true,
        inventoryQuantity: 9,
        imageIndex: 0,
      },
      {
        id: 'gid://shopify/ProductVariant/44204',
        sku: 'TL-RD-86-INT-128',
        title: 'Intel Atom (2019–2021) / 8GB RAM / 128GB Storage',
        selectedOptions: {
          'Processor Platform': 'Intel Atom (2019–2021)',
          Connectivity: '8GB RAM / 128GB Storage',
        },
        price: 399,
        compareAtPrice: 479,
        availableForSale: true,
        inventoryQuantity: 6,
        imageIndex: 0,
      },
    ],
    metafields: {
      compatibleModels: ['Model Y', 'Model 3 Highland'],
      fitmentYears: ['2021–2026 Model Y', '2019–2023 Model 3'],
      installTimeMinutes: 20,
      difficulty: 'DIY Easy',
      material: 'Anti-Glare Tempered Glass + OEM ABS',
      harnessType: 'Single CAN-Bus Y-Harness (No Wire Cutting)',
      warrantyMonths: 24,
    },
    highlights: [
      'Direct rear climate temperature, fan speed, and heated seat controls via native CAN-bus sync.',
      'Replaces the factory blank rear vent panel in 20 minutes without splicing any factory wiring.',
      'Dual-channel Bluetooth audio routing lets rear passengers pair wireless headphones independently.',
    ],
    specs: [
      { label: 'Panel Resolution', value: '1920 × 1080 IPS Anti-Fingerprint' },
      { label: 'Operating System', value: 'Android 13 with OTA Firmware' },
      { label: 'USB-C Output', value: 'Dual 25W PD Fast-Charge Ports' },
      { label: 'Seat Control', value: 'Passenger Co-Pilot & Rear 3-Stage Heat' },
      { label: 'Airflow Design', value: 'Redirected OEM Rear Vent Ducts' },
    ],
    installationSteps: [
      {
        step: 1,
        title: 'Unclip Factory Rear Vent Trim',
        detail: 'Use the included nylon pry tool to pop the lower center console rear trim plate.',
      },
      {
        step: 2,
        title: 'Bridge the CAN-Bus Harness',
        detail: 'Connect the supplied Y-splitter inline with the rear console OBD/CAN connector—zero wire stripping.',
      },
      {
        step: 3,
        title: 'Snap Module Flush into Console',
        detail: 'Route excess harness cleanly inside the lower cavity and press the 8.6-inch unit until all 4 OEM clips seat.',
      },
    ],
    reviews: [
      {
        id: 'rev-3',
        author: 'Devon Park',
        vehicle: '2024 Model Y Long Range',
        date: 'Oct 2026',
        rating: 5,
        title: 'Looks like Tesla shipped it from Fremont',
        body: 'The matte charcoal housing matches the center console texture accurately. Kids use Spotify and rear heated seats on every trip without asking me to tap the front screen.',
        verifiedOwner: true,
      },
    ],
  },
  {
    id: 'gid://shopify/Product/8901421003',
    handle: '3k-dry-carbon-aero-rear-spoiler',
    title: '3K Autoclave Dry Carbon Aero Rear Spoiler',
    subtitle: 'Track-Profile Downforce · UV-Protected Matte Weave',
    category: 'Exterior Aero',
    tagline: 'Precision 3D-scanned trunk contour engineered from pre-preg dry carbon fiber.',
    availabilityNote: 'In Stock',
    rating: 4.9,
    reviewCount: 117,
    images: [
      {
        url: '/src/assets/images/prod_carbon_spoiler_1795429466247.jpg',
        alt: '3K matte dry carbon fiber rear trunk performance spoiler wing on concrete surface',
        caption: '3K Twill Matte Dry Carbon Profile',
      },
      {
        url: '/src/assets/images/hero_tesla_aero_1795429466015.jpg',
        alt: 'Full exterior carbon fiber aerodynamic kit installed on pearl white electric SUV',
        caption: 'Full Aero Package Context',
      },
    ],
    options: [
      {
        name: 'Surface Finish',
        values: ['Matte Dry Carbon', 'Gloss Dry Carbon'],
      },
      {
        name: 'Chassis Fitment',
        values: ['Model 3 Highland (2024+)', 'Model Y (2020–2026)'],
      },
    ],
    variants: [
      {
        id: 'gid://shopify/ProductVariant/44301',
        sku: 'TL-AE-SP-M3H-MT',
        title: 'Matte Dry Carbon / Model 3 Highland (2024+)',
        selectedOptions: {
          'Surface Finish': 'Matte Dry Carbon',
          'Chassis Fitment': 'Model 3 Highland (2024+)',
        },
        price: 389,
        compareAtPrice: 469,
        availableForSale: true,
        inventoryQuantity: 12,
        imageIndex: 0,
      },
      {
        id: 'gid://shopify/ProductVariant/44302',
        sku: 'TL-AE-SP-M3H-GL',
        title: 'Gloss Dry Carbon / Model 3 Highland (2024+)',
        selectedOptions: {
          'Surface Finish': 'Gloss Dry Carbon',
          'Chassis Fitment': 'Model 3 Highland (2024+)',
        },
        price: 389,
        compareAtPrice: 469,
        availableForSale: true,
        inventoryQuantity: 8,
        imageIndex: 0,
      },
      {
        id: 'gid://shopify/ProductVariant/44303',
        sku: 'TL-AE-SP-MY-MT',
        title: 'Matte Dry Carbon / Model Y (2020–2026)',
        selectedOptions: {
          'Surface Finish': 'Matte Dry Carbon',
          'Chassis Fitment': 'Model Y (2020–2026)',
        },
        price: 419,
        compareAtPrice: 499,
        availableForSale: true,
        inventoryQuantity: 19,
        imageIndex: 1,
      },
      {
        id: 'gid://shopify/ProductVariant/44304',
        sku: 'TL-AE-SP-MY-GL',
        title: 'Gloss Dry Carbon / Model Y (2020–2026)',
        selectedOptions: {
          'Surface Finish': 'Gloss Dry Carbon',
          'Chassis Fitment': 'Model Y (2020–2026)',
        },
        price: 419,
        compareAtPrice: 499,
        availableForSale: true,
        inventoryQuantity: 14,
        imageIndex: 1,
      },
    ],
    metafields: {
      compatibleModels: ['Model 3 Highland', 'Model Y'],
      fitmentYears: ['2024–2026 Model 3 Highland', '2020–2026 Model Y'],
      installTimeMinutes: 15,
      difficulty: 'DIY Easy',
      material: '100% Pre-Preg Toray 3K Dry Carbon',
      harnessType: '3M VHB Automotive Structural Adhesive',
      warrantyMonths: 36,
    },
    highlights: [
      'Autoclave-cured pre-preg dry carbon weighs only 480g—zero stress on power trunk struts.',
      'Laser-scanned trunk lip curvature eliminates end-corner lift gaps over time.',
      'Dual-stage UV ceramic clear coat prevents yellowing or resin clouding in sun exposure.',
    ],
    specs: [
      { label: 'Composite Construction', value: '100% Pre-Preg 3K 2×2 Twill' },
      { label: 'Total Weight', value: '480 g (Hollow-Core Autoclave)' },
      { label: 'Mounting Method', value: 'Pre-Applied 3M VHB 5952 + Adhesion Promoter' },
      { label: 'Edge Tolerance', value: '±0.3 mm Laser-Trimmed Fit' },
      { label: 'UV Protection', value: 'PPG Matte Ceramic Clearcoat' },
    ],
    installationSteps: [
      {
        step: 1,
        title: 'Prep Trunk Decklid Surface',
        detail: 'Clean the upper trunk edge with isopropyl alcohol and apply the included 3M primer along the contact track.',
      },
      {
        step: 2,
        title: 'Dry-Fit & Mark Centerline',
        detail: 'Align the center of the wing with the trunk badge using painter’s tape guides before peeling backing film.',
      },
      {
        step: 3,
        title: 'Press & Cure Under Tension',
        detail: 'Remove red VHB liner gradually from center outward, apply firm pressure for 60 seconds, and avoid car washes for 24h.',
      },
    ],
    reviews: [
      {
        id: 'rev-4',
        author: 'Soren Lindqvist',
        vehicle: '2024 Model 3 Highland',
        date: 'Nov 2026',
        rating: 5,
        title: 'Zero corner gap and featherlight',
        body: 'Replaced a cheap ABS spoiler that kept lifting at the edges. This dry carbon piece sits dead flush along the entire trunk arc and weighs almost nothing.',
        verifiedOwner: true,
      },
    ],
  },
  {
    id: 'gid://shopify/Product/8901421004',
    handle: 'ultrawide-9-hud-instrument-cluster',
    title: '9.0-Inch Ultra-Thin Wireless CarPlay HUD Cluster',
    subtitle: 'Linux Real-Time OS · Zero Steering Airflow Block',
    category: 'Cockpit Tech',
    tagline: 'Instant-boot driver instrument screen engineered below the Highland & Model Y vent line.',
    availabilityNote: 'In Stock',
    rating: 4.9,
    reviewCount: 312,
    images: [
      {
        url: '/src/assets/images/prod_hud_cluster_1795429466571.jpg',
        alt: 'Ultra-slim 9-inch horizontal digital instrument cluster mounted behind steering column',
        caption: 'Driver-Focused Telemetry Readout',
      },
      {
        url: '/src/assets/images/prod_ambient_lighting_1795429465437.jpg',
        alt: 'Dark cabin instrument cluster and dash ambient integration',
        caption: 'Night Mode Auto-Dimming',
      },
    ],
    options: [
      {
        name: 'Vehicle Chassis',
        values: ['Model 3 Highland (2024+)', 'Model 3 / Y (2018–2025)'],
      },
      {
        name: 'Driver Side',
        values: ['Left-Hand Drive (LHD)', 'Right-Hand Drive (RHD)'],
      },
    ],
    variants: [
      {
        id: 'gid://shopify/ProductVariant/44401',
        sku: 'TL-HUD-90-H3-LHD',
        title: 'Model 3 Highland (2024+) / Left-Hand Drive (LHD)',
        selectedOptions: {
          'Vehicle Chassis': 'Model 3 Highland (2024+)',
          'Driver Side': 'Left-Hand Drive (LHD)',
        },
        price: 279,
        compareAtPrice: 349,
        availableForSale: true,
        inventoryQuantity: 27,
        imageIndex: 0,
      },
      {
        id: 'gid://shopify/ProductVariant/44402',
        sku: 'TL-HUD-90-M3Y-LHD',
        title: 'Model 3 / Y (2018–2025) / Left-Hand Drive (LHD)',
        selectedOptions: {
          'Vehicle Chassis': 'Model 3 / Y (2018–2025)',
          'Driver Side': 'Left-Hand Drive (LHD)',
        },
        price: 269,
        compareAtPrice: 339,
        availableForSale: true,
        inventoryQuantity: 41,
        imageIndex: 0,
      },
      {
        id: 'gid://shopify/ProductVariant/44403',
        sku: 'TL-HUD-90-H3-RHD',
        title: 'Model 3 Highland (2024+) / Right-Hand Drive (RHD)',
        selectedOptions: {
          'Vehicle Chassis': 'Model 3 Highland (2024+)',
          'Driver Side': 'Right-Hand Drive (RHD)',
        },
        price: 279,
        compareAtPrice: 349,
        availableForSale: true,
        inventoryQuantity: 9,
        imageIndex: 1,
      },
    ],
    metafields: {
      compatibleModels: ['Model 3 Highland', 'Model Y'],
      fitmentYears: ['2024–2026 Model 3 Highland', '2018–2026 Model 3 / Y'],
      installTimeMinutes: 25,
      difficulty: 'DIY Easy',
      material: 'CNC Anodized Aluminum + Gorilla Glass',
      harnessType: 'OEM A-Pillar CAN-Bus Pass-Through',
      warrantyMonths: 24,
    },
    highlights: [
      '1.2-second cold boot on Linux RTOS syncs speed, gear, blind-spot alerts, and tire PSI.',
      'Wireless Apple CarPlay & Android Auto with steering scroll-wheel control support.',
      'Low-profile 16mm bezel preserves full front dash HVAC airflow.',
    ],
    specs: [
      { label: 'Display Spec', value: '9.0" 1920 × 720 Laminated IPS (900 nits)' },
      { label: 'Boot Time', value: '1.2 Seconds (Door Unlock Triggered)' },
      { label: 'Front Camera', value: 'Optional Bumper Cam Input Supported' },
      { label: 'Day/Night Sync', value: 'Automatic via Vehicle Ambient Sensor' },
      { label: 'Firmware Updates', value: 'Dual-Band Wi-Fi OTA' },
    ],
    installationSteps: [
      {
        step: 1,
        title: 'Seat Low-Profile Column Bracket',
        detail: 'Mount the CNC aluminum cradle onto the steering column shroud using factory fastener points.',
      },
      {
        step: 2,
        title: 'Route Single Loom to Passenger Kick Panel',
        detail: 'Tuck the braided 4-pin loom neatly behind the lower dash trim without removing the dash pad.',
      },
      {
        step: 3,
        title: 'Plug In Inline Gateway Harness',
        detail: 'Connect the CAN-bus pass-through plug at the right A-pillar gateway port and test live telemetry.',
      },
    ],
    reviews: [
      {
        id: 'rev-5',
        author: 'Tariq Al-Mansoor',
        vehicle: '2024 Model 3 Highland',
        date: 'Oct 2026',
        rating: 5,
        title: 'Waze right in front of me without looking right',
        body: 'Screen brightness matches the central Tesla panel in direct sunlight and dims cleanly at night. Wireless CarPlay connects before I shift into Drive.',
        verifiedOwner: true,
      },
    ],
  },
  {
    id: 'gid://shopify/Product/8901421005',
    handle: 'turbine-19-aero-wheel-covers-set',
    title: '19-Inch Satin Turbine Aero Wheel Covers (Set of 4)',
    subtitle: 'Full-Rim Curb Shield · Acoustic Foam Backing',
    category: 'Wheel & Chassis',
    tagline: 'Aerodynamic vortex blade profile lowers drag coefficient while guarding alloy lips.',
    availabilityNote: 'In Stock',
    rating: 4.8,
    reviewCount: 405,
    images: [
      {
        url: '/src/assets/images/prod_wheel_covers_1795429466113.jpg',
        alt: 'Matte satin black aerodynamic turbine wheel cover for 19-inch electric vehicle wheels',
        caption: 'Satin Stealth Black · 19" Gemini / Nova Fit',
      },
      {
        url: '/src/assets/images/hero_tesla_aero_1795429466015.jpg',
        alt: 'Performance electric crossover fitted with satin black wheels in studio',
        caption: 'Mounted Stance Profile',
      },
    ],
    options: [
      {
        name: 'Wheel Fitment',
        values: ['Model Y 19" Gemini', 'Model 3 Highland 18" Photon', 'Cybertruck 20" Core'],
      },
      {
        name: 'Finish',
        values: ['Satin Stealth Black', 'Gunmetal Matte'],
      },
    ],
    variants: [
      {
        id: 'gid://shopify/ProductVariant/44501',
        sku: 'TL-WC-MY19-SB',
        title: 'Model Y 19" Gemini / Satin Stealth Black',
        selectedOptions: {
          'Wheel Fitment': 'Model Y 19" Gemini',
          Finish: 'Satin Stealth Black',
        },
        price: 189,
        compareAtPrice: 239,
        availableForSale: true,
        inventoryQuantity: 64,
        imageIndex: 0,
      },
      {
        id: 'gid://shopify/ProductVariant/44502',
        sku: 'TL-WC-M3H18-SB',
        title: 'Model 3 Highland 18" Photon / Satin Stealth Black',
        selectedOptions: {
          'Wheel Fitment': 'Model 3 Highland 18" Photon',
          Finish: 'Satin Stealth Black',
        },
        price: 179,
        compareAtPrice: 229,
        availableForSale: true,
        inventoryQuantity: 38,
        imageIndex: 0,
      },
      {
        id: 'gid://shopify/ProductVariant/44503',
        sku: 'TL-WC-CT20-GM',
        title: 'Cybertruck 20" Core / Gunmetal Matte',
        selectedOptions: {
          'Wheel Fitment': 'Cybertruck 20" Core',
          Finish: 'Gunmetal Matte',
        },
        price: 249,
        compareAtPrice: 299,
        availableForSale: true,
        inventoryQuantity: 21,
        imageIndex: 1,
      },
    ],
    metafields: {
      compatibleModels: ['Model Y', 'Model 3 Highland', 'Cybertruck'],
      fitmentYears: ['2020–2026 Model Y', '2024–2026 Model 3 Highland', '2024–2026 Cybertruck'],
      installTimeMinutes: 10,
      difficulty: 'DIY Easy',
      material: 'High-Impact PC+ABS Composite',
      harnessType: 'OEM Snap-Lock Steel Retention Clips',
      warrantyMonths: 24,
    },
    highlights: [
      'Extended outer lip covers the exposed alloy rim edge to absorb low-speed curb scrapes.',
      'Includes pre-cut EVA acoustic foam strips to eliminate creaks and protect factory alloy paint.',
      'Directional turbine louvers improve highway Wh/mi efficiency by up to 2.8%.',
    ],
    specs: [
      { label: 'Material', value: 'Automotive PC+ABS High-Temp Blend' },
      { label: 'Set Contents', value: '4 × Aero Covers, 4 × Center Caps, EVA Tape' },
      { label: 'Retention System', value: '12-Point Steel Tension Ring' },
      { label: 'Efficiency Delta', value: '+2.8% Highway Aero Gain' },
      { label: 'Car Wash Safe', value: 'Yes (Pressure Rated to 1,800 PSI)' },
    ],
    installationSteps: [
      {
        step: 1,
        title: 'Apply Perimeter Foam Cushion',
        detail: 'Stick the provided EVA acoustic gasket tape along the inner perimeter flange of each cover.',
      },
      {
        step: 2,
        title: 'Align Valve Stem Cutout',
        detail: 'Match the notched cutout with your tire valve stem so TPMS access remains unobstructed.',
      },
      {
        step: 3,
        title: 'Snap Steel Clips Firmly',
        detail: 'Press around the center hub and outer spokes until all locking tabs click into the alloy barrel.',
      },
    ],
    reviews: [
      {
        id: 'rev-6',
        author: 'Hannah Kowalski',
        vehicle: '2025 Model Y',
        date: 'Sep 2026',
        rating: 5,
        title: 'Already saved my right rear wheel from a drive-thru curb',
        body: 'Zero vibration at 75 mph and the satin black looks like forged 20-inch Induction wheels from ten feet away.',
        verifiedOwner: true,
      },
    ],
  },
  {
    id: 'gid://shopify/Product/8901421006',
    handle: 'all-weather-3d-tpe-floor-liner-system',
    title: 'Laser-Measured 3D All-Weather TPE Floor Liners',
    subtitle: 'Odorless Medical-Grade TPE · Raised Perimeter Containment',
    category: 'Interior Trim',
    tagline: 'Precision 3D-scanned cabin floor armor engineered for snow, sand, and daily commuting.',
    availabilityNote: 'In Stock',
    rating: 4.9,
    reviewCount: 528,
    images: [
      {
        url: '/src/assets/images/prod_floor_mats_1795429465884.jpg',
        alt: 'Precision 3D laser-measured all-weather matte charcoal TPE floor liners for EV cabin',
        caption: '3-Piece Front & Rear Cabin Liner Set',
      },
      {
        url: '/src/assets/images/prod_ambient_lighting_1795429465437.jpg',
        alt: 'Clean architectural EV interior pairing',
        caption: 'Flush Cabin Threshold Fit',
      },
    ],
    options: [
      {
        name: 'Vehicle Configuration',
        values: ['Model Y 5-Seater (2021–2026)', 'Model 3 Highland (2024–2026)', 'Cybertruck Crew Cab'],
      },
      {
        name: 'Coverage Package',
        values: ['3-Piece Cabin Set', '6-Piece Full Cabin + Frunk + Trunk'],
      },
    ],
    variants: [
      {
        id: 'gid://shopify/ProductVariant/44601',
        sku: 'TL-FM-MY5-3PC',
        title: 'Model Y 5-Seater (2021–2026) / 3-Piece Cabin Set',
        selectedOptions: {
          'Vehicle Configuration': 'Model Y 5-Seater (2021–2026)',
          'Coverage Package': '3-Piece Cabin Set',
        },
        price: 159,
        compareAtPrice: 199,
        availableForSale: true,
        inventoryQuantity: 85,
        imageIndex: 0,
      },
      {
        id: 'gid://shopify/ProductVariant/44602',
        sku: 'TL-FM-MY5-6PC',
        title: 'Model Y 5-Seater (2021–2026) / 6-Piece Full Cabin + Frunk + Trunk',
        selectedOptions: {
          'Vehicle Configuration': 'Model Y 5-Seater (2021–2026)',
          'Coverage Package': '6-Piece Full Cabin + Frunk + Trunk',
        },
        price: 259,
        compareAtPrice: 329,
        availableForSale: true,
        inventoryQuantity: 42,
        imageIndex: 0,
      },
      {
        id: 'gid://shopify/ProductVariant/44603',
        sku: 'TL-FM-M3H-3PC',
        title: 'Model 3 Highland (2024–2026) / 3-Piece Cabin Set',
        selectedOptions: {
          'Vehicle Configuration': 'Model 3 Highland (2024–2026)',
          'Coverage Package': '3-Piece Cabin Set',
        },
        price: 159,
        compareAtPrice: 199,
        availableForSale: true,
        inventoryQuantity: 53,
        imageIndex: 0,
      },
      {
        id: 'gid://shopify/ProductVariant/44604',
        sku: 'TL-FM-CT-3PC',
        title: 'Cybertruck Crew Cab / 3-Piece Cabin Set',
        selectedOptions: {
          'Vehicle Configuration': 'Cybertruck Crew Cab',
          'Coverage Package': '3-Piece Cabin Set',
        },
        price: 199,
        compareAtPrice: 249,
        availableForSale: true,
        inventoryQuantity: 29,
        imageIndex: 0,
      },
    ],
    metafields: {
      compatibleModels: ['Model Y', 'Model 3 Highland', 'Cybertruck'],
      fitmentYears: ['2021–2026 Model Y', '2024–2026 Model 3 Highland', '2024–2026 Cybertruck'],
      installTimeMinutes: 5,
      difficulty: 'DIY Easy',
      material: 'SGS-Certified 100% Virgin TPE',
      harnessType: 'OEM Anti-Slip Nib Underside',
      warrantyMonths: 60,
    },
    highlights: [
      'Zero toxic rubber smell even in 110°F parked cabins—100% recyclable virgin TPE.',
      '45mm vertical edge walls trap melted snow and mud away from OEM carpet.',
      'Architectural anti-slip heel channels drain liquid without curling at door sills.',
    ],
    specs: [
      { label: 'Compound', value: 'Injection-Molded Virgin TPE (3.2 mm)' },
      { label: 'Lip Height', value: '45 mm Laser-Contoured Perimeter' },
      { label: 'Thermal Rating', value: '-40°C to +85°C Crack-Proof' },
      { label: 'Cleaning', value: 'Hose-Off Matte Finish (60-Sec Dry)' },
      { label: 'Safety', value: 'Accelerator Pedal Clearance Verified' },
    ],
    installationSteps: [
      {
        step: 1,
        title: 'Remove Factory Carpet Mats',
        detail: 'Lift out the OEM textile mats so the TPE liners anchor directly to the cabin floor hooks and carpet nap.',
      },
      {
        step: 2,
        title: 'Drop In Front & Rear Liners',
        detail: 'Position the dead-pedal flap cleanly under the driver footrest and slide the single-piece rear liner beneath front rails.',
      },
    ],
    reviews: [
      {
        id: 'rev-7',
        author: 'Claire Bennett',
        vehicle: '2024 Cybertruck AWD',
        date: 'Oct 2026',
        rating: 5,
        title: 'Zero odor out of the box and sits flat immediately',
        body: 'Packed flat in a proper box instead of folded in half. Dropped right into the Cybertruck footwells and hoses clean in two minutes.',
        verifiedOwner: true,
      },
    ],
  },
  {
    id: 'gid://shopify/Product/8901421007',
    handle: 'dynamic-oem-dash-ambient-light-kit',
    title: 'Dynamic OEM-Flush Dash & Door Ambient Light Strip',
    subtitle: '256-Color App & CAN Sync · Zero Exposed Fiber',
    category: 'Interior Trim',
    tagline: 'Factory-integrated RGBIC dashboard illumination synced with turn signals and door chimes.',
    availabilityNote: 'Low Stock',
    rating: 4.8,
    reviewCount: 93,
    images: [
      {
        url: '/src/assets/images/prod_ambient_lighting_1795429465437.jpg',
        alt: 'Tesla dashboard featuring ultra-slim OEM-flush dynamic LED ambient light strip glowing warmly across matte suede trim',
        caption: 'OEM-Flush Dashboard Light Blade',
      },
      {
        url: '/src/assets/images/prod_hud_cluster_1795429466571.jpg',
        alt: 'Cabin view showing integrated dashboard ambient accent with steering cluster',
        caption: 'Daylight Diffuser Profile',
      },
    ],
    options: [
      {
        name: 'Coverage Zone',
        values: ['Dashboard + Center Console', 'Full Cabin (Dash + 4 Doors + Footwells)'],
      },
      {
        name: 'Model Fitment',
        values: ['Model Y (2021–2025)', 'Model 3 (2019–2023)'],
      },
    ],
    variants: [
      {
        id: 'gid://shopify/ProductVariant/44701',
        sku: 'TL-AL-MY-DC',
        title: 'Dashboard + Center Console / Model Y (2021–2025)',
        selectedOptions: {
          'Coverage Zone': 'Dashboard + Center Console',
          'Model Fitment': 'Model Y (2021–2025)',
        },
        price: 149,
        compareAtPrice: 189,
        availableForSale: true,
        inventoryQuantity: 5,
        imageIndex: 0,
      },
      {
        id: 'gid://shopify/ProductVariant/44702',
        sku: 'TL-AL-MY-FULL',
        title: 'Full Cabin (Dash + 4 Doors + Footwells) / Model Y (2021–2025)',
        selectedOptions: {
          'Coverage Zone': 'Full Cabin (Dash + 4 Doors + Footwells)',
          'Model Fitment': 'Model Y (2021–2025)',
        },
        price: 239,
        compareAtPrice: 299,
        availableForSale: true,
        inventoryQuantity: 4,
        imageIndex: 0,
      },
      {
        id: 'gid://shopify/ProductVariant/44703',
        sku: 'TL-AL-M3-FULL',
        title: 'Full Cabin (Dash + 4 Doors + Footwells) / Model 3 (2019–2023)',
        selectedOptions: {
          'Coverage Zone': 'Full Cabin (Dash + 4 Doors + Footwells)',
          'Model Fitment': 'Model 3 (2019–2023)',
        },
        price: 239,
        compareAtPrice: 299,
        availableForSale: true,
        inventoryQuantity: 7,
        imageIndex: 1,
      },
    ],
    metafields: {
      compatibleModels: ['Model Y', 'Model 3 Highland', 'Model S / X'],
      fitmentYears: ['2021–2025 Model Y', '2019–2023 Model 3', '2021–2026 Model S / X'],
      installTimeMinutes: 40,
      difficulty: 'Intermediate',
      material: 'Acrylic Micro-Diffuser Blade + Aluminum Heat Sink',
      harnessType: 'Sentry-Safe 16V/12V Auto-Sleep Harness',
      warrantyMonths: 24,
    },
    highlights: [
      'Uses rigid micro-prismatic acrylic blades instead of uneven fiber-optic tubes.',
      'CAN-bus triggers flash amber for blind-spot alerts and red pulse when doors open.',
      'Automatically powers down when Sentry Mode sleeps to protect 12V/16V auxiliary battery.',
    ],
    specs: [
      { label: 'LED Architecture', value: 'High-Density Addressable RGBIC' },
      { label: 'Power Draw', value: '4.8W Max (Auto-Sleep on Lock)' },
      { label: 'Safety Triggers', value: 'Door Open Warning + Blind-Spot Pulse' },
      { label: 'Blade Thickness', value: '1.8 mm Hidden Seam Profile' },
    ],
    installationSteps: [
      {
        step: 1,
        title: 'Tuck Rigid Light Blade Behind Dash Cap',
        detail: 'Slide the 1.8mm diffuser strip into the factory gap below the wooden/suede dash trim.',
      },
      {
        step: 2,
        title: 'Plug Power Module into Center Console Port',
        detail: 'Connect the smart sleep controller inline behind the center console kick panel.',
      },
    ],
    reviews: [
      {
        id: 'rev-8',
        author: 'Julian Mercer',
        vehicle: '2023 Model Y Performance',
        date: 'Oct 2026',
        rating: 5,
        title: 'Even illumination with zero hot spots',
        body: 'Because it uses an actual acrylic diffuser blade instead of fiber optic string, the light is completely uniform across the entire dash width.',
        verifiedOwner: true,
      },
    ],
  },
];
