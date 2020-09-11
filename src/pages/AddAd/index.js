import React, {useRef, useState, useEffect} from 'react'
import {PageArea} from './styled'
import { PageContainer, PageTitle, ErrorMessage } from '../../components/MainComponents'
import useApi from '../../helpers/api'
import MaskedInput from 'react-text-mask'
import CreateNumberMask from 'text-mask-addons/dist/createNumberMask'
import { useHistory } from 'react-router-dom'

const Page = () => {
    const api = useApi()
    const history = useHistory()
    const fileField = useRef()

    const [categories, setCategories] = useState([])

    const [title, setTitle] = useState('')
    const [category, setCategory] = useState('')
    const [price, setPrice] = useState('')
    const [priceNegotiable, setPriceNegotiable] = useState(false)
    const [description, setDescription] = useState('')

    const [disabled, setDisabled] = useState(false)

    const [error, setError] = useState('')

    useEffect(() => {
        const getCategories = async () => {
            const cats = await api.getCategories()
            setCategories(cats)
        }

        getCategories()
        
    },[api])

    const handleSubmit = async (e) => {
        e.preventDefault()
        setDisabled(true)
        setError('')

        let errors = []

        if(!title.trim()) {
            errors.push('Sem título')
        }

        if(!category) {
            errors.push('Sem categoria')
        }

        if(errors.length === 0) {
            const fData = new FormData()

            fData.append('title', title)
            fData.append('price', price)
            fData.append('priceNegotiable', priceNegotiable)
            fData.append('description', description)
            fData.append('category', category)

            if(fileField.current.files.length > 0) {
                for(let i=0; i<fileField.current.files.length; i++) {
                    fData.append('img', fileField.current.files[i])
                }
            }

            const json = await api.addAd(fData)

            if(!json.error) {
                history.push(`/ad/${json.id}`)

                return

            } else {
                setError(json.error)
            }

        } else {
            setError(errors.join("\n"))
        }

        setDisabled(false)

    }

    const priceMask = CreateNumberMask({
        prefix:'R$ ',
        includeThousandsSeparator:true,
        thousandsSeparatorSymbol:'.',
        allowDecimal:true,
        decimalsymbol:',',
        integerLimit: false
    })

    return (
        <PageContainer>
            <PageTitle>Postar um anúncio</PageTitle>
            <PageArea>
                {error && 
                    <ErrorMessage>{error}</ErrorMessage>
                }
                <form onSubmit={handleSubmit}>
                    <label htmlFor="" className="area">
                        <div className="area--title">Título</div>
                        <div className="area--input">
                            <input 
                                type="text"
                                disabled={disabled}
                                value={title}
                                onChange={e => setTitle(e.target.value)}
                                required
                            />
                        </div>
                    </label>

                    <label htmlFor="" className="area">
                        <div className="area--title">Categoria</div>
                        <div className="area--input">
                            <select 
                                disabled={disabled} 
                                onChange={e => setCategory(e.target.value)}
                                required
                            >
                                <option value=""></option>
                                {categories && categories.map(i => 
                                    <option key={i._id} value={i._id}>{i.name}</option>
                                )}
                            </select>
                        </div>
                    </label>

                    <label htmlFor="" className="area">
                        <div className="area--title">Preço</div>
                        <div className="area--input">
                            <MaskedInput
                                mask={priceMask}
                                placeholder="R$ "
                                disabled={disabled || priceNegotiable}
                                value={price}
                                onChange={e => setPrice(e.target.value)}
                            />
                        </div>
                    </label>

                    <label htmlFor="" className="area">
                        <div className="area--title">Preço negociável</div>
                        <div>
                            <input 
                                type="checkbox"
                                disabled={disabled}
                                checked={priceNegotiable}
                                onChange={() => setPriceNegotiable(!priceNegotiable)}
                            />
                        </div>
                    </label>

                    <label htmlFor="" className="area">
                        <div className="area--title">Descrição</div>
                        <div className="area--input">
                            <textarea 
                            disabled={disabled} 
                            value={description}
                            onChange={e=>setDescription(e.target.value)}
                            >

                            </textarea>
                        </div>
                    </label>

                    <label htmlFor="" className="area">
                        <div className="area--title">Imagens</div>
                        <div className="area--input">
                            <input 
                                type="file"
                                disabled={disabled}
                                ref={fileField}
                                multiple
                            />
                        </div>
                    </label>

                    <label htmlFor="" className="area">
                        <div className="area--title"></div>
                        <div className="area--input">
                            <button>Adicionar anúncio</button>
                        </div>
                    </label>
                </form>
            </PageArea>
        </PageContainer>
    )
}

export default Page