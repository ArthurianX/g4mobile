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
            font-size: 2rem;
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
        h2 {
          font-size: 48px;
        }
        p {
          font-size: 3rem;
          margin-left: 4%; 
          margin-right: 4%; 
        }
        h3 {
          font-size: 32px
        }
        img {
          width:98%;
        }
        td {
          display: block !important;
          width: 95% !important;
        }
        img {
          width:98%;
        }
        hr {
          width: 98%;
        }
        ol li ol li ol li {
          position: relative; right: 85px;
        }
        ul {
          width: 98%;
          margin-left: -25px;
        }
        li {
          width: 98%;
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
    </style>`
}

export const WebViewStyles = {
  generateStyle,
}
