export interface CadastralCategory {
    code: string;
    description: string;
    coefficient?: number;
    notes?: string;
  }
  
  export const cadastralCategories: CadastralCategory[] = [
    // Group A - Residential buildings
    { code: "A/1", description: "Luxury residential home", coefficient: 160, notes: "Subject to IMU even if primary residence" },
    { code: "A/2", description: "Standard residential home", coefficient: 160 },
    { code: "A/3", description: "Economic residential home", coefficient: 160 },
    { code: "A/4", description: "Popular housing", coefficient: 160 },
    { code: "A/5", description: "Ultra-popular housing (obsolete)", coefficient: 160 },
    { code: "A/6", description: "Rural residential home", coefficient: 160 },
    { code: "A/7", description: "Single-family villa", coefficient: 160 },
    { code: "A/8", description: "Luxury villa", coefficient: 160, notes: "Subject to IMU even if primary residence" },
    { code: "A/9", description: "Castles or artistic buildings", coefficient: 160, notes: "Always subject to IMU" },
    { code: "A/10", description: "Office/studio not in residential buildings", coefficient: 80 },
    { code: "A/11", description: "Public housing", coefficient: 160 },
  
    // Group B - Public interest buildings
    { code: "B/1", description: "Boarding schools, convents, orphanages", coefficient: 140 },
    { code: "B/2", description: "Colleges and universities", coefficient: 140 },
    { code: "B/3", description: "Prisons", coefficient: 140 },
    { code: "B/4", description: "Hospitals and nursing homes", coefficient: 140 },
    { code: "B/5", description: "Laboratories and research centers", coefficient: 140 },
    { code: "B/6", description: "Libraries, museums, galleries", coefficient: 140 },
    { code: "B/7", description: "Religious buildings", coefficient: 140 },
    { code: "B/8", description: "Charity buildings not for housing", coefficient: 140 },
  
    // Group C - Commercial and accessory units
    { code: "C/1", description: "Shops and stores", coefficient: 55 },
    { code: "C/2", description: "Storage rooms, attics, cellars", coefficient: 160 },
    { code: "C/3", description: "Artisan workshops", coefficient: 140 },
    { code: "C/4", description: "Gyms, beauty salons, etc.", coefficient: 140 },
    { code: "C/5", description: "Baths and laundries", coefficient: 140 },
    { code: "C/6", description: "Stables and garages", coefficient: 160 },
    { code: "C/7", description: "Sheds and canopies", coefficient: 160 },
  
    // Group D - Special use buildings
    { code: "D/1", description: "Industrial buildings", coefficient: 65 },
    { code: "D/2", description: "Hotels and pensions", coefficient: 65 },
    { code: "D/3", description: "Theaters, cinemas, etc.", coefficient: 65 },
    { code: "D/4", description: "Private hospitals", coefficient: 65 },
    { code: "D/5", description: "Bank and insurance buildings", coefficient: 80 },
    { code: "D/6", description: "Sports facilities", coefficient: 65 },
    { code: "D/7", description: "Production plants", coefficient: 65 },
    { code: "D/8", description: "Commercial buildings", coefficient: 65 },
    { code: "D/9", description: "Floating structures", coefficient: 65 },
    { code: "D/10", description: "Rural agricultural buildings", coefficient: 65 },
  
    // Group E - Public utility infrastructure
    { code: "E/1", description: "Railways", coefficient: 80 },
    { code: "E/2", description: "Bridges and viaducts", coefficient: 80 },
    { code: "E/3", description: "Public buildings (not for housing)", coefficient: 80 },
    { code: "E/4", description: "Forts and defense buildings", coefficient: 80 },
    { code: "E/5", description: "Churches and temples", coefficient: 80 },
    { code: "E/6", description: "Public cemeteries", coefficient: 80 },
    { code: "E/7", description: "Lighthouses, towers", coefficient: 80 },
    { code: "E/8", description: "Public aqueducts", coefficient: 80 },
    { code: "E/9", description: "Special public utility buildings", coefficient: 80 },
  
    // Group F - Special and undefined units
    { code: "F/1", description: "Under-construction or unfinished building", notes: "Not subject to IMU until usable" },
    { code: "F/2", description: "Unusable ruins", notes: "Not subject to IMU if certified uninhabitable" },
    { code: "F/3", description: "Building unit under construction", notes: "Subject to IMU only if classified as usable" },
    { code: "F/4", description: "Unit under definition", notes: "Temporary classification — check local rules" },
    { code: "F/5", description: "Urban land not yet built", notes: "Usually treated as buildable land for IMU" },
    { code: "F/6", description: "Unit declared no longer existing", notes: "Removed from IMU calculation" },
    { code: "F/7", description: "Common areas not listed separately", notes: "Not subject to IMU" },
    { code: "F/8", description: "Infrastructure unit (e.g. fiber cabinets)", notes: "Check with local cadastre" }
  ];