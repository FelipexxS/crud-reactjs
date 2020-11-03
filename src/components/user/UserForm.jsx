import React from 'react';

const UserForm = (props) => {
    const { user, inputHandler, saveHandler, cancelHandler } = props;
    return (
        <div className="form">
            <div className="row">
                <div className="col-12 col-md-6">
                    <div className="form-group">
                        <label htmlFor="name">Nome</label>
                        <input type="text" className="form-control"
                            name="name"
                            value={user.name}
                            onChange={e => inputHandler(e)}
                            placeholder="Digite o seu nome..." />
                    </div>
                </div>

                <div className="col-12 col-md-6">
                    <div className="form-group">
                        <label htmlFor="email">E-mail</label>
                        <input type="text" className="form-control"
                            name="email"
                            value={user.email}
                            onChange={e => inputHandler(e)}
                            placeholder="Digite o e-mail..." />
                    </div>
                </div>
            </div>

            <hr />
            <div className="row">
                <div className="col-12 d-flex justify-content-end">
                    <button className="btn btn-primary"
                        onClick={e => saveHandler(e)}>
                        Salvar
                </button>

                    <button className="btn btn-secondary ml-2"
                        onClick={e => cancelHandler(e)}>
                        Cancelar
                </button>
                </div>
            </div>
        </div>
    )
}

export default UserForm;