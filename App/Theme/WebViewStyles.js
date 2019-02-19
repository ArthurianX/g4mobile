import SourceSansProBold from 'App/Assets/Base64Fonts/SourceSansPro-Bold'
import SourceSansProRegular from 'App/Assets/Base64Fonts/SourceSansPro-Regular'
import SourceSansProItalic from 'App/Assets/Base64Fonts/SourceSansPro-Italic'
import SourceSansProILight from 'App/Assets/Base64Fonts/SourceSansPro-Light'

const generateStyle = (theme) => {
  return `
    <style type="text/css">                                                                        
        ${SourceSansProRegular}
        ${SourceSansProBold}
        ${SourceSansProItalic}
        ${SourceSansProILight}
        * {
          background-color: ${theme.colors.background};
          color: ${theme.colors.text};
          font-family: 'Source Sans Pro', 'sans-serif';
          font-weight: 500;                          
        }                  
        a {
            font-size: 3rem;
            color: ${theme.colors.accent} !important;
        }      
        .g4postimagemobile {
          width: 100%;
          height: auto;
          margin-top: 2rem;
          margin-bottom: 1rem;
        }
        body {
          width:100%;
        }
        h1 {
          font-size: 48px;
          font-weight: bold;
          margin-left: 4%; 
          margin-right: 4%;
        }
        h2 {
          font-size: 40px;
          font-weight: bold;
        }
        p, div {
          font-size: 3rem;
          margin-left: 4%; 
          margin-right: 4%; 
        }
        h3 {
          font-size: 32px;
          font-weight: bold;
        }
        img {
          width:100%;
        }
        td {
          display: block !important;
          width: 100% !important;
        }
        img {
          width:100%;
        }
        hr {
          width: 100%;
        }
        ol li ol li ol li {
          position: relative; right: 85px;          
        }
        ul {
          width: 100%;
          margin-left: -25px;
        }
        li {
          width: 100%;
          font-size: 3rem;
        }
        .tabs {
          display: none;
        }
        .tabs > li {
          display: none;
        }
        .tabs-content {
          padding: 0;
          list-style-type: none;
        }
        tr {
          display: flex;
          flex-direction: column;
        }
        em {
        font-weight: 200;
        }
    </style>`
}

export const WebViewStyles = {
  generateStyle,
}
