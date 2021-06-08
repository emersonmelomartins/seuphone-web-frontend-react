import React from "react";
import aboutImg from '../../assets/img/about.png'
import howWorksImg from '../../assets/img/how_works.png'
import { AboutContainer } from "./styles";

export function About() {
  return (
    <AboutContainer>
      <div className="empty-container seuphone-background"></div>
      <div className="container p-5">
        <form className="bg-light p-5 mx-auto">
          <h1 className="py-2 text-uppercase">Sobre</h1>

          <div className="row d-flex justify-content-center align-items-center">
            <div className="col-sm-8">
          <h5><b>COMO SURGIU</b></h5>
        <p>
          A <b>Seu Phone</b> surgiu com o objetivo de <b>facilitar a aquisição</b> dessa tecnologia que somos tão
          dependentes, o <b>celular</b>, pois nos dias de hoje ele tem sido nosso lazer, nosso hobbie, nossa
          ferramenta de trabalho, em poucas palavras uma parte muito importante das nossas vidas.
        </p>
        <p>
          E sempre que uma nova versão de celular e lançada, todo mundo quer <b>trocar</b> o seu, porém, o preço não
          ajuda muito, ainda mais se tratando de <b>iphones</b>.
        </p>

            </div>
            <div className="col-sm-4">
              <img src={aboutImg} alt="iPhone" style={{borderRadius: '20px', boxShadow: '1px 1px 6px rgba(0,0,0,.25)'}} />
            </div>
          </div>

          <div className="row d-flex justify-content-center align-items-center">
            <div className="col-sm-4">
              <img src={howWorksImg} alt="iPhone" style={{borderRadius: '20px', boxShadow: '1px 1px 6px rgba(0,0,0,.25)'}} />
            </div>

            <div className="col-sm-8">
 <h5><b>NOSSO OBJETIVO</b></h5>
          <p>
            O <b>Leasing</b> seria resumidamente um aluguel, no nosso caso esse aluguel seria uma <b>locação de
              iphones</b>, é um contrato onde o cliente recebe um iphone a escolha dele por um determinado tempo já
            estabelecido por nós, no caso dois anos.
          </p>
          <p>
            O diferencial no funcionamento do <b>leasing</b> seria que no final desse contrato, o cliente tem a opção de
            devolver o iphone ou até mesmo adquirir no final, levando em conta que o aparelho deverá estar em <b>boas
              condições</b> caso decida devolvê-lo.
          </p>
            </div>
          </div>

         


        </form>
      </div>
    </AboutContainer>
  );
}
