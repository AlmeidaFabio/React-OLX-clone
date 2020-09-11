import styled from 'styled-components'

export const PageArea = styled.div`
    display:flex;
    margin-top:20px;

    .leftside {
       width:250px;
       margin-right:10px; 
      

       .filterName {
           font-size: 15px;
           margin: 10px 0;
       }

       input, select {
           width: 100%;
           height:40px;
           border:2px solid #9bb83c;
           border-radius:5px;
           outline:0;
           font-size:15px;
           color:#000;
           padding:10px;
       }

       ul, li {
           margin:0;
           padding:0;
           list-style:none;
       }

       .categoryItem {
           display:flex;
           align-items:center;
           padding:10px;
           border-radius:5px;
           color:#000;
           cursor:pointer;

           img {
               width: 25px;
               height:25px;
               margin-right:5px;
           }

           span {
               font-size:14px;
           }
       }

       .categoryItem:hover,
       .categoryItem.active {
           background-color: #9bb83c;
           color: #fff;
       }
    }

    .rightside {
        flex: 1;

        h2 {
            margin-top:0;
            margin-left:10px;
            font-size: 18px;
        }

        .warning {
            padding:30px;
            text-align:center;
        }

        .list {
            display:flex;
            flex-wrap:wrap;

            .adItem {
                width:33%;
            }

        }

        .pagination {
            display:flex;
            align-items:center;
            justify-content:center;
            margin:10px 0;

            .pageItem {
                width:30px;
                height:30px;
                border:1px solid #000;
                display:flex;
                align-items:center;
                justify-content:center;
                font-size:14px;
                margin-right:5px;
                cursor:pointer;

                &:hover {
                    border:1px solid #999;
                }

                &.active {
                    background-color:#ccc;
                }
            }
        }
    }

    @media (max-width:600px) {
        & {
            flex-direction:column;
        }

        .leftside {
            width:auto;
            margin:10px;

            ul {
                display:flex;
                flex-wrap:wrap;

                li {
                    width:50%
                }
            }
        }

        .rightside {
            margin:10px;

            .list .adItem {
                width:50%;
            }
        }
    }
`