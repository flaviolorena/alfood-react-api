import { Button, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import http from '../../../http';
import IRestaurante from '../../../interfaces/IRestaurante';

const FormularioRestaurante = () => {
	const parametros = useParams();

	useEffect(() => {
		if (parametros.id) {
			http
				.get<IRestaurante>(`restaurantes/${parametros.id}/`)
				.then((resposta) => setNomeRestaurante(resposta.data.nome));
		}
	}, [parametros]);
	const [nomeRestaurante, setNomeRestaurante] = useState('');

	const aoSubmeterForm = (evento: React.FormEvent<HTMLFormElement>) => {
		evento.preventDefault();

		//se ja existe o parametro de ID, ele vai editar o existente
		if (parametros.id) {
			http
				.put(`/restaurantes/${parametros.id}/`, {
					nome: nomeRestaurante,
				})
				.then(() => console.log('restaurante atualizado'));
		} else {
			//faz o envio para /restaurantes, seguido do conteudo a ser enviado
			http
				.post('/restaurantes/', {
					nome: nomeRestaurante,
				})
				.then(() => console.log('restaurante postado'));
		}
	};

	return (
		<>
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					flexGrow: 1,
				}}
			>
				<Typography component='h1' variant='h6'>
					Formulario de Restaurantes
				</Typography>
				<Box component='form' sx={{ width: '100%' }} onSubmit={aoSubmeterForm}>
					<TextField
						id='standard-basic'
						value={nomeRestaurante}
						onChange={(evento) => setNomeRestaurante(evento.target.value)}
						label='Nome do restaurante'
						variant='standard'
						fullWidth
						required
					/>
					<Button
						sx={{ marginTop: 1 }}
						type='submit'
						variant='outlined'
						fullWidth
					>
						Salvar
					</Button>
				</Box>
			</Box>
		</>
	);
};

export default FormularioRestaurante;
