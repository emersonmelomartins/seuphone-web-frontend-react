import { createGlobalStyle } from "styled-components";
import 'react-toastify/dist/ReactToastify.css';

export const GlobalStyle = createGlobalStyle`

ul {
  list-style: none;
}

.empty-container {
  height: 150px;
  width: 100%;
  position: absolute;
  z-index: -999;
}


.seuphone-background {
  background-color: #222 !important;
  color: #fff !important;
}

.btn-search {
    border: 0;
    background: transparent;
    transition: filter 0.2s;
}

.btn {
  transition: ease all 0.2s;
}

.btn-rounded-seuphone {
  border-radius: 20px;
}

.btn-seuphone-outline-white {
  background-color: transparent;
  color: rgba(255, 255, 255, 0.7);
  border: 1px solid rgba(255, 255, 255, 0.7);
}

.btn-seuphone-outline-white:hover {
  color: #000;
  background-color: rgba(255, 255, 255, 1);
  border: 1px solid rgba(255, 255, 255, 1);
}
.btn-seuphone-outline-black {
  background-color: transparent;
  color: rgba(0, 0, 0, 0.7);
  border: 1px solid rgba(0, 0, 0, 0.7);
}

.btn-seuphone-outline-black:hover {
  color: rgba(255, 255, 255, 1) !important;
  background-color: rgba(0, 0, 0, 1);
  border: 1px solid rgba(0, 0, 0, 1);
}

.navbar-toggler {
  margin-bottom: 3px;
  border: none;
}

.form-inline .form-control {
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  border-top-left-radius: 20px;
  border-bottom-left-radius: 20px;
}

.form-inline .btn {
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  border-top-right-radius: 20px;
  border-bottom-right-radius: 20px;
}

input.form-control,
select.form-control {
  border-radius: 20px;
}

.navbar {
  padding: 1rem;
}

.main-menu {
  position: relative;
  z-index: 3;
}

.search-bar {
  position: relative;
  z-index: 2;
  box-shadow: 0px 2px 15px 0px rgba(0, 0, 0, 0.1);
}

.search-bar .form-control {
  width: calc(100% - 45px);
}

.custom-file-label::after {
  content: "Procurar";
  border-top-right-radius: 20px;
  border-bottom-right-radius: 20px;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
}

.custom-file-label {
  border-radius: 20px;
}

/*products in home*/
.product-card {
  width: 14.2rem;
  box-shadow: 0px 2px 15px 0px rgba(0, 0, 0, 0.1);
  margin-right: 5.3px;
  margin-bottom: 5px;
}

.product-card img {
  width: 150px;
  display: block;
  text-align: center;
  margin: 10px auto 0;
}

/*contract in home*/
.contract-container > div {
  box-shadow: 0px 2px 15px 0px rgba(0, 0, 0, 0.1);
  border-radius: 0.25rem;
}

/*product table*/
.table {
  width: 100%;
  border-spacing: 0 0.5rem;
}
.table thead th {
  border: 0;
  color: #868686;
}
.table td {
  padding: 1rem;
  border-top: 2px solid #fff;
  border-radius: 0.25rem;
  line-height: 35px;
}

/* Small devices (landscape phones, 576px and up) */
@media (max-width: 768px) {
  .form-inline .form-control,
  .form-inline button {
    display: none;
  }

  .products-container div {
    justify-content: center !important;
  }
}

/* Medium devices (tablets, 768px and up) */
@media (min-width: 768px) {
  .form-inline .form-control {
    width: 210px;
  }

  .product-card {
    width: 14rem;
    margin-right: 6px;
    margin-bottom: 6px;
  }
}

/* Large devices (desktops, 992px and up) */
@media (min-width: 992px) {
  .form-inline .form-control {
    width: 440px;
  }
}

/* Extra large devices (large desktops, 1200px and up) */
@media (min-width: 1200px) {
  .form-inline .form-control {
    width: 600px;
  }

  .product-card {
    width: 15rem;
    margin-right: 37px;
    margin-bottom: 25px;
  }

  /*contract in home*/
  .contract-image {
    text-align: left !important;
  }
}

`;