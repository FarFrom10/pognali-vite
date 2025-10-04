const icons = {
  close: (
    <svg width="24" height="22" viewBox="0 0 24 22" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g opacity="0.1">
        <path d="M21 2.75L3 19.25" stroke="black" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M3 2.75L21 19.25" stroke="black" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
      </g>
    </svg>
  ),
  closeSelect: (
    <svg width="24" height="22" viewBox="0 0 24 22" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g opacity="0.3">
        <path d="M21 2.75L3 19.25" stroke="white" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M3 2.75L21 19.25" stroke="white" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
      </g>
    </svg>

  ),
  arrowDown: (
    <svg width="25" height="22" viewBox="0 0 25 22" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g opacity="0.3" clipPath="url(#clip0_1369_1800)">
        <path d="M2.41098 3.48124C2.2807 3.59655 2.17735 3.73355 2.10682 3.88437C2.0363 4.0352 2 4.19689 2 4.36018C2 4.52347 2.0363 4.68516 2.10682 4.83599C2.17735 4.98681 2.2807 5.12381 2.41098 5.23913L11.7109 13.4923C11.8144 13.5843 11.9374 13.6574 12.0728 13.7072C12.2082 13.7571 12.3533 13.7827 12.4999 13.7827C12.6464 13.7827 12.7916 13.7571 12.9269 13.7072C13.0623 13.6574 13.1853 13.5843 13.2888 13.4923L22.5887 5.23913C23.1371 4.75248 23.1371 3.96788 22.5887 3.48124C22.0404 2.99459 21.4645 3.39773 20.9162 3.88437L16.0412 8.23128L12.4637 11.2936L3.46374 3.47059C3.46374 3.47059 2.94816 2.99459 2.41098 3.48124Z" fill="black"/>
      </g>
      <defs>
        <clipPath id="clip0_1369_1800">
          <rect width="22" height="24" fill="white" transform="matrix(0 -1 1 0 0.5 22)"/>
        </clipPath>
      </defs>
    </svg>
  ),

  heart: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g opacity="0.5">
        <path fillRule="evenodd" clipRule="evenodd" d="M10 8.12436L11.1175 5.77557C11.395 5.19396 11.8762 4.35764 12.5575 3.68149C13.2275 3.01585 14.03 2.5629 15 2.5629C17.095 2.5629 18.75 4.30381 18.75 6.39658C18.75 7.9865 18.0575 9.10903 16.415 10.8211C15.9937 11.2596 15.5138 11.7335 14.9825 12.2561C13.5975 13.6215 11.875 15.3204 10 17.5917C8.125 15.3204 6.4025 13.6215 5.0175 12.2561C4.48625 11.7335 4.005 11.2583 3.585 10.8211C1.9425 9.10903 1.25 7.9865 1.25 6.39658C1.25 4.30381 2.905 2.5629 5 2.5629C5.97 2.5629 6.7725 3.01585 7.4425 3.68149C8.12375 4.35764 8.605 5.19396 8.8825 5.77557L10 8.12436ZM10.49 19.0109C10.4298 19.0858 10.3548 19.146 10.2701 19.1873C10.1855 19.2286 10.0933 19.25 10 19.25C9.90668 19.25 9.81449 19.2286 9.72986 19.1873C9.64523 19.146 9.57019 19.0858 9.51 19.0109C7.50875 16.5138 5.6975 14.7283 4.20625 13.2591C1.625 10.7134 0 9.11297 0 6.39658C0 3.55414 2.2375 1.25 5 1.25C7 1.25 8.39875 2.62855 9.255 3.88631C9.58 4.36552 9.8275 4.82635 10 5.18871C10.2162 4.73519 10.4653 4.29978 10.745 3.88631C11.6012 2.62723 13 1.25 15 1.25C17.7625 1.25 20 3.55414 20 6.39658C20 9.11297 18.375 10.7134 15.7938 13.2591C14.3025 14.7296 12.4913 16.5151 10.49 19.0096V19.0109Z" fill="#192144"/>
      </g>
    </svg>
  ),
  plusMore: (
    <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect y="12" width="26" height="2" rx="1" fill="#1D2E5B"/>
      <rect x="12" y="26" width="26" height="2" rx="1" transform="rotate(-90 12 26)" fill="#1D2E5B"/>
    </svg>
  )
};

type IconName = keyof typeof icons;

type Props = {
  name: IconName;
  width?: number;
  height?: number;
  className?: string;
};

function CommonIcon({ name, width = 24, height = 22, className }: Props) {
  const Svg = icons[name];
  return (
    <span
      className={className}
      style={{ display: 'inline-flex', width, height }}
    >
      {Svg}
    </span>
  );
}

export default CommonIcon;
