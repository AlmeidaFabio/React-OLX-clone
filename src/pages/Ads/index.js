import React, { useState, useEffect } from 'react'
import useApi from '../../helpers/api'
import {PageContainer} from '../../components/MainComponents'
import { PageArea } from './styled'
import { useLocation, useHistory } from 'react-router-dom'
import AdItem from '../../components/AdItem'


function Page() {
    const api = useApi()
    const history = useHistory()
    let timer;
    
    const useQueryString = () => {
        return new URLSearchParams(useLocation().search)
    }

    const query = useQueryString()

    const [q, setQ] = useState(query.get('q') != null ? query.get('q') : '')
    const [cat, setCat] = useState(query.get('cat') != null ? query.get('cat') : '')
    const [country, setCountry] = useState(query.get('country') != null ? query.get('country') : '')

    const [adsTotal, setAdsTotal] = useState(0)
    const [pageCount, setPageCount] = useState(0)
    const [currentPage, setCurrentPage] = useState(1)
    const [countryList, setCountryList] = useState([])
    const [categories, setCategories] = useState([])
    const [adList, setAdList] = useState([])
    const [loading, setLoading] = useState(true)

    const getAdsList = async () => {
        setLoading(true)

        let offset = (currentPage - 1) * 9
        
        const json = await api.getAds({
            sort:'desc',
            limit:9,
            q,
            cat,
            country,
            offset
        })

        setAdList(json.ads)
        setAdsTotal(json.total)
        setLoading(false)
    }

    useEffect(() => {
        if(adList.length > 0) {
            setPageCount(Math.ceil(adsTotal / adList.length))
        } else {
            setPageCount(0)
        }
       
    }, [adsTotal])

    useEffect(() => {
        let queryString = []

        if(q) {
            queryString.push(`q=${q}`)
        }

        if(cat) {
            queryString.push(`cat=${cat}`)
        }

        if(country) {
            queryString.push(`country=${country}`)
        }

        history.replace({
            search:`?${queryString.join('&')}`
        })

        if(timer) {
            clearTimeout(timer)
        }

        timer = setTimeout(getAdsList, 1000)

        setCurrentPage(1)

    }, [q, cat, country])

    useEffect(() => {
        const getCountrys = async () => {
            const list = await api.getCountrys()

            setCountryList(list)
        }

        getCountrys()

    }, [api])

    useEffect(() => {
        const getCategories = async any => {
            const cats = await api.getCategories()

            setCategories(cats)
        }

        getCategories()

    },[api])

    useEffect(() => {
        getAdsList()
    }, [currentPage])

    let pagination = []
    for(let i=1; i<=pageCount; i++){
        pagination.push(i)
    }

    return (
        <PageContainer>
            <PageArea>
                <div className="leftside">
                    <form method="GET">
                        <input 
                        type="text" 
                        name="q" 
                        placeholder="O que você procura?"
                        value={q}  
                        onChange={e => setQ(e.target.value)}  
                        />

                        <div className="filterName">Estado:</div>
                        <select name="state" value={country} onChange={e => setCountry(e.target.value)}>
                            <option value=""></option>
                            {countryList.map((i,k) => 
                                <option key={k} value={i.name}>{i.name}</option>
                            )}
                        </select>

                        <div className="filterName">Categoria:</div>
                        <ul>
                            {categories.map((i,k) => 
                                <li key={k} className={cat === i.slug ? 'categoryItem active' : 'categoryItem'} onClick={() => setCat(i.slug)}>
                                    <img src={i.img} alt={i.name}/>
                                    <span>{i.name}</span>
                                </li>
                            )}
                        </ul>
                    </form>
                </div>

                <div className="rightside">
                    <h2>Resultados</h2>

                    {loading && adList.length === 0 &&
                        <div className="warning">Carregando...</div>
                    }
                    {!loading && adList.length === 0 && 
                        <div className="warning">Não encontramos resultados.</div>
                    }
                    <div className="list">
                        {adList.map((i, k) => (
                            <AdItem key={k} data={i} />
                        ))}
                    </div>

                    <div className="pagination">
                        {pagination.map((i,k) => 
                            <div 
                                key={k} 
                                className={i===currentPage?'pageItem active':'pageItem'}
                                onClick={() => setCurrentPage(i)}
                            >
                                {i}
                            </div>
                        )}
                    </div>
                </div>
            </PageArea>
        </PageContainer>
    )
}

export default Page