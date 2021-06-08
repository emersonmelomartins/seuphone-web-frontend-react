/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { MdModeEdit, MdDeleteForever, MdAddCircle } from "react-icons/md";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useLoading } from "../../../hooks/useLoading";
import { DeleteProvider, GetAllProviders } from "../../../services/providerService/index";
import { ButtonCreate, Provider } from "../styles";
import confirmService from "../../../components/confirmDialog";


export function ProvidersTab() {
  const [providers, setProviders] = useState([]);
  const { setLoading } = useLoading();

  useEffect(() => {
    _getAllProviders();
  }, []);

  const _getAllProviders = () => {
    setLoading(true);
    GetAllProviders().then(
      (resp) => {
        setProviders(resp.data);
        setLoading(false);
      },
      (error) => {
        setLoading(false);
        try {
          const erro = error.response.data;
          if (erro !== undefined) {
            if (typeof erro.errors === 'object') {
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
      }
    );
  };

  const showDeleteDialog = async (id) => {
    let props = {}

    const result = await confirmService.show(props);
    if (result) {
      DeleteProvider(id).then(
        (data) => {
          toast.success("Fornecedor deletado com sucesso!");
          let tbl = providers.filter(
            (c) => !(c.id === id)
          );
          setProviders(tbl);
        },
        (error) => {
          toast.error("Não foi possível deletar os dados.");
        }
      );
    }
  };

  return (
    <>
    <h5>Fornecedores</h5>
      <ButtonCreate>
        <div className="div-button">
          <Link to="/panel/create-provider">
            <Button className="button-create-provider" variant="outline-dark">
              <MdAddCircle className="icon-button" size={20} /> Adicionar Fornecedor
          </Button>
          </Link>
        </div>
      </ ButtonCreate>
      {providers.length >= 1 ? (
        <Provider>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome Fornecedor</th>
              <th>CNPJ</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {providers.map((data, index) =>

            (
              <tr key={index}>
                <td>{data.id}</td>
                <td>
                  {data.companyName}
                </td>
                <td>{data.cnpj}</td>
                <td>
                  <Link to={"/panel/update-provider/" + data.id}>
                    <button type="button">
                      <MdModeEdit size={20} />
                    </button>
                  </Link>
                </td>
                <td>
                  <button type="button" onClick={() =>
                    showDeleteDialog(data.id)
                  }>
                    <MdDeleteForever size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </Provider>
      ) : (
        <p>Não há fornecedores cadastrados.</p>
      )}
    </>
  );
}
