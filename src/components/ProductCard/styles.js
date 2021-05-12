import styled from 'styled-components';

export const ProductCardContainer = styled.div`

  .panel-body a {
    text-align: left; 
    color: #222
  }

  .panel-body p:first-of-type, .panel-body p:first-of-type + p {
    color: rgb(146, 146, 146);
    font-size: 12px;
    line-height: 8px;
  }

  .panel-body a:last-child {
    color: #222; 
    font-size: 14px;
    text-align: center;
  }

`;