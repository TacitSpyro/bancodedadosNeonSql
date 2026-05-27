import { useContext } from "react";
import { EstoqueContext } from "../context/EstoqueContext";

export default function TabelaProdutos(){
    const  {produtos, removerProduto} = useContext(EstoqueContext);

    return(
        <table>
            <head>
                <tr>
                    <th>Nome</th>
                    <th>Quantidade</th>
                    <th>Preço</th>
                    <th>Ações</th>
                </tr>
            </head>
            <tbody>
                {produtos.map((p) => 
                    <tr key={p.id}>
                        <td>{p.nome}</td>
                        <td>{p.quantidade}</td>
                        <td>R$ {p.preco}</td>
                        <td>
                            <button onClick={() => removerProduto(p.id)}>Excluir</button>
                        </td>
                    </tr>
                )}
            </tbody>
        </table>
    )
}