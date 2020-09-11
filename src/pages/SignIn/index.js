import React from 'react'
import {PageArea} from './styled'
import { PageContainer, PageTitle, ErrorMessage } from '../../components/MainComponents'
import { useState } from 'react'
import useApi from '../../helpers/api'
import { doLogin } from '../../helpers/AuthHandler'

const Page = () => {
    const api = useApi()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [rememberPassword, setRememberPassword] = useState(false)
    const [disabled, setDisabled] = useState(false)

    const [error, setError] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        setDisabled(true)
        setError('')

        const json = await api.login(email, password)
        if(json.error) {
            setError(json.error)
        } else {
            doLogin(json.token, rememberPassword)

            window.location.href = '/';
        }

        setDisabled(false)
    }

    return (
        <PageContainer>
            <PageTitle>Login</PageTitle>
            <PageArea>
                {error && 
                    <ErrorMessage>{error}</ErrorMessage>
                }
                <form onSubmit={handleSubmit}>
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
                        <div className="area--title">Lembra senha</div>
                        <div>
                            <input 
                                type="checkbox"
                                disabled={disabled}
                                checked={rememberPassword}
                                onChange={() => setRememberPassword(!rememberPassword)}
                            />
                        </div>
                    </label>

                    <label htmlFor="" className="area">
                        <div className="area--title"></div>
                        <div className="area--input">
                            <button>Fazer Login</button>
                        </div>
                    </label>
                </form>
            </PageArea>
        </PageContainer>
    )
}

export default Page