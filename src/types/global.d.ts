/* eslint-disable @typescript-eslint/no-empty-object-type */

interface DataLayerItem {
  [key: string]: unknown;
}

interface Window {
  dataLayer: DataLayerItem[];
}
