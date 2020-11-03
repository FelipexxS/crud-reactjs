import React from 'react';

const UserTable = (props) => {
    const { list, loadHandler, removeHandler } = props;
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
                {renderRows()}
            </tbody>
        </table>
    )

    function renderRows () {
        return list.map(user => {
            return (
                <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>
                        <button className="btn btn-warning" style={{'border-radius': '8px'}}
                            onClick={() => loadHandler(user)}>
                            <i className="fa fa-pencil" />
                        </button>
                        <button className="btn btn-danger ml-2" style={{'border-radius': '8px'}}
                            onClick={() => removeHandler(user)}>
                            <i className="fa fa-trash" />
                        </button>
                    </td>
                </tr>
            );
        })
    }
}



export default UserTable;