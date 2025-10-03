import { FormStepName } from './enum';
import PlaneIcon from '/images/assets/icons/icon-plane.svg';
import BusIcon from '/images/assets/icons/icon-bus.svg';
import BikeIcon from '/images/assets/icons/icon-bike.svg';
import FootIcon from '/images/assets/icons/icon-foot.svg';

export const DEFAULT_CARDS_AMOUNT = 4;

export const ValidNumbers = {
  People : { min: 1, max: 10 },
  Duration : { min: 2, max: 31 },
  CommentLength: {max: 200}
} as const;

export const transportConfig = {
  plane: { icon: PlaneIcon, label: 'Авиаперелет' },
  bus: { icon: BusIcon, label: 'Автотранспорт' },
  bike: { icon: BikeIcon, label: 'Велосипед' },
  foot: { icon: FootIcon, label: 'Пешком' },
};

export const formStepText = {
  [FormStepName.Dates]: `Укажите предпочтительное количество попутчиков, которых
  вы хотели бы позвать в поездку, и ее предполагаемую длительность.`,
  [FormStepName.Route]: `Укажите страны, которые вы хотели бы посетить.
  Это может быть одна или сразу несколько.`,
  [FormStepName.Entertainment]: `Наконец, расскажите о своих планах времяпровождения.
  Можно писать в свободной форме и ставить тэги.`,
} as const;

export const CYRILLIC_ALPHABET = [
  'А','Б','В','Г','Д','Е','Ж','З','И','К','Л',
  'М','Н','О','П','Р','С','Т','У','Ф','Х',
  'Ч','Ш','Э','Ю','Я'
];
