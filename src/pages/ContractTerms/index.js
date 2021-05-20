import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { ContractTermsContainer } from "./styles";
export function ContractTerms() {
  const [terms, setTerms] = useState("");

  return (
    <ContractTermsContainer>
      <div className="empty-container seuphone-background"></div>
      <div className="container p-5">
        <form className="bg-light p-5 mx-auto">
          <h1 className="py-2 text-uppercase">Termos de aceitação</h1>

          <div className="terms">
            <div>
              Leia atentamente antes de usar este site: Os seguintes termos de
              serviço ("Termos de Serviço") regem o uso do site SeuPhone (o
              “Site”) e o SeuPhone baseado na web, integração de aplicativos e
              dados serviço de ligação acessado através do Site (“Serviço”),
              ambos os quais são operado pela SeuPhone LTD. (“SeuPhone”). Usando
              o Site e / ou o Serviço, você concorda irrevogavelmente que tal
              uso está sujeito a estes Termos de Serviço. Se você não concordar
              com estes Termos de Serviço, você não pode usar o Site ou o
              Serviço. Se você estiver celebrando estes Termos de Serviço em
              nome de uma entidade, você declara que tem autoridade real para
              vincular tal entidade a estes Termos de Serviço. SeuPhone reserva
              expressamente o direito de modificar os Termos de Serviço a
              qualquer momento em seu próprio discrição, e sem aviso prévio,
              incluindo tal alteração e / ou modificação nestes Termos de
              Serviço, juntamente com um aviso do data efetiva de tais Termos de
              Serviço modificados. Qualquer uso continuado por você do Site ou
              do Serviço após a publicação de tais Termos modificados de O
              serviço deve ser considerado como uma indicação de seu acordo
              irrevogável com tal Termos de Serviço modificados. Assim, se em
              algum momento você não concordar com estar sujeito a quaisquer
              Termos de Serviço modificados, você não pode mais usar o Site ou
              serviço.
            </div>

            <h3>1. Serviço Oferecido</h3>
            <div>
              SeuPhone é um provedor de serviços técnicos na área de aplicação
              rápida desenvolvimento na Internet. Para este efeito, SeuPhone
              desenvolveu um Serviço, que pode ser acessado por você na Internet
              para iniciar a construção Aplicativos da web. A funcionalidade
              importante do Serviço é criar aplicativo combinando serviços do
              Site e APIs de terceiros. The SeuPhone site, o software e a
              documentação serão consultados coletivamente como a plataforma
              SeuPhone.
            </div>

            <h3>2. Contas de Usuário, Senhas e Taxas</h3>
            <div>
              (a) Registro da conta e licença de uso: Para acessar e usar todos
              dos recursos do Serviço, você deve abrir uma conta (“Usuário Conta
              ”) registrando-se no SeuPhone. Quando você se registra para o seu
              usuário Conta você deve fornecer informações verdadeiras,
              precisas, atuais e completas (“Perfil de usuário”), e você
              concorda em atualizar as informações da conta para para garantir
              que seja atual. Mediante registro adequado e abertura de um Conta
              de usuário, e sujeito a todos os termos e condições destes Termos
              de Serviço, SeuPhone concede a você o pessoal, direito
              intransferível e licença para usar o Serviço, exclusivamente para
              você fins comerciais internos, até que você ou SeuPhone decidir
              rescindir tal direito de acordo com estes Termos e Condições
              <br />
              <br />
              (b) Elegibilidade: Como uma condição expressa de permissão para
              abrir um Usuário Conta, você representa e garante que (i) tem a
              capacidade legal (incluindo, sem limitação, ter idade suficiente)
              para entrar em contratos ao abrigo da lei da jurisdição em que
              reside.
              <br />
              <br />
              (c) Senhas: Após o registro no Site, você fornecerá SeuPhone com
              uma senha para acessar sua conta. Você é responsável por mantendo
              a confidencialidade de sua senha e de todos os seus atividades e
              de terceiros que ocorram por meio de sua conta, seja ou não
              autorizado por você. Você concorda em notificar imediatamente o
              SeuPhone de qualquer uso não autorizado, suspeito ou real, de sua
              conta de usuário. Você concorda que SeuPhone não será, em nenhuma
              circunstância, responsável por qualquer custo, perda, danos ou
              despesas decorrentes de uma falha sua em mantenha a segurança de
              sua senha.
            </div>

            <h3>3. Site Content</h3>
            <div>
              (a) Conteúdo SeuPhone: Exceto quando indicado de outra forma, as
              informações, materiais (incluindo, sem limitação, HTML, texto,
              áudio, vídeo, branco papéis, comunicados de imprensa, folhas de
              dados, descrições de produtos, software e FAQs e outros conteúdos)
              disponíveis no Site e / ou no Serviço (coletivamente, "SeuPhone
              Content") são obras protegidas por direitos autorais de SeuPhone e
              seus licenciadores, e SeuPhone e seus licenciados expressamente
              retêm todos título e interesse corretos no e para o Conteúdo
              SeuPhone, incluindo, sem limitação, todos os direitos de
              propriedade intelectual neles e nos mesmos. Exceto conforme
              expressamente permitido nestes Termos de Serviço, qualquer uso do
              O Conteúdo SeuPhone pode violar direitos autorais e / ou outras
              leis aplicáveis.
              <br />
              <br />
              (b) Conteúdo de terceiros: Além do conteúdo do SeuPhone, o site e
              / ou o Serviço pode conter informações e materiais fornecidos ao
              SeuPhone por terceiros (coletivamente, “Conteúdo de terceiros”).
              Conteúdo de terceiros é a obra protegida por direitos autorais de
              seu proprietário, que expressamente retém todos os direitos título
              e interesse no e para o Conteúdo de terceiros, incluindo, sem
              limitação, todos os direitos de propriedade intelectual neles e
              nos mesmos. No além de estar sujeito a estes Termos de Serviço,
              Conteúdo de Terceiros também podem estar sujeitos a termos de uso
              diferentes e / ou adicionais e / ou políticas de privacidade de
              tais terceiros. Entre em contato com o apropriado terceiros para
              obter mais informações sobre tais diferentes e / ou termos de uso
              adicionais aplicáveis ​​ao Conteúdo de Terceiros.
              <br />
              <br />
              (c) Licença limitada de conteúdo do site: SeuPhone concede a você
              a licença limitada, direito revogável, intransferível e não
              exclusivo de uso do SeuPhone Conteúdo e conteúdo de terceiros
              (coletivamente, "Conteúdo do site") por exibir o conteúdo do site
              em seu computador e fazer o download e imprimir páginas do Site
              contendo Conteúdo do Site, sob a condição de (i) tal atividade é
              exclusivamente para seu uso pessoal, educacional ou outro uso não
              comercial, (ii) você não modifica ou prepara trabalhos derivados
              de o Conteúdo do Site, (iii) você não obscurece, altera ou remove
              qualquer aviso de direitos autorais estabelecidos em quaisquer
              páginas do site ou conteúdo do site, (iv) você não de outra forma,
              reproduzir, redistribuir ou exibir publicamente qualquer parte do
              Site Conteúdo e (v) você não copia nenhum Conteúdo do Site para
              qualquer outra mídia ou outro formato de armazenamento
            </div>
          </div>

          <div className="mt-5 mb-3">
            <h5>Você está de acordo com os termos de aceitação?</h5>
            <Form.Check
              inline
              label="Sim, eu estou de acordo."
              name="group1"
              type="radio"
              id="inline-radio-1"
              value="yes"
              onClick={(event) => setTerms(event.target.value)}
            />
            <Form.Check
              inline
              label="Não, eu não estou de acordo."
              name="group1"
              type="radio"
              id="inline-radio-2"
              value="no"
              onClick={(event) => setTerms(event.target.value)}
            />
            <br />
            <br />
            <Link to="/cart-payment">
              <button
                disabled={terms === "yes" ? false : true}
                type="button"
                className="btn btn-seuphone-outline-black btn-rounded-seuphone"
              >
                Ir para próximo passo
              </button>
            </Link>
          </div>
        </form>
      </div>
    </ContractTermsContainer>
  );
}
