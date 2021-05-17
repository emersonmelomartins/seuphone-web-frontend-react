import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useLoading } from "../../../hooks/useLoading";
import { UpdateUserAddress } from "../../../services/userService";

export function AddressTab({ userInfo }) {
  const { register, setValue, handleSubmit } = useForm();

  const { setLoading } = useLoading();

  useEffect(() => {
    setValue("state", userInfo.state);
    setValue("city", userInfo.city);
    setValue("address", userInfo.address);
    setValue("zipCode", userInfo.zipCode);
    setValue("district", userInfo.district);
    setValue("houseNumber", userInfo.houseNumber);
  }, [setValue, userInfo]);

  const onSubmit = (form) => {
    const obj = {
      id: userInfo.id,
      ...form,
    };

    setLoading(true);
    UpdateUserAddress(obj).then(
      (resp) => {
        setLoading(false);
        toast.success("Endereço alterado com sucesso!");
      },
      (error) => {
        setLoading(false);
        try {
          const erro = error.response.data;
          if (erro !== undefined) {
            if (typeof erro.errors === "object") {
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

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-row">
          <div className="form-group col-md-4">
            <label htmlFor="zipCode">CEP</label>
            <input
              type="text"
              className="form-control"
              id="zipCode"
              name="zipCode"
              {...register("zipCode")}
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group col-md-8">
            <label htmlFor="address">Logradouro</label>
            <input
              type="text"
              className="form-control"
              id="address"
              name="address"
              {...register("address")}
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group col-md-4">
            <label htmlFor="district">Bairro</label>
            <input
              type="text"
              className="form-control"
              id="district"
              name="district"
              {...register("district")}
            />
          </div>

          <div className="form-group col-md-4">
            <label htmlFor="houseNumber">Número</label>
            <input
              type="text"
              className="form-control"
              id="houseNumber"
              name="houseNumber"
              {...register("houseNumber")}
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group col-md-4">
            <label htmlFor="state">Estado</label>
            <select
              id="state"
              className="form-control"
              name="state"
              {...register("state")}
            >
              <option value="">Selecione o estado...</option>
              <option value="AC">Acre</option>
              <option value="AL">Alagoas</option>
              <option value="AP">Amapá</option>
              <option value="AM">Amazonas</option>
              <option value="BA">Bahia</option>
              <option value="CE">Ceará</option>
              <option value="DF">Distrito Federal</option>
              <option value="ES">Espírito Santo</option>
              <option value="GO">Goiás</option>
              <option value="MA">Maranhão</option>
              <option value="MT">Mato Grosso</option>
              <option value="MS">Mato Grosso do Sul</option>
              <option value="MG">Minas Gerais</option>
              <option value="PA">Pará</option>
              <option value="PB">Paraíba</option>
              <option value="PR">Paraná</option>
              <option value="PE">Pernambuco</option>
              <option value="PI">Piauí</option>
              <option value="RJ">Rio de Janeiro</option>
              <option value="RN">Rio Grande do Norte</option>
              <option value="RS">Rio Grande do Sul</option>
              <option value="RO">Rondônia</option>
              <option value="RR">Roraima</option>
              <option value="SC">Santa Catarina</option>
              <option value="SP">São Paulo</option>
              <option value="SE">Sergipe</option>
              <option value="TO">Tocantins</option>
            </select>
          </div>

          <div className="form-group col-md-4">
            <label htmlFor="city">Cidade</label>
            <input
              type="text"
              className="form-control"
              id="city"
              name="city"
              {...register("city")}
            />
          </div>
        </div>
        <button
          type="submit"
          className="btn btn-rounded-seuphone btn-seuphone-outline-black"
        >
          <i className="far fa-circle"></i> Atualizar Endereço
        </button>
      </form>
    </>
  );
}
