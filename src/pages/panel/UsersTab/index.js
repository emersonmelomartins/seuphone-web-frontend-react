/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { MdModeEdit, MdDeleteForever, MdAddCircle } from "react-icons/md";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useLoading } from "../../../hooks/useLoading";
import { DeleteUser, GetAllUsers } from "../../../services/userService";
import { ButtonCreate, Users } from "../styles";
import confirmService from "../../../components/confirmDialog";

export function UsersTab() {
  const [users, setUsers] = useState([]);
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
      DeleteUser(id).then(
        (data) => {
          toast.success("Usuário deletado com sucesso!");
          let tbl = users.filter(
            (c) =>!(c.id === id)
          );
          setUsers(tbl);
        },
        (error) => {
          toast.error("Não foi possível deletar os dados.");
        }
      );
    }
  };

  return (
    <>
    <h5>Usuários</h5>
      <ButtonCreate>
        <div className="div-button">
          <Link to="/create-user-admin">
            <Button className="button-create" variant="outline-dark" to="/create-user-admin">
              <MdAddCircle className="icon-button" size={20} /> Criar Usuário
            </Button>
          </Link>
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
                  <Link to={"/update-user/" + data.id}>
                    <button>
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
        </Users>
      ) : (
        <p>Não há Usuários.</p>
      )}
    </>
  );
}
