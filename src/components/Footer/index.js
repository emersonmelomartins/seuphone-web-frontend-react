import React from 'react';
import { FooterContainer } from './styles';

export function Footer() {
  return (
    <FooterContainer>
      <footer className="bg-dark text-light seuphone-background text-center text-lg-start mt-5">
        <div className="container p-4">
          <div className="row">
            <div
              className="col-lg-4 col-md-12 mb-4 mb-md-0"
              style={{ textAlign: 'left' }}
            >
              <h5 className="text-uppercase mb-3">Sobre a empresa</h5>

              <p style={{ textAlign: 'left' }}>
                A Seu Phone surgiu com o objetivo de facilitar a aquisição dessa
                tecnologia que somos tão dependentes, o celular, hoje ele tem
                sido nossa ferramenta de trabalho, em poucas palavras uma parte
                muito importante das nossas vidas.
              </p>
            </div>
            <div className="col-lg-4 col-md-6 mb-4 mb-md-0">
              <h5 className="text-uppercase mb-3">Links</h5>

              <ul className="list-unstyled mb-0">
                <li>
                  <a href="#!" className="text-light">
                    Home
                  </a>
                </li>
                <li>
                  <a href="#!" className="text-light">
                    Produtos
                  </a>
                </li>
                <li>
                  <a href="#!" className="text-light">
                    Sobre
                  </a>
                </li>
                <li>
                  <a href="#!" className="text-light">
                    Contato
                  </a>
                </li>
              </ul>
            </div>
            <div className="col-lg-4 col-md-6 mb-4 mb-md-0">
              <h5 className="text-uppercase mb-3">Localização</h5>

              <iframe
                title="map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3654.4020670091854!2d-46.53172074892907!3d-23.66157537111153!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce42890ae627ef%3A0x934856e70030c41a!2sFAPEN%20-%20Faculdade%20Pent%C3%A1gono!5e0!3m2!1spt-BR!2sbr!4v1570217487451!5m2!1spt-BR!2sbr"
                width="200"
                height="200"
                frameBorder="0"
                style={{ border: 0 }}
                allowFullScreen=""
              ></iframe>
            </div>
          </div>
        </div>
        <div
          className="text-center p-3"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}
        >
          © 2021 - Seuphone - Alguns direitos reservados.
        </div>
      </footer>
    </FooterContainer>
  );
}
