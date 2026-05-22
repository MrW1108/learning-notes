
export interface DecoratorItem {
  id: string;
  type: 'snowman' | 'gift' | 'star' | 'reindeer';
  x: number;
  y: number;
  scale: number;
}

export interface SnowParticle {
  x: number;
  y: number;
  radius: number;
  speed: number;
  wind: number;
  opacity: number;
}
