import { CountryType } from '../types/country-type.enum';
import { FoodType } from '../types/food-type.enum';
import { HobbyType } from '../types/hobby-type.enum';
import { InteractionStatusType } from '../types/interaction-type.enum';
import { MusicType } from '../types/music-type.enum';
import { TransportType } from '../types/transport-type.enum';

export interface Companion {
  id: string;
  firstName: string;
  lastName: string;
  photoUrl: string;
  likes: number;
  wasLiked: boolean;
  countries: CountryType[];
  interactionStatus: InteractionStatusType;
  hobbies: HobbyType[];
  musics: MusicType[];
  foods: FoodType[];
  transportType: TransportType;
  level: number;
}
