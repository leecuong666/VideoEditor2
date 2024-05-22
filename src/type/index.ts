export interface MediaProps {
  id: string;
  name: string;
  thumbnail: string;
  duration: number;
  timelineData: string[];
  typeVid?: 'videoImport' | 'videoEdited';
}

export type itemType = 'sticker' | 'text';

interface commonProps {
  x: number;
  y: number;
  startTime: number;
  endTime: number;
  type: itemType;
}

export interface TextProps extends commonProps {
  text: string;
  fontFamily: string;
  fontSize: number;
  color: string;
  bgColor: string;
}

export interface StickerProps extends commonProps {
  sticker: number;
}
