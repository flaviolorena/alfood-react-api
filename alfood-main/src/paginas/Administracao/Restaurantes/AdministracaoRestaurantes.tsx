import {
	Button, Table,
	TableBody,
	TableCell, TableHead,
	TableRow
} from '@mui/material';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import http from '../../../http';
import IRestaurante from '../../../interfaces/IRestaurante';

const AdministracaoRestaurantes = () => {
	const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([]);

	useEffect(() => {
		http
			.get<IRestaurante[]>('restaurantes/')
			.then((resposta) => setRestaurantes(resposta.data));
	}, []);

  const excluir = (restauranteExcluido: IRestaurante) =>{
    http.delete(`restaurantes/${restauranteExcluido.id}/`).then(() => {
      const listaRestaurante = restaurantes.filter(restaurante => restaurante.id !== restauranteExcluido.id )
      setRestaurantes([...listaRestaurante])
    })
  }

	return (
			<Table>
				<TableHead>
					<TableRow>
						<TableCell>Nome</TableCell> 
            <TableCell>Editar</TableCell>
						<TableCell>Excluir</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{restaurantes.map((restaurante) => (
						<TableRow key={restaurante.id}>
							<TableCell>{restaurante.nome}</TableCell>
							<TableCell>
								<Link to={`/admin/restaurantes/${restaurante.id}`}> <Button variant="outlined" >Editar</Button></Link>
							</TableCell>
              <TableCell>
                <Button variant="outlined" color="error" onClick={() => excluir(restaurante)} >Excluir</Button>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
	);
};

export default AdministracaoRestaurantes;
