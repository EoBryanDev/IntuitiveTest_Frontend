<template>
    <nav>

        <h2>Relação de Operadoras Ativas ANS</h2>     

        <input type="search" name="searchInput" id="searchInput" v-model="research" placeholder="Procure aqui" >

        <select name="typeResearch" id="typeResearch" v-model="typeResearch">
                            <option selected value="Registro ANS">Registro ANS</option>
                            <option value="CNPJ">CNPJ</option>
                            <option value="Razão Social">Razão Social</option>
                            <option value="Nome Fantasia">Nome Fantasia</option>
                            <option value="Modalidade">Modalidade</option>
                            <option value="Logradouro">Logradouro</option>
                            <option value="Número">Número</option>
                            <option value="Complemento">Complemento</option>
                            <option value="Bairro">Bairro</option>
                            <option value="Cidade">Cidade</option>
                            <option value="UF">UF</option>
                            <option value="CEP">CEP</option>
                            <option value="DDD">DDD</option>
                            <option value="Telefone">Telefone</option>
                            <option value="Fax">Fax</option>
                            <option value="Endereço Eletrônico">Endereço Eletrônico</option>
                            <option value="Representante">Representante</option>
                            <option value="Cargo Representante">Cargo Representante</option>
                        </select>
                        
        <div>
            <button type="button" class="btn btn-primary btn-sm m-1" data-toggle="modal" data-target="#exampleModal" @click="$emit('researchBar',research,typeResearch)">
                <img src="/img/search.svg" alt="Search button" width="25">
            </button>
            <button type="button" class="btn btn-sm btn-success m-1" data-toggle="modal" data-target="#createModal"><img src="/img/edit.svg" alt="Edit button" width="25"></button>
        </div>
        
        <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true"> <!--MODAL DE UPDATE E DELETE-->
            <div class="modal-dialog modal-xl" role="document">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Barra de Pesquisa</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div >                      
                        <button type="button" class="btn btn-secondary" data-dismiss="modal" @click="clearFields">Close</button>
                        <!--<button @click="$emit('researchBar',research,typeResearch)">Procurar</button>
                        <button @click="clearFields">Limpar Pesquisa</button>-->
                    </div>
                </div>
                <div class="modal-body" v-show="research">
                    <table class="table table-hover">
                        <thead>
                            <tr>
                                <th scope="col">Registro ANS</th>
                                <th scope="col">CNPJ</th>
                                <th scope="col">Razão Social</th>
                                <th scope="col">Nome Fantasia</th>    
                                <th scope="col">Ações</th>    
                                                      
                            </tr>
                        </thead>
                        <tbody>
                            
                            <tr v-for="(filteredItem,index) in researchArray" :key="index" @mouseover="pegarId(filteredItem.id)">                      
                                <td>{{filteredItem["Registro ANS"]}}</td>
                                <td>{{filteredItem.CNPJ}}</td>
                                <td>{{filteredItem["Razão Social"]}}</td>
                                <td v-if="filteredItem['Nome Fantasia']">{{filteredItem['Nome Fantasia']}}</td>
                                <td v-else> <small class="text-warning">Dados não disponíveis </small></td>        
                                <td><button class="btn btn-sm btn-warning" data-toggle="modal" data-target="#updateModal"><img src="/img/edit.png" alt="" width="15" ></button> <button class="btn btn-sm btn-danger" @click="deleteData(filteredItem.id)"><img src="/img/bin.png" alt="" width="15"></button></td>                         
                            </tr>
                                 
                        </tbody>
                        </table>
                </div>
                <div class="modal-footer">
                     <div class="modal fade" id="updateModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true"> <!--MODAL DE UPDATE-->
                        <div class="modal-dialog modal-xl" role="document">
                            <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLabel">Atualização dos dados</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                <div >                      
                                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                    <!--<button @click="$emit('researchBar',research,typeResearch)">Procurar</button>
                                    <button @click="clearFields">Limpar Pesquisa</button>-->
                                </div>
                            </div>

                            <div class="modal-body">

                            <form @submit="updateData(idAtual)">
                                    <div class="form-row">
                           <div class="col-2">
                                <div class="form-group">
                                    <label for="registroANS">Registro ANS</label>
                                    <input type="text" class="form-control" id="registroANS" v-model="registroANS"  required>
                                </div>
                           </div>
                           <div class="col-3">
                                <div class="form-group">
                                    <label for="cnpj">CNPJ</label>
                                    <input type="text" class="form-control" id="cnpj" placeholder="CNPJ" v-model="cnpj" required>
                                </div>
                           </div>
                           <div class="col">
                                <div class="form-group">
                                    <label for="razaoSocial">Razão Social</label>
                                    <input type="text" class="form-control" id="razaoSocial" v-model="razaoSocial" required>
                                </div>
                           </div>
                       </div>
                       <div class="form-row">
                           <div class="col">
                                <div class="form-group">
                                    <label for="nomeFantasia">Nome Fantasia</label>
                                    <input type="text" class="form-control" v-model="nomeFantasia" id="nomeFantasia">
                                </div>
                           </div>
                           <div class="col">
                               <div class="form-group">
                                    <label for="modalidade">Modalidade</label>
                                    <input type="text" class="form-control" id="modalidade" placeholder="ex. Administradora" v-model="modalidade" required>
                                </div>
                           </div>
                       </div>
                        <div class="form-row">
                            <div class="col">
                                <div class="form-group">
                                    <label for="logradouro">Logradouro</label>
                                    <input type="text" class="form-control" id="logradouro" placeholder="ex. Rua, Avenida..." v-model="logradouro" required>
                                </div>
                            </div>
                            <div class="col-1">
                                <div class="form-group">
                                    <label for="numero">Número</label>
                                    <input type="text" class="form-control" id="numero" v-model="numero"  required>
                                </div>
                            </div>
                            <div class="col">
                                <div class="form-group">
                                    <label for="complemento">Complemento</label>
                                    <input type="text" class="form-control" id="complemento" v-model="complemento" >
                                </div>
                            </div>
                        </div>
                        
                        <div class="form-row">
                            <div class="col">
                                <div class="form-group">
                                    <label for="bairro">Bairro</label>
                                    <input type="text" class="form-control" id="bairro" v-model="bairro"  required>
                                </div>
                            </div>
                            <div class="col">
                                <div class="form-group">
                                    <label for="cidade">Cidade</label>
                                    <input type="text" class="form-control" id="cidade" v-model="cidade"  required>
                                </div>
                            </div>
                            <div class="col-1">
                                <div class="form-group">
                                    <label for="uf">UF</label>
                                    <input type="text" class="form-control" id="uf" v-model="uf" required>
                                </div>
                            </div>
                            <div class="col">
                                <div class="form-group">
                                    <label for="cep">CEP</label>
                                    <input type="text" class="form-control" id="cep" v-model="cep" required>
                                </div>
                            </div>
                        </div>             
                        
                        <div class="form-row">
                            <div class="col-1">
                                <div class="form-group">
                                    <label for="ddd">DDD</label>
                                    <input type="text" class="form-control" id="ddd" v-model="ddd" required>
                                </div>
                            </div>
                            <div class="col">
                                <div class="form-group">
                                    <label for="tel">Telefone</label>
                                    <input type="text" class="form-control" id="tel" v-model="tel" required>
                                </div>
                            </div>
                            <div class="col">
                                <div class="form-group">
                                    <label for="fax">FAX</label>
                                    <input type="text" class="form-control" id="fax" v-model="fax" >
                                </div>
                            </div>
                            <div class="col">
                                <div class="form-group">
                                    <label for="endEletronico">Endereço eletrônico</label>
                                    <input type="email" class="form-control" id="endEletronico" v-model="endEletronico" required>
                                </div>
                            </div>
                        </div>

                        <div class="form-row">                           
                            <div class="col">
                                <div class="form-group">
                                    <label for="rep">Representante</label>
                                    <input type="text" class="form-control" id="rep" v-model="rep" required>
                                </div>
                            </div>
                            <div class="col">
                                <div class="form-group">
                                    <label for="cargRep">Cargo Representante</label>
                                    <input type="text" class="form-control" id="cargRep" v-model="cargRep" required>
                                </div>     
                            </div>                 
                        </div>
                        <div class="form-row">
                            <div class="col-1">
                                <div class="form-group">
                                    <label for="dataANS">Registro ANS</label>
                                    <input type="text" class="form-control" id="dataANS" v-model="dataANS" required>
                                </div>
                            </div>
                        </div>               
                        <button type="submit" class="btn btn-primary btn-block">Submit</button>
                    </form>
                            </div>
                            <div class="modal-footer">
                                
                            </div>
                            </div>
                        </div>
        </div>
                </div>
                </div>
            </div>
        </div>
        <div class="modal fade" id="createModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true"> <!--MODAL DE CREATE-->
            <div class="modal-dialog modal-xl" role="document">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Inserção de dados</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div >                      
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                        <!--<button @click="$emit('researchBar',research,typeResearch)">Procurar</button>
                        <button @click="clearFields">Limpar Pesquisa</button>-->
                    </div>
                </div>

                <div class="modal-body">

                   <form @submit="insertData()">
                       <div class="form-row">
                           <div class="col-2">
                                <div class="form-group">
                                    <label for="registroANS">Registro ANS</label>
                                    <input type="text" class="form-control" id="registroANS" v-model="registroANS" required>
                                </div>
                           </div>
                           <div class="col-3">
                                <div class="form-group">
                                    <label for="cnpj">CNPJ</label>
                                    <input type="text" class="form-control" id="cnpj" placeholder="CNPJ" v-model="cnpj" required>
                                </div>
                           </div>
                           <div class="col">
                                <div class="form-group">
                                    <label for="razaoSocial">Razão Social</label>
                                    <input type="text" class="form-control" id="razaoSocial" v-model="razaoSocial" required>
                                </div>
                           </div>
                       </div>
                       <div class="form-row">
                           <div class="col">
                                <div class="form-group">
                                    <label for="nomeFantasia">Nome Fantasia</label>
                                    <input type="text" class="form-control" v-model="nomeFantasia" id="nomeFantasia">
                                </div>
                           </div>
                           <div class="col">
                               <div class="form-group">
                                    <label for="modalidade">Modalidade</label>
                                    <input type="text" class="form-control" id="modalidade" placeholder="ex. Administradora" v-model="modalidade" required>
                                </div>
                           </div>
                       </div>
                        <div class="form-row">
                            <div class="col">
                                <div class="form-group">
                                    <label for="logradouro">Logradouro</label>
                                    <input type="text" class="form-control" id="logradouro" placeholder="ex. Rua, Avenida..." v-model="logradouro" required>
                                </div>
                            </div>
                            <div class="col-1">
                                <div class="form-group">
                                    <label for="numero">Número</label>
                                    <input type="text" class="form-control" id="numero" v-model="numero"  required>
                                </div>
                            </div>
                            <div class="col">
                                <div class="form-group">
                                    <label for="complemento">Complemento</label>
                                    <input type="text" class="form-control" id="complemento" v-model="complemento" >
                                </div>
                            </div>
                        </div>
                        
                        <div class="form-row">
                            <div class="col">
                                <div class="form-group">
                                    <label for="bairro">Bairro</label>
                                    <input type="text" class="form-control" id="bairro" v-model="bairro"  required>
                                </div>
                            </div>
                            <div class="col">
                                <div class="form-group">
                                    <label for="cidade">Cidade</label>
                                    <input type="text" class="form-control" id="cidade" v-model="cidade"  required>
                                </div>
                            </div>
                            <div class="col-1">
                                <div class="form-group">
                                    <label for="uf">UF</label>
                                    <input type="text" class="form-control" id="uf" v-model="uf" required>
                                </div>
                            </div>
                            <div class="col">
                                <div class="form-group">
                                    <label for="cep">CEP</label>
                                    <input type="text" class="form-control" id="cep" v-model="cep" required>
                                </div>
                            </div>
                        </div>             
                        
                        <div class="form-row">
                            <div class="col-1">
                                <div class="form-group">
                                    <label for="ddd">DDD</label>
                                    <input type="text" class="form-control" id="ddd" v-model="ddd" required>
                                </div>
                            </div>
                            <div class="col">
                                <div class="form-group">
                                    <label for="tel">Telefone</label>
                                    <input type="text" class="form-control" id="tel" v-model="tel" required>
                                </div>
                            </div>
                            <div class="col">
                                <div class="form-group">
                                    <label for="fax">FAX</label>
                                    <input type="text" class="form-control" id="fax" v-model="fax" >
                                </div>
                            </div>
                            <div class="col">
                                <div class="form-group">
                                    <label for="endEletronico">Endereço eletrônico</label>
                                    <input type="email" class="form-control" id="endEletronico" v-model="endEletronico" required>
                                </div>
                            </div>
                        </div>

                        <div class="form-row">                           
                            <div class="col">
                                <div class="form-group">
                                    <label for="rep">Representante</label>
                                    <input type="text" class="form-control" id="rep" v-model="rep" required>
                                </div>
                            </div>
                            <div class="col">
                                <div class="form-group">
                                    <label for="cargRep">Cargo Representante</label>
                                    <input type="text" class="form-control" id="cargRep" v-model="cargRep" required>
                                </div>     
                            </div>                 
                        </div>
                        <div class="form-row">
                            <div class="col-1">
                                <div class="form-group">
                                    <label for="dataANS">Registro ANS</label>
                                    <input type="text" class="form-control" id="dataANS" v-model="dataANS" required>
                                </div>
                            </div>
                        </div>               
                        <button type="submit" class="btn btn-primary btn-block">Submit</button>
                    </form>
                </div>
                <div class="modal-footer">
                    
                </div>
                </div>
            </div>
        </div>
       

    </nav>
