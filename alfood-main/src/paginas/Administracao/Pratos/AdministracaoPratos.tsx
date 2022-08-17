import {
  Button, Table,
  TableBody,
  TableCell, TableHead,
  TableRow
} from '@mui/material';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import http from '../../../http';
import IPrato from '../../../interfaces/IPrato';

const AdministracaoPratos = () => {
	const [pratos, setPratos] = useState<IPrato[]>([]);

	useEffect(() => {
		http
			.get<IPrato[]>('pratos/')
			.then((resposta) => setPratos(resposta.data));
	}, []);

  const excluir = (pratoExcluido: IPrato) =>{
    http.delete(`pratos/${pratoExcluido.id}/`).then(() => {
      const listaPrato = pratos.filter(prato => prato.id !== pratoExcluido.id )
      setPratos([...listaPrato])
    })
  }

	return (
			<Table>
				<TableHead>
					<TableRow>
						<TableCell>Nome</TableCell> 
						<TableCell>Tag</TableCell> 
						<TableCell>Imagem</TableCell> 
            <TableCell>Editar</TableCell>
						<TableCell>Excluir</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{pratos.map((prato) => (
						<TableRow key={prato.id}>
							<TableCell>{prato.nome}</TableCell>
							<TableCell>{prato.tag}</TableCell>
							<TableCell> [<a href={prato.imagem} target="blank"  rel='noreferrer' > ver imagem</a> ]</TableCell>
							<TableCell>
								<Link to={`/admin/pratos/${prato.id}`}> <Button variant="outlined" >Editar</Button></Link>
							</TableCell>
              <TableCell>
                <Button variant="outlined" color="error" onClick={() => excluir(prato)} >Excluir</Button>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
	);
};

export default AdministracaoPratos;
