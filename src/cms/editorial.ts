import { getCmsBundle } from '@/cms/loadBundle';

export function getEditorial() {
  return getCmsBundle().editorial;
}