</template>
<script>
   
    export default {
        name: "DashNavbar",
        data(){
            return{
                research: "",
                typeResearch: null,

                registroANS: null,
                cnpj: null,
                razaoSocial: null,
                nomeFantasia: null,
                modalidade: null,
                logradouro: null,
                numero: null,
                complemento: null,
                bairro: null,
                cidade: null,
                uf: null,
                cep: null,
                ddd: null,
                tel: null,
                fax: null,
                endEletronico: null,
                rep: null,
                cargRep: null,
                dataANS: null,

                toUpdate: {},
                
                idAtual : null,
                alterado : false

            }

            
        },
        props:{
            researchArray : Array
        },      
        methods: {
            /*researchBar(){
                console.log(this.research);
            }*/clearFields(){
                this.typeResearch = null;
                this.research = "";
            },
            pegarId(id){
                this.idAtual = id
            }
            ,
            //DELETE IS WORKING
            async deleteData(id){
                 const req = await fetch(`http://localhost:3000/jsondata/${id}`,{
                     method: "DELETE"
                 });          
                 console.log(req)     
            },
            async updateData(id){

                const data = {
                    "Registro ANS": this.registroANS,
                    "CNPJ": this.cnpj,
                    "Razão Social": this.razaoSocial,
                    "Nome Fantasia": this.nomeFantasia,
                    "Modalidade": this.modalidade,
                    "Logradouro": this.logradouro,
                    "Número": this.numero,
                    "Complemento": this.complemento,
                    "Bairro": this.bairro,
                    "Cidade": this.cidade,
                    "UF": this.uf,
                    "CEP": this.cep,
                    "DDD": this.ddd,
                    "Telefone": this.tel,
                    "Fax": this.fax,
                    "Endereço eletrônico": this.endEletronico,
                    "Representante": this.rep,
                    "Cargo Representante":this.cargRep,
                    "Data Registro ANS": this.dataANS
                };
                const dataJson = JSON.stringify(data);

                const req = await fetch(`http://localhost:3000/jsondata/${id}`,{
                    method: "PATCH",
                    headers: { "Content-Type": "application/json"},
                    body: dataJson
                });

                const res = await req.json();
                console.log(res);

                this.registroANS = null;
                this.cnpj= null;
                this.razaoSocial= null;
                this.nomeFantasia= null;
                this.modalidade= null;
                this.logradouro= null;
                this.numero= null;
                this.complemento= null;
                this.bairro= null;
                this.cidade= null;
                this.uf= null;
                this.cep= null;
                this.ddd= null;
                this.tel= null;
                this.fax= null;
                this.endEletronico= null;
                this.rep= null;
                this.cargRep= null;
                this.dataANS= null;
            }
            ,
            //CREATING IS WORKING
            async insertData(){
                const data = {
                    "Registro ANS": this.registroANS,
                    "CNPJ": this.cnpj,
                    "Razão Social": this.razaoSocial,
                    "Nome Fantasia": this.nomeFantasia,
                    "Modalidade": this.modalidade,
                    "Logradouro": this.logradouro,
                    "Número": this.numero,
                    "Complemento": this.complemento,
                    "Bairro": this.bairro,
                    "Cidade": this.cidade,
                    "UF": this.uf,
                    "CEP": this.cep,
                    "DDD": this.ddd,
                    "Telefone": this.tel,
                    "Fax": this.fax,
                    "Endereço eletrônico": this.endEletronico,
                    "Representante": this.rep,
                    "Cargo Representante":this.cargRep,
                    "Data Registro ANS": this.dataANS
                };

                const dataJson = JSON.stringify(data);

                const req = await fetch("http://localhost:3000/jsondata",{
                    method: "POST",
                    headers: { "Content-Type": "application/json"},
                    body: dataJson
                });

                const res = await req.json();
                console.log(res);

                this.registroANS = null;
                this.cnpj= null;
                this.razaoSocial= null;
                this.nomeFantasia= null;
                this.modalidade= null;
                this.logradouro= null;
                this.numero= null;
                this.complemento= null;
                this.bairro= null;
                this.cidade= null;
                this.uf= null;
                this.cep= null;
                this.ddd= null;
                this.tel= null;
                this.fax= null;
                this.endEletronico= null;
                this.rep= null;
                this.cargRep= null;
                this.dataANS= null;

            }
            //UPDATING NOT WORKING YET
            /*async updateData(){
                
            }*/
        }
    }
</script>

<style scoped>

    nav {
        margin: 10px;
        display: flex;
        justify-content: space-around;
        background-color: #fff;
    }

    h2{
        color: #5161f1;
    }
    #searchInput{
        padding: 5px;
        border: 1px dotted;
        border-radius: 5px;
        width: 20%;
        color: #5161f1;
        margin-right: 5px;
        max-height: 50px;
    }
    #searchInput:focus{
        box-shadow: 0;
        border: 1px solid #ff9720;
        border-radius: 5px;
        outline: 0;
    }
     #searchInput:focus::placeholder{
         color: transparent;
     }
    #searchInput::placeholder{
        color: #ff9720;
    }
     #typeResearch{
        padding: 5px;
        border: 1px dotted #000000;
        border-radius: 5px;
        color: #5161f1;
        width: 20%;
        max-height: 50px;
        margin: 0 5px;
    }
    
</style>