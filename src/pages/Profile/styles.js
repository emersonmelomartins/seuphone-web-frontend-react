import styled from "styled-components";

export const ProfileContainer = styled.div`
  div form {
    border-radius: 10px;
    box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.175);
  }

  .nav-item a {
    padding: 13px;
  }
  .nav-item .active {
    background-color: #222 !important;

    &:hover {
      background-color: #2e2e2e !important;
      color: #fff;
    }
  }

  .nav-item a {
    color: #222;

    &:hover {
      color: gray;
    }
  }
`;

export const Orders = styled.table`
  width: 100%;
  text-align: center;

  thead th {
    color: #999;
    padding: 10px;
  }

  tbody td {
    padding: 15px;
    border-bottom: 1px solid #eee;
  }

  tbody tr {
    border-radius: 4px;
    transition: background-color 0.2s;

    &:hover {
      background-color: #eee;
    }
  }

  span {
    display: block;
    margin-top: 5px;
    font-weight: bold;
  }

  button {
    background: none;
    cursor: pointer;
    border: 0;
    padding: 10px;
    background-color: #eee;
    border-radius: 5px;
    transition: filter 0.2s;

    &:hover {
      filter: brightness(0.9);
    }
    svg {
      color: #ff6961 !important;
      transition: color 0.2s;
    }
  }
`;
