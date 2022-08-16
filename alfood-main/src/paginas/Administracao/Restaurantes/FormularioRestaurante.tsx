import { Button, TextField } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import IRestaurante from '../../../interfaces/IRestaurante';

const FormularioRestaurante = () => {
	const parametros = useParams();

	useEffect(() => {
    if(parametros.id){
      axios.get<IRestaurante>(`http://0.0.0.0:8000/api/v2/restaurantes/${parametros.id}/`)
        .then(resposta => setNomeRestaurante(resposta.data.nome))
    }
  }, [parametros]);
	const [nomeRestaurante, setNomeRestaurante] = useState('');

	const aoSubmeterForm = (evento: React.FormEvent<HTMLFormElement>) => {
		evento.preventDefault();

    if(parametros.id){
      axios
      .put(`http://0.0.0.0:8000/api/v2/restaurantes/${parametros.id}/`, {
        nome: nomeRestaurante,
      })
      .then(() => console.log('restaurante atualizado'));
    }else{

      //faz o envio para /restaurantes, seguido do conteudo a ser enviado
      axios
        .post('http://0.0.0.0:8000/api/v2/restaurantes/', {
          nome: nomeRestaurante,
        })
        .then(() => console.log('restaurante postado'));
    }
	};

	return (
		<form onSubmit={aoSubmeterForm}>
			<TextField
				id="standard-basic"
				value={nomeRestaurante}
				onChange={(evento) => setNomeRestaurante(evento.target.value)}
				label="Nome do restaurante"
				variant="standard"
			/>
			<Button type="submit" variant="outlined">
				Salvar
			</Button>
		</form>
	);
};

export default FormularioRestaurante;
