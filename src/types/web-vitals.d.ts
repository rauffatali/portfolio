declare module 'web-vitals' {
  export type ReportHandler = (metric: {
    name: string;
    delta: number;
    id: string;
    value: number;
  }) => void;

  export const getCLS: (onReport: ReportHandler) => void;
  export const getFID: (onReport: ReportHandler) => void;
  export const getFCP: (onReport: ReportHandler) => void;
  export const getLCP: (onReport: ReportHandler) => void;
  export const getTTFB: (onReport: ReportHandler) => void;
} 