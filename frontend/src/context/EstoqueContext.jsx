import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const EstoqueContext = createContext();

export function EstoqueProvider({children}){
    const [produtos, setProdutos] = useState([]);

    const API = "http://localhost:5000/api/produtos";


    const buscarProduto = async() => {
        const res = await axios.get(API);
        setProdutos(res, data);
    }
    const adicionarProdutos = async(produto) => {
        await axios.post(API, produto);
        buscarProduto();
    }
    const atualizarProduto = async(id, produto) => {
        await axios.put(`${API}/${id}`, produto);
        buscarProduto();
    }
    const removerProduto = async(id) => {
        await axios.delete(`${API}/${id}`)
    }
    useEffect(() => {
        buscarProduto();
    }, []);
    return(
        <EstoqueContext.Provider
            value={{
                produtos,
            }}
        >
            {children}
        </EstoqueContext.Provider>
    )
}