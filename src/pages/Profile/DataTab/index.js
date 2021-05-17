import React from "react";

export function DataTab({ userInfo }) {
  return (
    <>
      <div className="form-row">
        <div className="form-group col-md-6">
          <label htmlFor="input-email">E-mail</label>
          <input
            disabled
            type="email"
            className="form-control"
            id="input-email"
            value={userInfo.email}
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group col-md-6">
          <label htmlFor="input-name">Nome Completo</label>
          <input
            disabled
            type="text"
            className="form-control"
            id="input-name"
            value={userInfo.name}
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group col-md-4">
          <label htmlFor="input-genre">Sexo</label>
          <select
            id="input-genre"
            className="form-control"
            disabled
            value={userInfo.genre}
          >
            <option value="">Selecione o sexo...</option>
            <option value="M">Masculino</option>
            <option value="F">Feminino</option>
            <option value="X">Prefiro não informar</option>
          </select>
        </div>
      </div>

      <div className="form-row">
        <div className="form-group col-md-4">
          <label htmlFor="input-cpf">CPF</label>
          <input
            disabled
            type="text"
            className="form-control"
            id="input-cpf"
            value={userInfo.cpf}
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group col-md-4">
          <label htmlFor="input-date">Data de Nascimento</label>
          <input
            disabled
            value={userInfo.birthDate}
            type="text"
            className="form-control"
            id="input-date"
          />
        </div>
      </div>
    </>
  );
}
