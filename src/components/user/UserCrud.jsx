import React, { Component } from 'react';
import axios from 'axios';

import Main from '../template/Main';
import { Api } from '../../services/globalVariables';

// Refactor later! UserTable and UserForm

const HeaderProps = {
    icon: 'users',
    title: 'Usuários',
    subtitle: 'Cadastro de usuários: Incluir, Listar, Alterar e Excluir.'
}

const initialState = {
    user: { name: '', email: '' },
    list: []
}

export default class UserCrud extends Component {
    constructor() {
        super();
        this.state = { ...initialState }
    }

    componentDidMount() {
        axios(`${Api}users`).then(resp => {
            this.setState({ list: resp.data });
        });
    }

    clear = () => {
        this.setState({ user: initialState.user });
    }

    save = () => {
        const user = this.state.user;
        const method = user.id ? 'put' : 'post';
        const url = user.id ? `${Api}users/${user.id}` : `${Api}users`;
        axios[method](url, user)
            .then(resp => {
                const list = this.getUpdatedList(resp.data, false);
                this.setState({ user: initialState.user, list });
            });
    }

    getUpdatedList = (user, isDeleted = false) => {
        // Removing the current user of the list
        const list = this.state.list.filter(u => u.id !== user.id);
        // Placing the current user at the top of the list
        if (!isDeleted) list.unshift(user);
        return list.sort();
    }

    updateField = (e) => {
        const user = { ...this.state.user };
        user[e.target.name] = e.target.value;
        this.setState({ user });
    }

    renderForm() {
        const { user } = this.state;
        return (
            <div className="form">
                <div className="row">
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label htmlFor="name">Nome</label>
                            <input type="text" className="form-control"
                                name="name"
                                value={user.name}
                                onChange={e => this.updateField(e)}
                                placeholder="Digite o seu nome..." />
                        </div>
                    </div>

                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label htmlFor="email">E-mail</label>
                            <input type="text" className="form-control"
                                name="email"
                                value={user.email}
                                onChange={e => this.updateField(e)}
                                placeholder="Digite o e-mail..." />
                        </div>
                    </div>
                </div>

                <hr />
                <div className="row">
                    <div className="col-12 d-flex justify-content-end">
                        <button className="btn btn-primary"
                            onClick={e => this.save(e)}>
                            Salvar
                        </button>

                        <button className="btn btn-secondary ml-2"
                            onClick={e => this.clear(e)}>
                            Cancelar
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    load = (user) => {
        this.setState({ user });
    }

    remove = (user) => {
        axios.delete(`${Api}users/${user.id}`).then(resp => {
            const list = this.getUpdatedList(user, true);
            this.setState({ list });
        });
    }

    renderTable = () => {
        return (
            <table className="table mt-4">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>E-mail</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {this.renderRows()}
                </tbody>
            </table>
        )
    }

    renderRows = () => {
        const { list } = this.state;
        return list.map(user => {
            return (
                <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>
                        <button className="btn btn-warning" style={{'border-radius': '8px'}}
                            onClick={() => this.load(user)}>
                            <i className="fa fa-pencil" />
                        </button>
                        <button className="btn btn-danger ml-2" style={{'border-radius': '8px'}}
                            onClick={() => this.remove(user)}>
                            <i className="fa fa-trash" />
                        </button>
                    </td>
                </tr>
            );
        })
    }

    render() {
        return (
            <Main {...HeaderProps}>
                {this.renderForm()}
                {this.renderTable()}
            </Main>
        )
    }
}