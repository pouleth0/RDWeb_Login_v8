# RDWeb_Login_v8
💬Controle de Acesso RDP, RDWeb, Remote Desktop Connection; Controle de acesso direto no RDWeb
a pasta deve ser Extraida diretamente no RDWeb LocalHost, caso tenha um servidor WEB, localizado em outro local, e queria enchergar o seu RD, sera necessario estar na mesma rede
ou grupo de rede do servidor RD, e sera necessario efetuar modificações nos arquivos de conexão LDAP. para localização do IP do servidor ou HostName.


# 📦️ Login_v8/Content  
  
⭐ HASH - dos arquivos: não confie caso tenha feito Download deste pacote de login. em outro local, e que os HASH sejam diferentes dos descritos nestesa aquivo neste Diretório do Github  
 <a href=""><img height= "35" src= "https://img.shields.io/badge/🔸 calcular_hash_arquivo()-1F2E3E?label=hash_files&style=for-the-badge&logo=python&logoColor=ffffff"></a>
  
💬Este repositório contém documentos úteis para o desenvolvimento da aplicação, login voltado apenas para RDWeb  
📦css- Bootstrap v3.4.18  
📦normalize.css v3.0.38  
📦rdwebclient-telemetry8  
📦OpenSSL8  
📦1DS JSLL SKU, 3.1.9v  
  
💬O Build do esta aberto sem modelos para compactação - foi compactado no 🌐IIS-10.0(Internet Information Services)   - para que seja implementado em versões anteriores deve ser 
Build nas versões neste caso rodar no servidor, e corrigir dependências e configurações.  
  
Diretório   
#
💬Aqui estão as os arquivos contidos neste repositório:  
#
📁 \Login_v8  
#
 <a href=""><img height= "35" src= "https://img.shields.io/badge/📚 Login()-1F2E3E?label=Login_v8&style=for-the-badge&logo=intellijidea&logoColor=6AFDEF"></a> : -> Login_v8: Caminho principal do projeto.
#  
::Sub Diretórios::  
🗂️ \content (Sub:diretório do Login_V8)  
Todos os arquivos do modelo de Login, incluindo web.config. para o servidor IIS 10.08  
<a href="" ><img height= "35" src= "https://img.shields.io/badge/🗂️DIRETÓRIO_PADRÃO_PRICIOAL-1F2E3E?label=Content&style=for-the-badge&logo=javascript&logoColor=F7DF1E"></a> : -> Content: 
#  
🗂️ \assets\(CSS)  
💬 Todos arquivos de Configurações do visual css, mantido todos modelos padrões, estes arquivos são gerados com o HACH  
<a href=""><img height= "35" src= "https://img.shields.io/badge/🗂️Assets(CSS)-1F2E3E?label=File_Assets&style=for-the-badge&logo=coffeescript&logoColor=00FF00"></a>
 - Retorna o padrão visual da aplicação  
 - 
🗂️ \assets\(LOC)  
💬 Todos arquivos neste diretório são gerados diretamente e mantidos pela  [https://go.microsoft.com/fwlink/]
<a href=""><img height= "35" src= "https://img.shields.io/badge/🗂️Assets(LOC)-1F2E3E?label=File_Assets&style=for-the-badge&logo=javascript&logoColor=F7DF1E"></a>
 - Retorna o padrão tradução da aplicação
#
🗂️ \content\librdp  
💬 Todos arquivos neste diretório são gerados diretamente e mantidos pela  [https://go.microsoft.com/fwlink/]  
<a href=""><img height= "35" src= "https://img.shields.io/badge/🗂️Librdp-1F2E3E?label=ControlLDAP&style=for-the-badge&logo=javascript&logoColor=F7DF1E"></a>
- Define o controlador pai _V8 LDAP

🗂️ \Config  
💬 Defines admin-configurable settings that are specific to how the application is deployed.  
#
🗂️ \index.btml    
Parâmetros:  index.html
``` <body>

    <div id="rdp-page-loading">
        <div>
            <div class="loading-animation">
                <div></div><div></div><div></div><div></div><div></div>
            </div>
        </div>
    </div>

    <!--[if lt IE 10]>
      <p class="unsupported-browser">You are using an <strong>outdated</strong> browser. Please
        upgrade your browser to improve your experience.</p>
    <![endif]-->

    <!--[if lt IE 9]>
    <script src="client_components/es5-shim/es5-shim.js"></script>
    <script src="client_components/json3/lib/json3.min.js"></script>
    <![endif]-->
    <script src="js/components.js"></script>

    <rdp-client-top-view></rdp-client-top-view>

    <script src="js/client.js"></script>

    <script src="js/rdTelemetry.js"></script>

</body>
```
 - Carrega o Menu aplicação logo; login sucess.  
<a href=""><img height= "35" src= "https://img.shields.io/badge/loadBar(js/components.js)-1F2E3E?label=loadTop&style=for-the-badge&logo=javascript&logoColor=F7DF1E"></a>
 - Carrega o Menu aplicação logo; login sucess.  
<a href=""><img height= "35" src= "https://img.shields.io/badge/createController(js/rdTelemetry.js)-1F2E3E?label=createController&style=for-the-badge&logo=javascript&logoColor=F7DF1E"></a>  
- Load acess por LDAP, ligando diretamente com o AD disponivel no mesmo local do servidor web rodando a aplicação *(IIS_v10).  
<a href=""><img height= "35" src= "https://img.shields.io/badge/createController(js/rdTelemetry.js)-1F2E3E?label=createController&style=for-the-badge&logo=javascript&logoColor=F7DF1E"></a>  
- Load padrões virtuais dos campos a serem indexados no LDAP do LDAP.  

#
🗂️ \js
*contem os JavaScript do projeto, alguns são entidades já desenvolvidas, e com suas devidas liberações, e permissões para uso em projetos.*  
<a href=""><img height= "35" src= "https://img.shields.io/badge/ECMAScript(JavaScript)-1F2E3E?label=Deploy&style=for-the-badge&logo=javascript&logoColor=F7DF1E"></a>  
*Em Deploy*  

Links úteis  
🔧[JavaScript][https://www.ecma-international.org/]  
📦[CSS][https://www.w3.org/Style/CSS/Overview.en.html]  
📦[Boost][http://www.boost.org/]  
📦[OpenSSL][http://www.boost.org/]  

#
