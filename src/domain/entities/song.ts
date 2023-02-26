import { Artist } from './artist';

export interface Song {
  _id?: string;
  name: string;
  trackUrl: string;
  trackType: string;
  artist: Partial<Artist>;
  duration: number;
}
