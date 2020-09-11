import React, { useState, useEffect } from 'react'
import useApi from '../../helpers/api'
import {PageContainer} from '../../components/MainComponents'
import { SearchArea, PageArea } from './styled'
import { Link } from 'react-router-dom'
import AdItem from '../../components/AdItem'

function Page() {
    const api = useApi()

    const [countryList, setCountryList] = useState([])
    const [categories, setCategories] = useState([])
    const [adList, setAdList] = useState([])

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
        const getRecentAds = async () => {
            const json = await api.getAds({
                sort: 'desc',
                limit:8
            })

            setAdList(json.ads)
        }

        getRecentAds()

    },[api])

    return (
        <>
            <SearchArea>
                <PageContainer>
                    <div className="searchbox">
                        <form action="/adds">
                            <input type="text" name="q" placeholder="O que você procura?"/>

                            <select name="state" id="">
                                {countryList.map((i,k) => 
                                    <option key={k} value={i.name}>{i.name}</option>
                                )}
                            </select>

                            <button>Pesquisar</button>
                        </form>
                    </div>

                    <div className="categoryList">
                        {categories.map((i,k) =>
                            <Link key={k} to={`/ads?cat=${i.slug}`} className="categoryItem">
                                <img src={i.img} alt={i.slug}/>
                                <span>{i.name}</span>
                            </Link>
                        
                        )}
                    </div>
                </PageContainer>
            </SearchArea>

            <PageContainer>
                <PageArea>
                    <h2>Anúncios Recentes</h2>
                    <div className="list">
                        {adList.map((i,k) => 
                          <AdItem  key={k} data={i}/>  
                        )}
                    </div>

                    <Link to="/ads" className="seeAllLink">Ver Todos</Link>

                    <hr/>

                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Non ipsa id aut exercitationem repellendus. Modi quidem, cupiditate maxime, harum asperiores maiores quos dignissimos possimus, voluptate quam deserunt optio vel amet.

                </PageArea>
            </PageContainer>
        </>
    )
}

export default Page