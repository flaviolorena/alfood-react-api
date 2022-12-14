import {
	Button,
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	TextField,
	Typography
} from '@mui/material';
import { Box } from '@mui/system';
import { useEffect, useState } from 'react';
import http from '../../../http';
import IRestaurante from '../../../interfaces/IRestaurante';
import ITag from '../../../interfaces/ITag';

const FormularioPrato = () => {
	const [nomePrato, setNomePrato] = useState('');
	const [descricao, setDescricao] = useState('');

	const [tag, setTag] = useState('');
	const [tags, setTags] = useState<ITag[]>([]);

	const [restaurante, setRestaurante] = useState('');
	const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([]);

	const [imagem, setImagem] = useState<File | null>(null)
	const selecionarArquivo = (evento: React.ChangeEvent<HTMLInputElement>) =>{
		if(evento.target.files?.length){
			setImagem(evento.target.files[0])
		}else{
			setImagem(null)

		}
	}

	useEffect(() => {
		http
			.get<{ tags: ITag[] }>('tags/')
			.then((response) => setTags(response.data.tags));
	}, []);
	useEffect(() => {
		http
			.get('restaurantes/')
			.then((response) => setRestaurantes(response.data));
	}, []);

	const aoSubmeterForm = (evento: React.FormEvent<HTMLFormElement>) => {
		evento.preventDefault();
		const formData = new FormData()
		formData.append('nome', nomePrato)
		formData.append('descricao', descricao)
		formData.append('tag', tag)
		formData.append('restaurante', restaurante)
		if(imagem){
			formData.append('imagem', imagem)
		}
		http.request({
			url: 'pratos/',
			method: 'POST',
			headers:{
				'Content-Type': 'multipart/form-data'
			},
			data: formData
		})
		.then(() => {
			setNomePrato('')
			setTag('')
			setRestaurante('')
			setDescricao('')
			alert('prato cadastrado')
		})
		.catch(erro => console.log(erro))
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
					Formulario de Pratos
				</Typography>
				<Box component='form' sx={{ width: '100%' }} onSubmit={aoSubmeterForm}>
					<TextField
						id='standard-basic'
						value={nomePrato}
						onChange={(evento) => setNomePrato(evento.target.value)}
						label='Nome do prato'
						variant='standard'
						fullWidth
						required
						margin='dense'
					/>
					<TextField
						id='standard-basic'
						value={descricao}
						onChange={(evento) => setDescricao(evento.target.value)}
						label='Descri????o do prato'
						variant='standard'
						fullWidth
						required
						margin='dense'
					/>

					<FormControl margin='dense' fullWidth>
						<InputLabel id='select-tag'>Tag</InputLabel>
						<Select
							labelId='select-tag'
							value={tag}
							onChange={(evento) => setTag(evento.target.value)}
						>
							{tags.map((tag) => (
								<MenuItem value={tag.value} key={tag.id}>
									{tag.value}
								</MenuItem>
							))}
						</Select>
					</FormControl>

					<FormControl margin='dense' fullWidth>
						<InputLabel id='select-restaurante'>Restaurante</InputLabel>
						<Select labelId='select-restaurante' value={restaurante} onChange={evento => setRestaurante(evento.target.value)}
						>
							{restaurantes.map(restaurante => <MenuItem value={restaurante.id} key={restaurante.id}>{restaurante.nome}</MenuItem>)}
						</Select>
					</FormControl>

					<input type='file' onChange={selecionarArquivo}/>
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

export default FormularioPrato;
