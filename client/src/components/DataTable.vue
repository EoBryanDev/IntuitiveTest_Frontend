<template>
    <div>
        <div class="outer-wrapper">
            <div class="table-wrapper">
                <div>
                    <table class="table table-sm">
                        <thead>
                            <tr>
                                <th scope="col">Registro ANS</th>
                                <th scope="col">CNPJ</th>
                                <th scope="col">Razão Social</th>
                                <th scope="col">Nome Fantasia</th>
                                <th scope="col">Modalidade</th>
                                <th scope="col">Logradouro</th>
                                <th scope="col">Número</th>
                                <th scope="col">Complemento</th>
                                <th scope="col">Bairro</th>
                                <th scope="col">Cidade</th>
                                <th scope="col">UF</th>
                                <th scope="col">CEP</th>
                                <th scope="col">DDD</th>
                                <th scope="col">Telefone</th>
                                <th scope="col">Fax</th>
                                <th scope="col">Endereço Eletrônico</th>
                                <th scope="col">Representante</th>
                                <th scope="col">Cargo Representante</th>
                                <th scope="col">Data Registro ANS</th>
                            </tr>
                        </thead>
                        <tbody>
                                <tr v-for="(data,index) in currentData" :key="index">
                                    <td>{{data["Registro ANS"]}}</td>
                                    <td>{{data.CNPJ}}</td>
                                    <td>{{data["Razão Social"]}}</td>
                                    <td v-if="data['Nome Fantasia']">{{data['Nome Fantasia']}}</td>
                                    <td v-else> <small class="text-warning">Dados não disponíveis </small></td>
                                    <td>{{data.Modalidade}}</td>
                                    <td>{{data.Logradouro}}</td>
                                    <td>{{data.Número}}</td>
                                    <td v-if="data.Complemento">{{data.Complemento}}</td>
                                    <td v-else> <small class="text-warning">Dados não disponíveis </small></td>
                                    <td>{{data.Bairro}}</td>
                                    <td>{{data.Cidade}}</td>
                                    <td>{{data.UF}}</td>
                                    <td>{{data.CEP}}</td>
                                    <td>{{data.DDD}}</td>
                                    <td v-if="data.Telefone">{{data.Telefone}}</td>
                                    <td v-else> <small class="text-warning">Dados não disponíveis </small></td>
                                    <td v-if="data.Fax">{{data.Fax}}</td>
                                    <td v-else> <small class="text-warning">Dados não disponíveis </small></td>
                                    <td>{{data["Endereço eletrônico"]}}</td>
                                    <td>{{data.Representante}}</td>
                                    <td>{{data["Cargo Representante"]}}</td>
                                    <td>{{data["Data Registro ANS"]}}</td>
                                </tr>      
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        <Pagination :currentPage="currentPage" :paginacao="totalPage()" @pageNumber="setPageNumber"/>
    </div>
</template>

<script>
/* eslint-disable */
import Pagination from "./Pagination.vue"
    export default {
        name: "DataTable",
        components: {
            Pagination
        },
        data(){
            return{
                datas : {},
                elementPerPage: 80,
                totalElements: null,
                currentData: [],
                currentPage: 0,                 
            }
        },
        methods: {           
            async getData(){
                //data from "backend" 

                const req = await fetch('http://localhost:3000/jsondata');
                const data = await req.json();
                this.datas = data;

                //----

                //getting total elements from objects array

                const test = this.datas
                const size = test.length
                this.totalElements = size    

                //-----                         
               this.setPageNumber(1)         
            },
            totalPage(){
                return Math.ceil(this.totalElements / this.elementPerPage)
            },
            pushinNewSelection(){
                //pagination element
                //120*1
                //0 - 0 ate 120                 inicio---  (currentPage + elementPerPage) - elementPerPage            final -- 120*1 (elementsPerPage * currentPage)
                //1 - 120 ate 240 120*2    
                //2 - 240 ate 360
                //3 - 360 ate 480    
                let init = ((this.currentPage * this.elementPerPage) - this.elementPerPage) < 0 ? 0 : (this.currentPage * this.elementPerPage) - this.elementPerPage ;
                let end = (this.currentPage * this.elementPerPage);

                this.currentData = this.datas.slice(init,end);
                 //----
            },
            arrayListDecision(){
                const showedArray = []
                if(this.visualizedData.length == 0){
                    this.researchFilter("","")
                    console.log(this.visualizedData)
                    this.visualizedData = [];
                }else{
                    this.setPageNumber(2)
                    console.log(this.currentData)
                }
            },
            setPageNumber(value){
                this.currentPage = value;
                this.pushinNewSelection()
            },
        },
        mounted(){
            this.getData();

        }
    }
</script>

<style scoped>

    .outer-wrapper {
    margin: 10px;
    max-width: fit-content;
    max-height: fit-content;
    }
    .table-wrapper {

    overflow-y: scroll;
    overflow-x: scroll;
    height: fit-content;
    max-height: 530px;
    
    margin-top: 22px;
    padding-bottom: 10px;
    }

    table{
        border: 1px dotted;
        margin: 5px;
        padding: 30px;
        height: 100%;
        
    }
    table th{
    position: sticky; 
    top: 0px;
    
    background-color: #5161f1;
    color: #fff;
    
    text-align: center;
    vertical-align: middle;
    
    font-weight: normal;
    font-size: 16px;
    outline: 0.7px solid black;

    } 
    table th, table td {
    
    padding: 15px;
    padding-top: 10px;
    padding-bottom: 10px;
    
    }

    table td {
        text-align: left;
        font-size: 12px;
        border: 1px solid rgb(177, 177, 177);

        
    }
    table tr:hover{
        background-color: #ff9720;
        color: #fff;
    }
    
</style>