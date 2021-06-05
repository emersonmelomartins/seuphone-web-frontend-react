import React, { useEffect, useState } from "react";
//import { Link } from "react-router-dom";
import { FaSync, FaTruck, FaShieldAlt, FaMobileAlt } from "react-icons/fa";
import leasingImg from '../../assets/img/using_phone.png'

import introImg from "../../assets/img/intro.png";
import { ProductCard } from "../../components/ProductCard";

import { useLoading } from "../../hooks/useLoading";
import { GetAllProduct } from "../../services/productService";
import { toast } from "react-toastify";

export function Home() {

    const [products, setProducts] = useState([]);

  const { setLoading } = useLoading();

useEffect(() => {
    setLoading(true);

    const obj = {
      limit: 4
    }
    GetAllProduct(obj).then(resp => {
      setProducts(resp.data);
      setLoading(false);
    },
    (error) => {
        setLoading(false);
        try {
          const erro = error.response.data;
          if (erro !== undefined) {
            if(typeof erro.errors === 'object') {
              Object.values(erro.errors).forEach((e) => {
                toast.error(e[0]);
              });
            } else {
              toast.error(erro);
            }
          } else {
            toast.error("Não foi possível carregar os dados.");
          }

        } catch (e) {
          toast.error("Ocorreu um erro interno.");
        }
    });
  }, [setLoading]);

  return (
    <>
      <div className="carousel slide carousel-fade" data-ride="carousel">
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img className="d-block w-100" src={introImg} alt="Primeiro Slide" />
          </div>
        </div>
        <a
          className="carousel-control-prev"
          href="#carouselExampleFade"
          role="button"
          data-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="sr-only">Anterior</span>
        </a>
        <a
          className="carousel-control-next"
          href="#carouselExampleFade"
          role="button"
          data-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="sr-only">Próximo</span>
        </a>
      </div>

      <div className="container my-5">
        <div className="row">
          <div className="col-sm-6 col-md-3">
            <div className="card text-white bg-success mb-3">
              <div className="card-body d-flex flex-column align-items-center justify-content-center">
                <p>
                  <FaSync size="2.5rem" />
                </p>
                <p className="card-text">Garantia no Contrato</p>
              </div>
            </div>
          </div>

          <div className="col-sm-6 col-md-3">
            <div className="card text-white bg-danger mb-3">
              <div className="card-body d-flex flex-column align-items-center justify-content-center">
                <p>
                  <FaTruck size="2.5rem" />
                </p>
                <p className="card-text">Transporte Rápido</p>
              </div>
            </div>
          </div>

          <div className="col-sm-6 col-md-3">
            <div className="card text-white bg-warning mb-3">
              <div className="card-body d-flex flex-column align-items-center justify-content-center">
                <p>
                  <FaShieldAlt size="2.5rem" />
                </p>
                <p className="card-text">Pagamento Seguro</p>
              </div>
            </div>
          </div>

          <div className="col-sm-6 col-md-3">
            <div className="card text-white bg-primary mb-3">
              <div className="card-body d-flex flex-column align-items-center justify-content-center">
                <p>
                  <FaMobileAlt size="2.5rem" />
                </p>
                <p className="card-text">Novos Produtos</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container products-container">
      <h2>Nossos Produtos</h2>

      <div className="d-flex flex-wrap align-items-center justify-content-start">


        {products.map(product => (
          <ProductCard key={product.id} product={product} productQtd={1} />
        ))}

      </div>
    </div>

    <div className="container contract-container mt-5">
      <h2>Entenda a locação</h2>

      <div className="container bg-light">
        <div className="row">
          <div className="col-sm-12 col-md-12 col-lg-6 p-0">
            <div className="contract-image text-center">
              <img src={leasingImg} width="500" alt="" />
            </div>
          </div>

          <div className="col-sm-12 col-md-12 col-lg-6 p-0">
            <div className="px-5 pt-4" style={{textAlign: 'left'}}>
              <h2 className="display-5">Leasing de iPhone</h2>
              <p className="lead">Como funciona?</p>
              <p>
                O <b>Leasing</b> seria resumidamente um aluguel, no nosso caso
                esse aluguel seria uma <b>locação de iphones</b>, é um contrato
                onde o cliente recebe um iphone a escolha dele por um
                determinado tempo já estabelecido por nós, no caso dois anos.
              </p>
              <p className="pt-3">Quer saber mais? <a href="/">clique aqui</a>.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
