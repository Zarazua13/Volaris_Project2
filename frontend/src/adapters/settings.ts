import { Settings } from "@/interfaces";

export const settingsAdapter = (settings: {
  [key: string]: string;
}): Settings => {
  const { referenceNumber, defaultAssigner, defaultComment } = settings;

  return { referenceNumber, defaultAssigner, defaultComment };
};
