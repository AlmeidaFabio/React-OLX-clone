import React, { useState, useEffect } from 'react'
import {PageArea} from './styled'
import { PageContainer, PageTitle, ErrorMessage } from '../../components/MainComponents'
import useApi from '../../helpers/api'
import { doLogin } from '../../helpers/AuthHandler'

export default function Page() {
    const api = useApi()

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [country, setCountry] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [disabled, setDisabled] = useState(false)

    const [countryList, setCountryList] = useState([])

    const [error, setError] = useState('')

    useEffect(() => {
       const getCountrys = async () => {
           const list = await api.getCountrys()

           setCountryList(list)
       } 

       getCountrys()
       
    }, [api])

    async function handleSubmit(e) {
        e.preventDefault()
        setDisabled(true)
        setError('')

        if(password !== confirmPassword) {
            setError('Senhas não batem')
            setDisabled(false)
            return
        }

        const json = await api.register(
            name,
            email,
            country,
            password
        )

        if(json.error) {
            setError(json.error)
        } else {
            doLogin(json.token)
            window.location.href = '/'
        }

        setDisabled(false)
    }

 
    return (
        <PageContainer>
            <PageTitle>Cadastro</PageTitle>
            <PageArea>
                {error && 
                    <ErrorMessage>{error}</ErrorMessage>
                }
                <form onSubmit={handleSubmit}>
                    <label htmlFor="" className="area">
                        <div className="area--title">Nome</div>
                        <div className="area--input">
                            <input 
                                type="text"
                                disabled={disabled}
                                value={name}
                                onChange={e => setName(e.target.value)}
                                required
                            />
                        </div>
                    </label>

                    <label htmlFor="" className="area">
                        <div className="area--title">Email</div>
                        <div className="area--input">
                            <input 
                                type="email"
                                disabled={disabled}
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                required
                            />
                        </div>
                    </label>

                    <label htmlFor="" className="area">
                        <div className="area--title">Estado</div>
                        <div className="area--input">
                            <select required value={country} onChange={e=>setCountry(e.target.value)}>
                                <option value=""></option>
                                {countryList.map((i, k) => 
                                    <option key={k} value={i._id}>{i.name}</option>
                                )}
                            </select>
                        </div>
                    </label>

                    <label htmlFor="" className="area">
                        <div className="area--title">Senha</div>
                        <div className="area--input">
                            <input 
                                type="password"
                                disabled={disabled}
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                required
                            />
                        </div>
                    </label>

                    <label htmlFor="" className="area">
                        <div className="area--title">Confirmar senha</div>
                        <div className="area--input">
                            <input 
                                type="password"
                                disabled={disabled}
                                value={confirmPassword}
                                onChange={e => setConfirmPassword(e.target.value)}
                                required
                            />
                        </div>
                    </label>

                    <label htmlFor="" className="area">
                        <div className="area--title"></div>
                        <div className="area--input">
                            <button>Cadastrar</button>
                        </div>
                    </label>
                </form>
            </PageArea>
        </PageContainer>
    )
}