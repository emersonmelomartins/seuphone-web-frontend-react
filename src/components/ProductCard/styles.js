import styled from 'styled-components';

export const ProductCardContainer = styled.div`


  width: 14.2rem;
  box-shadow: 1px 1px 6px rgba(0, 0, 0, 0.25);
  margin-right: 15px;
  border-radius: 10px;


 img {
  width: 150px;
  display: block;
  text-align: center;
  margin: 10px auto 0;
}

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