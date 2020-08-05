import React, { useState, FormEvent } from 'react';
import { useHistory } from 'react-router-dom';

import './styles.css';

import warningIcon from '../../assets/images/icons/warning.svg';

import PageHeader from '../../components/PageHeader';
import Input from '../../components/Input';
import Textarea from '../../components/Textarea';
import Select from '../../components/Select';
import api from '../../services/api';

const INITIAL_SCHEDULE_ITEM = { weekday: "0", from: '', to: '' };

function TeacherForm() {

    const history = useHistory();

    const [name, setName] = useState('');
    const [avatar, setAvatar] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [bio, setBio] = useState('');

    const [subject, setSubject] = useState('');
    const [cost, setCost] = useState('');

    const [scheduleItems, setScheduleItems] = useState([
        INITIAL_SCHEDULE_ITEM
    ]);

    function addNewScheduleItem() {
        setScheduleItems([
            ...scheduleItems,
            INITIAL_SCHEDULE_ITEM
        ]);
    }
    
    function setScheduleItemValue(index: number, field: string, value: string) {
        const updatedScheduleItems = scheduleItems.map((item, idx) => {
            if (idx === index) {
                return { ...item, [field]: value }
            }
            
            return item;
        });
        
        setScheduleItems(updatedScheduleItems);
    }
    
    function handleCreateClass(e: FormEvent) {
        e.preventDefault();

        api.post('classes', {
                name,
                avatar,
                whatsapp,
                bio,
                subject,
                cost: Number(cost),
                schedule: scheduleItems
            })
            .then(() => {
                alert('cadastro realizado com sucesso');
                history.push('/');
            })
            .catch(() => alert('erro no cadastro'));
    }

    return (
        <div id="page-teacher-form" className="container">
            <PageHeader
                title="Que incrível que você quer dar aulas"
                description="O primeiro passo é preencher esse formulário de inscrição" />
            <main>
                <form onSubmit={handleCreateClass}>
                    <fieldset>
                        <legend>Seus dados</legend>
                        <Input label="Nome completo" name="name" value={name}
                            onChange={(e) => setName(e.target.value)} />
                        <Input label="Avatar" name="avatar" value={avatar}
                            onChange={(e) => setAvatar(e.target.value)} />
                        <Input label="WhatsApp" name="whatsapp" value={whatsapp}
                            onChange={(e) => setWhatsapp(e.target.value)} />
                        <Textarea label="Biografia" name="bio" value={bio}
                            onChange={(e) => setBio(e.target.value)} />
                    </fieldset>

                    <fieldset>
                        <legend>Sobre a aula</legend>
                        <Select
                            label="Matéria"
                            name="subject"
                            options={[
                                { value: 'Artes', label: 'Artes' },
                                { value: 'Matemática', label: 'Matemática' },
                                { value: 'Ciências', label: 'Ciências' },
                                { value: 'Geografia', label: 'Geografia' },
                                { value: 'Português', label: 'Português' },
                                { value: 'História', label: 'História' }
                            ]}
                            value={subject}
                            onChange={(e) => { setSubject(e.target.value) }}
                        />
                        <Input label="Custo da sua hora por aula" name="cost" value={cost}
                            onChange={(e) => setCost(e.target.value) } />
                    </fieldset>

                    <fieldset>
                        <legend>Horários disponíveis
                            <button type='button' onClick={addNewScheduleItem}>
                                + Novo horário
                            </button>
                        </legend>
                        {scheduleItems.map((item, idx) => {
                            return (
                                <div key={item.weekday} className="schedule-item">
                                    <Select
                                        label="Dia da semana"
                                        name="weekday"
                                        value={item.weekday}
                                        options={[
                                            { value: '0', label: 'Domingo' },
                                            { value: '1', label: 'Segunda-feira' },
                                            { value: '2', label: 'Terça-feira' },
                                            { value: '3', label: 'Quarta-feira' },
                                            { value: '4', label: 'Quinta-feira' },
                                            { value: '5', label: 'Sexta-feira' },
                                            { value: '6', label: 'Sábado' }
                                        ]}
                                        onChange={e => setScheduleItemValue(idx, 'weekday', e.target.value)}
                                    />
                                    <Input label="Das" name="from" type="time"
                                        value={item.from}
                                        onChange={e => setScheduleItemValue(idx, 'from', e.target.value)} />
                                    <Input label="Até" name="to" type="time"
                                        value={item.to}
                                        onChange={e => setScheduleItemValue(idx, 'to', e.target.value)} />
                                </div>
                            );
                        })}
                    </fieldset>

                    <footer>
                        <p>
                            <img src={warningIcon} alt="Aviso importante"/>
                            Importante! <br/>
                            Preencha todos os dados
                        </p>
                        <button type="submit">
                            Salvar cadastro
                        </button>
                    </footer>
                </form>
            </main>
        </div>
    )
}

export default TeacherForm;