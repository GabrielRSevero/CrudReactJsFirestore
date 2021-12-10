import React, { useEffect, useState } from 'react';
import { db } from '../../services/database/firebase';

import { 
    collection,
    DocumentData,
    getDocs,
    addDoc,
    updateDoc,
    deleteDoc,
    doc,
  } from '@firebase/firestore';

import RegistrationForm from '../RegistrationForm';

import { BsPencilSquare, BsFillTrashFill, BsPlus } from 'react-icons/bs';
import { Modal, Button } from 'react-bootstrap';
import * as C from './styles';

type paciente = {
    nome: string,
    email: string,
    telefone: string,
    endereco: string,
    id: string,
}

export default function Registration() {

    const [pacientes, setPacientes] = useState<paciente[]>();
    const [pacienteEditValues, setPacienteEditValues] = useState({
        nome: '',
        email: '',
        telefone: '',
        endereco: '',
    });
    const [editModal, setEditModal] = useState(false);
    const [createModal, setCreateModal] = useState(false);
    const [id, setId] = useState('');

    const pacientCollectionRef = collection(db, "pacientes");

    async function addAndEdit(nome: string, email: string, telefone: string, endereco: string) {
        if (editModal === false) {
            setCreateModal(false);
            await addDoc(pacientCollectionRef, {
                nome: nome,
                email: email,
                telefone: telefone,
                endereco: endereco,
            });
        } else {
            const paciente = doc(db, "pacientes", id);
            setEditModal(false);
            await updateDoc(paciente, {
                nome: nome,
                email: email,
                telefone: telefone,
                endereco: endereco,
            });
        }
    }

    useEffect(() => {
        async function getPacientes() {
            const data = await getDocs(pacientCollectionRef);
            setPacientes(data.docs.map((doc: DocumentData) => ({...doc.data(), id: doc.id})));
          };
    
          getPacientes();
    }, [pacientCollectionRef, pacientes]);

    async function deletePaciente(id: string) {
        const pacienteDoc = doc(db, "pacientes", id);
        await deleteDoc(pacienteDoc);
    };

    function handleEdit(id: string, nome: string, email: string, telefone: string, endereco: string) {
        setEditModal(true);
        const paciente = doc(db, "pacientes", id);
        setId(id);
        setPacienteEditValues({
            nome: nome,
            email: email,
            telefone: telefone,
            endereco: endereco,
        });
    }

    return (
        <C.Container className="teste">
            <div className="p-5 mb-4 bg-light rounded-3">
                <div className="container py-5">
                    <h1 className="display-5 fw-bold">Cadastro</h1>
                    <p className="col-md-8 fs-4"></p>
                    <Button className="btn btn-primary" onClick={() => {setCreateModal(true)}}>
                        Cadastrar
                        <BsPlus />
                    </Button>
                </div>
            </div>

            <div className="container">
                <div className="row justify-content-between">
                    <div className="col-md-6">
                        <table className="table table-stripped">
                            <thead className="thead-light">
                                <tr>
                                    <td>Nome</td>
                                    <td>Email</td>
                                    <td>Telefone</td>
                                    <td>Ações</td>
                                </tr>
                            </thead>
                            <tbody>
                                {pacientes?.map((paciente, key) => {
                                    return (
                                        <tr key={key}>
                                            <td>{paciente.nome}</td>
                                            <td>{paciente.email}</td>
                                            <td>{paciente.telefone}</td>
                                            <td className="actions">
                                                <Button onClick={() => {handleEdit(paciente.id, paciente.nome, paciente.email, paciente.telefone, paciente.endereco)}} className="btn btn-primary">
                                                    <BsPencilSquare />
                                                </Button>
                                                <Button onClick={() => {deletePaciente(paciente.id)}} className="btn btn-danger">
                                                    <BsFillTrashFill />
                                                </Button>
                                            </td>
                                        </tr>                                   
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Modal para editar registro */}
            <Modal show={editModal} onHide={() => {setEditModal(false)}}>
                <Modal.Header closeButton>
                    <Modal.Title>Editar paciente</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <RegistrationForm paciente={pacienteEditValues} addAndEdit={addAndEdit}/>
                </Modal.Body>
            </Modal>

            {/* Modal para cadastrar registro */}
            <Modal show={createModal} onHide={() => {setCreateModal(false)}}>
                <Modal.Header closeButton>
                    <Modal.Title>Cadastrar paciente</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <RegistrationForm addAndEdit={addAndEdit}/>
                </Modal.Body>
            </Modal>

        </C.Container>
    )
}