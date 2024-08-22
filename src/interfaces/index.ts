import { EInstructionGroup } from "../enums";

export interface IAppConfig {
  affiliateDocUrl?: string;
  instructionManualGroups: {
    title: string;

    items: {
      title: string;
      subTitle?: string;
      value: EInstructionGroup;
    }[];
  }[];
  instructionManuals: {
    group: EInstructionGroup;
    keywords: string[];
    title: string;
    url: string;
  }[];
  appUI:
  {
    name : string,
    value : any,
  }[];
}
