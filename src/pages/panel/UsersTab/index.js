/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { MdModeEdit, MdDeleteForever, MdAddCircle } from "react-icons/md";
import { toast } from "react-toastify";
import { useLoading } from "../../../hooks/useLoading";
import { GetAllUsers } from "../../../services/userService";
import { ButtonCreate, Users } from "../styles";
import { CreateUserForm } from "./CreateUserForm";

export function UsersTab() {
  const [users, setUsers] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const { setLoading } = useLoading();

  useEffect(() => {
    _getAllUsers();
  }, []);

  const _getAllUsers = () => {
    setLoading(true);
    GetAllUsers().then(
      (resp) => {
        const updatedData = resp.data.map((item) => {
          let hasAdmin = false;
          item.userRoles.forEach(data => {
            if (data.role.roleName === "ROLE_ADMIN") {
              hasAdmin = true;
            }
          });

          return { ...item, hasAdmin };

        });
        setUsers(updatedData);
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
      }
    );
  };

  // const showDeleteDialog = async (idUser) => {
  //   let props = {
  //     title: "Confirmação",
  //     message: "Deseja realmente excluir este registro?",
  //   };

  //   const result = await confirmService.show(props);
  //   if (result) {
  //     DeleteInstallationAreaWorkCenter(idUser).then(
  //       (data) => {
  //         toast.success("Usuário deletado com sucesso!");

  //         let tbl = users.filter(
  //           (c) =>
  //             !(
  //               c.idUser === idUser
  //             )
  //         );

  //         setUsers(tbl);
  //       },
  //       (error) => {
  //         toast.error("Não foi possível deletar os dados.");
  //       }
  //     );
  //   }
  // };

  return (
    <>
      <ButtonCreate>
        <div className="div-button">
          <Button className="button-create" variant="outline-dark" onClick={() => setModalShow(true)}>
            <MdAddCircle className="icon-button" size={20} /> Criar Usuário
      </Button>
          <CreateUserForm
            show={modalShow}
            onHide={() => setModalShow(false)}
          />
        </div>
      </ ButtonCreate>
      {users.length >= 1 ? (
        <Users>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Email</th>
              <th>CPF</th>
              <th>Gênero</th>
              <th>Tipo Usuário</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {users.map((data, index) => (
              <tr key={index}> 
                <td>{data.id}</td>
                <td>
                  <span>{data.name}</span>
                </td>
                <td>{data.email}</td>
                <td>{data.cpf}</td>
                <td>
                  <strong>{data.genre}</strong>
                </td>
                <td>{data.hasAdmin === true ? "Admin" : "Cliente"}</td>
                <td>
                  <button type="button">
                    <MdModeEdit size={20} />
                  </button>
                </td>
                <td>
                  <button type="button">
                    <MdDeleteForever size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </Users>
      ) : (
        <p>Não há Usuários.</p>
      )}
    </>
  );
}
