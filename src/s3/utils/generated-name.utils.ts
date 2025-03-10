import { v4 as uuidv4 } from 'uuid';

export const generatedName = (name: string) => {
  const extension = name.split('.').pop();
  const uniqueName = uuidv4();
  const url = `${uniqueName}.${extension}`;

  return url;
};
