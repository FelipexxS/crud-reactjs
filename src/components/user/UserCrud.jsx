import React, { Component } from 'react';
import axios from 'axios';

import Main from '../template/Main';
import { Api } from '../../services/globalVariables';
import UserForm from './UserForm';
import UserTable from './UserTable';

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

    load = (user) => {
        this.setState({ user });
    }

    remove = (user) => {
        axios.delete(`${Api}users/${user.id}`).then(resp => {
            const list = this.getUpdatedList(user, true);
            this.setState({ list });
        });
    }


    render() {
        return (
            <Main {...HeaderProps}>
                <UserForm 
                user={this.state.user} 
                inputHandler={this.updateField}
                saveHandler={this.save} 
                cancelHandler={this.clear} />
                <UserTable
                list={this.state.list}
                loadHandler={this.load}
                removeHandler={this.remove} />
            </Main>
        )
    }
}