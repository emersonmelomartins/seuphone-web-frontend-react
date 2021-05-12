import React from "react";
import { PuffLoader } from 'react-spinners';
import { LoadingContainer } from "./styles";


export default function Loading({loading}) {

  return (
    <>
      {loading ? (
        <LoadingContainer>
          <PuffLoader color={'#fff'} loading={loading} size={300} />
        </LoadingContainer>
      ) : null}
    </>
  );
}
