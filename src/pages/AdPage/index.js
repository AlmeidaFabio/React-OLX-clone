import React,{ useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Slide } from 'react-slideshow-image'
import 'react-slideshow-image/dist/styles.css'

import useApi from '../../helpers/api'
import AdItem from '../../components/AdItem'

import { PageContainer } from '../../components/MainComponents'
import { PageArea, Fake, OthersArea, BreadCrumb } from './styled'

const Page = () => {
    const api = useApi()
    const { id } = useParams()

    const [loading, setLoading] = useState(true)
    const [adInfo, setAdInfo] = useState([])

    useEffect(() => {
        const getAdInfo = async (id) => {
            const json = await api.getAd(id, true)

            setAdInfo(json)
            
            setLoading(false)
        }

        getAdInfo(id)

    },[api, id])

    function formatDate(date) {
        let cDate = new Date(date)
        let months = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro']
        let cDay = cDate.getDate()
        let cMonth = cDate.getMonth()
        let cYear = cDate.getFullYear()

        return `${cDay} de ${months[cMonth]} de ${cYear}`
    }

    return (
        <PageContainer>
        {adInfo.category && 
            <BreadCrumb>
                Você está aqui:
                <Link to="/">Home</Link>
                /
                <Link to={`/ads?state=${adInfo.stateName}`}>{adInfo.stateName}</Link>
                /
                <Link to={`/ads?state=${adInfo.stateName}&cat=${adInfo.category.slug}`}>{adInfo.category.name}</Link>
                / {adInfo.title}
            </BreadCrumb>
        }    
            <PageArea>
                <div className="leftSide">
                    <div className="box">
                        <div className="adImage">
                            {loading && <Fake height={300}/>}
                            {adInfo.images && 
                                <Slide>
                                    {adInfo.images.map((img, k) => 
                                        <div key={k} className="each-slide">
                                            <img src={img} alt=""/>
                                        </div>
                                    )}
                                </Slide>
                            }
                        </div>

                        <div className="adInfo">
                            <div className="adName">
                                {loading && <Fake height={20}/>}

                                {adInfo.title && <h2>{adInfo.title}</h2>}

                                {adInfo.dateCreated && <small>
                                    Criado em {formatDate(adInfo.dateCreated)}
                                </small>}
                            </div>
                            <div className="adDescription">
                                {loading && <Fake height={100}/>}
                                {adInfo.description}

                                <hr/>

                                {adInfo.views && <small>
                                    Visualizações: {adInfo.views}
                                </small>}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="rightSide">
                    <div className="box box-padding">
                        {loading && <Fake height={20}/>}
                        {adInfo.priceNegociable && "Preço Negociável"}

                        {!adInfo.priceNegociable && adInfo.price && 
                            <div className="price">
                                Preço: <span>R$ {adInfo.price}</span>
                            </div>
                        }
                    </div>

                    {loading && <Fake height={50}/>}   
                    {adInfo.userInfo && 
                        <>
                            <a href={`malito:${adInfo.userInfo.email}`} target="_blank" rel="noopener noreferrer" className="contact-link">Fale com o vendedor</a>

                            <div className="box box-padding created-by">
                                <strong>{adInfo.userInfo.name}</strong>
                                <small>E-mail: {adInfo.userInfo.email}</small>
                                <small>Estado: {adInfo.userInfo.stateName}</small>
                            </div>
                        </>
                    }
                    
                </div>
            </PageArea>

            <OthersArea>       
                {adInfo.others && 
                    <>
                        <h2>Outras ofertas deste vendedor</h2>
                        <div className="list">
                            {adInfo.others.slice(0, 4).map((i,k) => 
                                <AdItem key={k} data={i} />
                            )}
                        </div>
                    </>
                }
            </OthersArea>     
        </PageContainer>
    )
}

export default Page