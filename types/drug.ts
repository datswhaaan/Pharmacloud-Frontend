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
  has_images: boolean;
};

export type DrugImages = {
  id: string;
  url: string;
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
  images: DrugImages[];
  instructions: DrugInstruction;
  flags: DrugFlags;
};

export type ImageInput = {
  file: File;
  preview: string;
  view_type?: string;
  position?: number;
  lighting?: string;
};

export type Drug = {
  drug_id: string;
  drug_code: string;
  drug_common_name: string;
  flags: DrugFlags
};