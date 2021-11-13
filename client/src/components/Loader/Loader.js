import React from 'react';

// styles
import styled from 'styled-components';
import { colors } from '../../GlobalStyles';

const Loader = (props) => {
  return (
    <LoaderContainer {...props}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        style={{
          margin: '8rem auto',
          background: 'none',
          display: 'block',
          shapeRendering: 'auto',
        }}
        width="200px"
        height="200px"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid"
      >
        <g transform="rotate(0 50 50)">
          <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#388fe3">
            <animate
              attributeName="opacity"
              values="1;0"
              keyTimes="0;1"
              dur="0.4097560975609756s"
              begin="-0.4589430894308943s"
              repeatCount="indefinite"
            ></animate>
          </rect>
        </g>
        <g transform="rotate(30 50 50)">
          <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#388fe3">
            <animate
              attributeName="opacity"
              values="1;0"
              keyTimes="0;1"
              dur="0.6097560975609756s"
              begin="-0.508130081300813s"
              repeatCount="indefinite"
            ></animate>
          </rect>
        </g>
        <g transform="rotate(60 50 50)">
          <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#388fe3">
            <animate
              attributeName="opacity"
              values="1;0"
              keyTimes="0;1"
              dur="0.6097560975609756s"
              begin="-0.4573170731707317s"
              repeatCount="indefinite"
            ></animate>
          </rect>
        </g>
        <g transform="rotate(90 50 50)">
          <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#388fe3">
            <animate
              attributeName="opacity"
              values="1;0"
              keyTimes="0;1"
              dur="0.6097560975609756s"
              begin="-0.4065040650406504s"
              repeatCount="indefinite"
            ></animate>
          </rect>
        </g>
        <g transform="rotate(120 50 50)">
          <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#388fe3">
            <animate
              attributeName="opacity"
              values="1;0"
              keyTimes="0;1"
              dur="0.6097560975609756s"
              begin="-0.3556910569105691s"
              repeatCount="indefinite"
            ></animate>
          </rect>
        </g>
        <g transform="rotate(150 50 50)">
          <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#388fe3">
            <animate
              attributeName="opacity"
              values="1;0"
              keyTimes="0;1"
              dur="0.6097560975609756s"
              begin="-0.3048780487804878s"
              repeatCount="indefinite"
            ></animate>
          </rect>
        </g>
        <g transform="rotate(180 50 50)">
          <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#388fe3">
            <animate
              attributeName="opacity"
              values="1;0"
              keyTimes="0;1"
              dur="0.6097560975609756s"
              begin="-0.2540650406504065s"
              repeatCount="indefinite"
            ></animate>
          </rect>
        </g>
        <g transform="rotate(210 50 50)">
          <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#388fe3">
            <animate
              attributeName="opacity"
              values="1;0"
              keyTimes="0;1"
              dur="0.6097560975609756s"
              begin="-0.2032520325203252s"
              repeatCount="indefinite"
            ></animate>
          </rect>
        </g>
        <g transform="rotate(240 50 50)">
          <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#388fe3">
            <animate
              attributeName="opacity"
              values="1;0"
              keyTimes="0;1"
              dur="0.6097560975609756s"
              begin="-0.1524390243902439s"
              repeatCount="indefinite"
            ></animate>
          </rect>
        </g>
        <g transform="rotate(270 50 50)">
          <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#388fe3">
            <animate
              attributeName="opacity"
              values="1;0"
              keyTimes="0;1"
              dur="0.6097560975609756s"
              begin="-0.1016260162601626s"
              repeatCount="indefinite"
            ></animate>
          </rect>
        </g>
        <g transform="rotate(300 50 50)">
          <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#388fe3">
            <animate
              attributeName="opacity"
              values="1;0"
              keyTimes="0;1"
              dur="0.6097560975609756s"
              begin="-0.0508130081300813s"
              repeatCount="indefinite"
            ></animate>
          </rect>
        </g>
        <g transform="rotate(330 50 50)">
          <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#388fe3">
            <animate
              attributeName="opacity"
              values="1;0"
              keyTimes="0;1"
              dur="0.6097560975609756s"
              begin="0s"
              repeatCount="indefinite"
            ></animate>
          </rect>
        </g>
      </svg>
    </LoaderContainer>
  );
};

const LoaderContainer = styled.div`
  width: 100%;
  height: 100%;
  text-align: center;
  font-family: inherit;

  h3 {
    color: ${colors.textColor};
  }
`;

export default Loader;
