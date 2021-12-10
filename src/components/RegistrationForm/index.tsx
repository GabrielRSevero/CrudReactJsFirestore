import React, { ChangeEvent, ChangeEventHandler, FormEvent, useEffect, useState } from 'react';

import * as C from './styles';
import { FaUserAlt } from "react-icons/fa";
import { FaEnvelope } from "react-icons/fa";
import { FaMobile } from "react-icons/fa";

type formProps = {
    addAndEdit: (nome: string, email: string, telefone: string, endereco: string) => void,
    paciente?: {
        nome: string
        email: string,
        telefone: string,
        endereco: string,
    },
}

type formData = {
    completeName: string,
    phoneNumber: string,
    email: string,
    address: string,
}

export default function RegistrationForm({addAndEdit, paciente}: formProps) {

    const [values, setValues] = useState<formData>({
        completeName: paciente ? paciente.nome : '',
        phoneNumber: paciente ? paciente.telefone : '',
        email: paciente ? paciente.email : '',
        address: paciente ? paciente.endereco : '',
    });

    function handleInputChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        setValues({
            ...values,
            [e.target.name]: e.target.value
        })
        console.log(values);
    }

    function submitForm(e: FormEvent) {
        e.preventDefault();
        addAndEdit(values.completeName, values.email, values.phoneNumber, values.address);
        setValues({completeName: '', phoneNumber: '', email: '', address: ''})
    }

    return (
        <C.Container>
            <form onSubmit={submitForm}>
                <div className="row">
                    {/* Input nome */}
                    <div className="col-md-12 mb-3">
                        <div className="form-group input-group">
                            <div className="input-group-prepend d-flex">
                                <div className="input-group-text">
                                    <FaUserAlt />
                                </div>
                            </div>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Nome completo"
                                name="completeName"
                                value={values?.completeName}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                    </div>

                    {/* Input telefone */}
                    <div className="col-md-6 mb-3">
                        <div className="form-group input-group">
                            <div className="input-group-prepend d-flex">
                                <div className="input-group-text">
                                    <FaMobile />
                                </div>
                            </div>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Telefone"
                                name="phoneNumber"
                                value={values?.phoneNumber}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                    </div>

                    {/* Input email */}
                    <div className="col-md-6 mb-3">
                        <div className="form-group input-group">
                            <div className="input-group-prepend d-flex">
                                <div className="input-group-text">
                                    <FaEnvelope />
                                </div>
                            </div>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="E-mail"
                                name="email"
                                value={values?.email}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                    </div>

                    {/* Input endereço */}
                    <div className="col-md-12 mb-3">
                        <div className="form-group input-group">
                            <textarea
                                style={{ resize: 'none' }}
                                className="form-control"
                                name="address"
                                placeholder="Endereço"
                                onChange={handleInputChange}
                                value={values?.address}
                                required
                                cols={30}
                                rows={3}>
                            </textarea>
                        </div>
                    </div>

                </div>
                <div className="form-group mb-5 d-flex">
                    <input type="submit" value="Salvar" className="btn btn-primary"/>
                </div>
            </form>
        </C.Container>
    )
}