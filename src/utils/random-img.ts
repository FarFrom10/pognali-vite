const images = [
  '/images/assets/avatar-1.png',
  '/images/assets/firsova-desktop 1.png',
  '/images/assets/img 1.png',
  '/images/assets/smolov-desktop 1.png',
];

export function getRandomImage(): string {
  const randomIndex = Math.floor(Math.random() * images.length);
  return images[randomIndex];
}
