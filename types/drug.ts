export type DrugName = {
  generic: string;
  trade: string;
  thai: string;
};

export type DrugCategory = {
  therapeutic: string;
  pharmacological: string;
  standard: string;
};

export type DrugFlags = {
  is_high_alert: boolean;
  is_new_drug: boolean;
  has_images: boolean;
};

export type DrugImages = {
  id: string;
  image_url: string;
  view_type?: string;
  position?: number;
  lighting?: string;
  created_at?: string;
};

export type DrugInstruction = {
  caution?: string;
  description?: string;
  special_prescription?: string;
  instruction?: string;
};

export type DrugResponse = {
  id: string;
  code: string;
  names: DrugName;
  categories: DrugCategory;
  flags: DrugFlags;
  images: DrugImages[];
  instructions: DrugInstruction;
};