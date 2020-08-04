import React from 'react';

import PageHeader from '../../components/PageHeader';
import TeacherItem from '../../components/TeacherItem';

import './styles.css';

function TeacherList() {
    return (
        <div id="page-teacher-list" className="container">
            <PageHeader title="Estes são os proffys disponíveis">
                <form id="search-teachers">
                    <div className="input-block">
                        <label htmlFor="subject">Matéria</label>
                        <input type="text" id="subject" />
                    </div>
                    <div className="input-block">
                        <label htmlFor="weekday">Dia da semana</label>
                        <input type="text" id="weekday" />
                    </div>
                    <div className="input-block">
                        <label htmlFor="time">Hora</label>
                        <input type="text" id="time" />
                    </div>
                </form>
            </PageHeader>

            <main>
                <TeacherItem
                    urlImg="https://avatars2.githubusercontent.com/u/2254731?s=460&u=0ba16a79456c2f250e7579cb388fa18c5c2d7d65&v=4"
                    name="Diego Fernandes"
                    subject="História"
                    price="80,00" />
                <TeacherItem
                    urlImg="https://avatars3.githubusercontent.com/u/29418991?s=100&v=4"
                    name="Bruno Filho"
                    subject="Matemática"
                    price="95,00" />
            </main>
        </div>
    )
}

export default TeacherList;