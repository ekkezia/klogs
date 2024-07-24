import { keyframes } from '@emotion/react';
import theme from './theme';

export const breathe = keyframes`
0%, 100% {
  opacity: 0;
}

50% {
  opacity: 1;
}
`;

export const grow = keyframes`
0%, 100% {
  transform: scale(1);
}

50% {
  transform: scale(1.1);
}
`;

export const shake = keyframes`
0%, 100% {
  transform: translateX(0);
},
20%, 60% {
  transform: translateX(-5px);
},
40%, 80%: {
  transform: translateX(5px);
}
`;

export const filterGradient = keyframes`
0%, 100% {
  filter: ${theme?.palette?.PCLab?.primary?.defaultFilter};
},
20%, 60% {
  filter: ${theme?.palette?.PCLab?.primary?.lighterFilter};
},
40%, 80%: {
  filter: none;
},
`;

export const backgroundGradient = keyframes`
	0% {
		background-position: 0% 50%;
	}
	50% {
		background-position: 100% 50%;
	}
	100% {
		background-position: 0% 50%;
	}
`;

export const rotateZ = keyframes`
0%, 100% {
  transform: rotateZ(0deg);
  transform-origin: center;
}

50% {
  transform: rotateZ(360deg);
    transform-origin: center;
}
`;

export const down = keyframes`
0% {
  transform: translateY(-100%);
}
100% {
  transform: translateY(0%);
}
`;

export const up = keyframes`
0% {
  transform: translateY(100%);
}
100% {
  transform: translateY(0%);
}
`;

export const fadeIn = keyframes`
0% {
  opacity: 0;
}

100% {
  opacity: 1;
}
`;

export const fadeOut = keyframes`
0% {
  opacity: 1;
}

100% {
  opacity: 0;
}
`;
